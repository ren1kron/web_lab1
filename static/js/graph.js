// // const canvas = document.getElementById('graph');
// // const ctx = canvas.getContext('2d');
// // const radius = 150; // Радиус для области R
// //
// //
// // window.onload = function() {
// //     // Очищаем холст
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //
// //     // Настраиваем оси
// //     ctx.beginPath();
// //     ctx.moveTo(200, 0);
// //     ctx.lineTo(200, 400);
// //     ctx.moveTo(0, 200);
// //     ctx.lineTo(400, 200);
// //     ctx.strokeStyle = 'black';
// //     ctx.stroke();
// //
// //     // Четверть круга (например, для сектора с R/2)
// //     ctx.beginPath();
// //     ctx.arc(200, 200, radius / 2, 0, Math.PI / 2);
// //     ctx.lineTo(200, 200);
// //     ctx.closePath();
// //     ctx.fillStyle = 'rgb(227,16,67)';
// //     ctx.fill();
// //
// //     // Прямоугольник
// //     ctx.beginPath();
// //     ctx.rect(200, 200 - radius, radius, radius / 2);
// //     ctx.fillStyle = 'rgb(227,16,67)';
// //     ctx.fill();
// //
// //     // Треугольник
// //     ctx.beginPath();
// //     ctx.moveTo(200, 200);
// //     ctx.lineTo(200 - radius, 200);
// //     ctx.lineTo(200, 200 + radius);
// //     ctx.closePath();
// //     ctx.fillStyle = 'rgb(227,16,67)';
// //     ctx.fill();
// // };
// //
// //
//
//
// const canvas = document.getElementById("graph");
// const ctx = canvas.getContext("2d");
//
// // Define axis labels
// const xAxisLabel = "X";
// const yAxisLabel = "Y";
//
// let xAxisScale;
// let yAxisScale;
//
// function draw() {
//     if (canvas.getContext) {
//         ctx.fillStyle = "rgb(18,32,40)";
//         ctx.strokeStyle = "rgb(18,32,40)";
//
//         // Define the canvas dimensions
//         let canvasWidth = canvas.width;
//         let canvasHeight = canvas.height;
//
//         xAxisScale = canvasWidth / 10;
//         yAxisScale = canvasHeight / 10;
//
//         // Define the origin point for the axes
//         let originX = canvasWidth / 2;
//         let originY = canvasHeight / 2;
//
//         // Draw the x-axis
//         ctx.beginPath();
//         ctx.moveTo(0, originY);
//         ctx.lineTo(canvasWidth, originY);
//         // Draw the x-axis arrowhead
//         ctx.lineTo(canvasWidth - 10, originY - 2.5);
//         ctx.moveTo(canvasWidth, originY);
//         ctx.lineTo(canvasWidth - 10, originY + 2.5);
//         ctx.stroke();
//
//         // Draw the y-axis
//         ctx.beginPath();
//         ctx.moveTo(originX, 0);
//         ctx.lineTo(originX, canvasHeight);
//         // Draw the y-axis arrowhead
//         ctx.moveTo(originX, 0);
//         ctx.lineTo(originX - 2.5, 10);
//         ctx.moveTo(originX, 0);
//         ctx.lineTo(originX + 2.5, 10);
//         ctx.stroke();
//
//         // Label the axes
//         ctx.fontFamily = "Open Sans, sans-serif"; // почему изменения здесь не меняют шрифт?
//         let fontArgs = ctx.font.split(' ');
//         let newSize = '14px';
//         ctx.font = newSize + ' ' + fontArgs[fontArgs.length - 1]; /// using the last part
//         ctx.fillText(xAxisLabel, canvas.width - 15, canvas.height / 2 - 8);
//         ctx.fillText(yAxisLabel, canvas.width / 2 + 8, 15);
//
//         ctx.fillText("0", originX, originY);
//
//         // Draw scale markings on the axes
//         for (let i = -canvas.width / 2; i < canvas.width / 2; i += xAxisScale) {
//             let scalePos = axesToCanvasCoordinates(i, 0, canvas);
//             ctx.beginPath();
//             ctx.moveTo(scalePos.x, scalePos.y - 5);
//             ctx.lineTo(scalePos.x, scalePos.y + 5);
//             ctx.stroke();
//             ctx.fillText(rescaleXAxesCoordinate(i), scalePos.x - 10, scalePos.y + 20);
//         }
//
//         for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
//             let scalePos = axesToCanvasCoordinates(0, j, canvas);
//             ctx.beginPath();
//             ctx.moveTo(scalePos.x - 5, scalePos.y);
//             ctx.lineTo(scalePos.x + 5, scalePos.y);
//             ctx.stroke();
//             ctx.fillText(rescaleYAxesCoordinate(j), scalePos.x + 10, scalePos.y + 5);
//         }
//     }
// }
//
// function axesToCanvasCoordinates(xAxes, yAxes, canvas) {
//     // nit: can use canvasContext.translate
//     // Define the origin point for the axes
//     let originX = canvas.width / 2;
//     let originY = canvas.height / 2;
//
//     // Calculate the canvas coordinates
//     let canvasX = originX + xAxes;
//     let canvasY = originY - yAxes; // Subtract yAxes since the y-axis is inverted in canvas
//
//     return { x: canvasX, y: canvasY };
// }
//
// function rescaleXAxesCoordinate(coordinate) {
//     return coordinate / xAxisScale;
// }
//
// function rescaleYAxesCoordinate(coordinate) {
//     return coordinate / yAxisScale;
// }
//
// function scaleXAxesCoordinate(coordinate) {
//     return coordinate * xAxisScale;
// }
//
// function scaleYAxesCoordinate(coordinate) {
//     return coordinate * yAxisScale;
// }
//
// function drawShapesByR(r) {
//     if (canvas.getContext) {
//         // clear everything else
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         draw();
//
//         // literally (0;0)
//
//         let startPointInAxes = {x: 0, y: 0};
//         let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
//
//         // draw square
//
//         let endPointInAxes = {x: r, y: r};
//         let endScaledPointInAxes = {
//             x: scaleXAxesCoordinate(endPointInAxes.x),
//             y: scaleYAxesCoordinate(endPointInAxes.y)
//         };
//         //let endPointInCanvas = axesToCanvasCoordinates(endScaledPointInAxes.x, endScaledPointInAxes.y, canvas);
//
//         ctx.fillStyle = "rgba(0,0,100,0.5)";
//         ctx.beginPath();
//         ctx.fillRect(startPointInCanvas.x, startPointInCanvas.y, endScaledPointInAxes.x, -endScaledPointInAxes.y);
//         //console.log(endScaledPointInAxes.x, -endScaledPointInAxes.y);
//
//         // draw triangle
//         let secondTrianglePointInAxes = {x: r, y: 0};
//         let thirdTrianglePointInAxes = {x: 0, y: -r};
//         drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes);
//
//         // draw 1/4 circle
//         let calculatedRadius = scaleXAxesCoordinate(r / 2);
//
//         ctx.beginPath();
//         ctx.arc(startPointInCanvas.x, startPointInCanvas.y, calculatedRadius, 3 * Math.PI / 2, Math.PI, true);
//         ctx.fill();
//
//         // draw missing triangle
//         let secondTrianglePointInAxesM = {x: -r / 2, y: 0};
//         let thirdTrianglePointInAxesM = {x: 0, y: r / 2};
//         drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxesM, thirdTrianglePointInAxesM);
//     }
// }
//
// function drawTriangle (ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes) {
//     if (canvas.getContext) {
//         let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
//         let secondScaledTrianglePointInAxes = {
//             x: scaleXAxesCoordinate(secondTrianglePointInAxes.x),
//             y: scaleYAxesCoordinate(secondTrianglePointInAxes.y)
//         }
//         let thirdScaledTrianglePointInAxes = {
//             x: scaleXAxesCoordinate(thirdTrianglePointInAxes.x),
//             y: scaleYAxesCoordinate(thirdTrianglePointInAxes.y)
//         };
//         let secondTrianglePointInCanvas = axesToCanvasCoordinates
//         (secondScaledTrianglePointInAxes.x, secondScaledTrianglePointInAxes.y, canvas);
//         let thirdScaledTrianglePointInCanvas = axesToCanvasCoordinates
//         (thirdScaledTrianglePointInAxes.x, thirdScaledTrianglePointInAxes.y, canvas);
//
//         ctx.beginPath();
//         ctx.moveTo(startPointInCanvas.x, startPointInCanvas.y);
//         ctx.lineTo(secondTrianglePointInCanvas.x, secondTrianglePointInCanvas.y);
//         ctx.lineTo(thirdScaledTrianglePointInCanvas.x, thirdScaledTrianglePointInCanvas.y);
//         ctx.fill();
//     }
// }
//
// function drawPoint(x, y, r) {
//     if (canvas.getContext) {
//
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         draw();
//         drawShapesByR(r);
//
//         const pointSize = 4;
//
//         let scaledPoint = {x: scaleXAxesCoordinate(x), y: scaleYAxesCoordinate(y)};
//         let pointOnCanvas = axesToCanvasCoordinates(scaledPoint.x, scaledPoint.y, canvas);
//
//         ctx.fillStyle = "rgb(200,0,0)";
//
//         ctx.beginPath();
//         ctx.fillRect(pointOnCanvas.x - pointSize / 2, pointOnCanvas.y - pointSize / 2, pointSize, pointSize);
//     }
// }
//
// draw();



