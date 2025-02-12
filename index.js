'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let startDrawing = false;
let currentColor = '#000';
let currentLineWidth = 1;
let lastX = 0;
let lastY = 0;

selectColor();
selectLineWidth();

canvas.addEventListener('mousedown', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    startDrawing = true;
    lastX = x; // Сохраняем начальные координаты
    lastY = y;
});

canvas.addEventListener('mouseup', () => {
    startDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    startDrawing = false;
});

canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (startDrawing) {
        drawLine(x, y, currentLineWidth, currentColor);
        lastX = x; // Обновляем предыдущие координаты
        lastY = y;
    }
});

function selectColor() {
    const inputColorValue = document.querySelector('#input-color');
    inputColorValue.addEventListener('change', () => {
        currentColor = inputColorValue.value;
    });
    return currentColor;
}

function selectLineWidth() {
    const inputLineWidthValue = document.querySelector('#line-width');
    inputLineWidthValue.addEventListener('change', () => {
        currentLineWidth = parseInt(inputLineWidthValue.value, 10);
    });
    return currentLineWidth;
}

function drawLine(x, y, lineWidth, color) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Начинаем линию с предыдущей точки
    ctx.lineTo(x, y); // Рисуем линию до текущей точки
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round'; // Закруглённые концы линий
    ctx.lineJoin = 'round'; // Закруглённые соединения линий
    ctx.stroke();
}

canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    startDrawing = true;
    lastX = x;
    lastY = y;
    event.preventDefault(); // Предотвращаем прокрутку страницы
});

canvas.addEventListener('touchmove', (event) => {
    if (startDrawing) {
        const touch = event.touches[0];
        const x = touch.clientX - canvas.offsetLeft;
        const y = touch.clientY - canvas.offsetTop;
        drawLine(x, y, currentLineWidth, currentColor);
        lastX = x;
        lastY = y;
        event.preventDefault(); // Предотвращаем прокрутку страницы
    }
});

canvas.addEventListener('touchend', () => {
    startDrawing = false;
});
