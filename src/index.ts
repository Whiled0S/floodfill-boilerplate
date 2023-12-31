const canvasSize = 1000;
const imageSize = 256;

fetch('/image.json')
    .then(response => response.json())
    .then(array => new Uint8ClampedArray(array))
    .then(dataArray => new ImageData(dataArray, imageSize, imageSize))
    .then(imageData => {
        const canvas = document.getElementById('viewer') as HTMLCanvasElement;
        const context = canvas.getContext('2d', { willReadFrequently: true });

        context.putImageData(imageData, 0, 0);

        canvas.addEventListener('click', event => {
            const { left, top } = canvas.getBoundingClientRect();
            const x = normalizeCoordinate(event.clientX - left);
            const y = normalizeCoordinate(event.clientY - top);

            const imageData = context.getImageData(0, 0, imageSize, imageSize);
            const updatedImageData = floodFill(imageData, x, y);

            context.putImageData(updatedImageData, 0, 0);
        });
    });

function normalizeCoordinate(coordinate) {
    return Math.round(coordinate / canvasSize * imageSize);
}

// Должна возвращать обновленную imageData
function floodFill(imageData, x, y /* Меняй параметры */) {
    // Меняй код
    console.log(x, y);

    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
        imageData.data[i + 3] = 255;
    }

    return imageData;
}