// document.getElementById('square').width="50*R".height="50*R"

// function updateShapes() {
//     console.log(11111);
//     // Получаем значение радиуса от пользователя
//     const radius = parseFloat(document.getElementById("r").value) * 100;
//
//     if (isNaN(radius) || radius <= 0) {
//         alert("Please enter a valid positive number for the radius.");
//         return;
//     }
//
//     // Треугольник (прямоугольный с вершинами на оси)
//     const trianglePoints = `150,150 ${150 + radius/2},150 150,${150 - radius/2}`;
//     document.getElementById("triangle").setAttribute("points", trianglePoints);
//
//     // Квадрат (его верхний левый угол будет в точке 150,150, а размеры изменятся)
//     document.getElementById("square").setAttribute("width", radius);
//     document.getElementById("square").setAttribute("height", radius);
//
//     // Четверть окружности
//     const quarterCirclePath = `M 150 150 L ${150 - radius} 150 A ${radius} ${radius} 0 0 1 150 ${150 - radius} Z`;
//     document.getElementById("quarterCircle").setAttribute("d", quarterCirclePath);
//
//     // Также можно обновить метки на осях, если необходимо
// }
//
// // Инициализация при загрузке страницы с радиусом по умолчанию
// window.onload = function() {
//     document.getElementById("r").addEventListener("change", updateShapes);
//
//     updateShapes();
// };
// // window.onload = updateShapes;
//
//
// // функции для отрисовки точки
// function drawPoint() {
//
// }