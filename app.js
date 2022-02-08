const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave"); 
const clearBtn = document.getElementById("jsClear"); 

const INITIAL_COLOR = "#2c2c2c";

const width = document.getElementsByClassName("canvas")[0].offsetWidth;
const height = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = width;
canvas.height = height;

whiteBackground();

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseUp(event){
    stopPainting();
}

function onMouseLeave(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; 
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    console.log(event);
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";    
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        const width = document.getElementsByClassName("canvas")[0].offsetWidth;
        const height = document.getElementsByClassName("canvas")[0].offsetHeight;
        ctx.fillRect(0, 0, width, height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function saveImage(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function whiteBackground(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", saveImage);
}

if(clearBtn) {
    clearBtn.addEventListener("click", whiteBackground);
}