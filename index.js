'use strict'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let startDrawing = false;
let currentColor = '#000';
let currentLineWidth = 1;

selectColor();
selectLineWidth()

canvas.addEventListener('mousedown', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    startDrawing = true;
    ctx.moveTo(x, y);
})

canvas.addEventListener('mouseup', (event) => {
    startDrawing = false;
    ctx.closePath();
})

canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    drawLine(x, y, currentLineWidth, currentColor, currentLineWidth);
})

function selectColor() {
    const inputColorValue = document.querySelector('#input-color');
    inputColorValue.addEventListener('change', () => {
        currentColor = inputValue.value;
    })
    return currentColor;
}

function selectLineWidth() {
    const inputLineWidthValue = document.querySelector('#line-width');
    inputLineWidthValue.addEventListener('change', () => {
        currentLineWidth = inputLineWidthValue.value;
    })
    return currentLineWidth;
}

function drawLine(x, y, r, color, lineWidth) {
    if (startDrawing) {
        ctx.beginPath();
        ctx.arc(x - r / 2, y - r / 2, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}


