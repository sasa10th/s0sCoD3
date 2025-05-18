const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

const TOTAL_POINTS = 20;
const CONNECT_DISTANCE = 100;
let points = [];

const drawPoint = point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
};

const movePoint = point => {
    point.x += point.s * Math.cos(point.a);
    point.y += point.s * Math.sin(point.a);
};

const distance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

const drawLine = (p1, p2, d) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(255,255,255,${1 - d / CONNECT_DISTANCE})`;
    ctx.stroke();
};

const loop = () => {
    requestAnimationFrame(loop);

    while (points.length < TOTAL_POINTS) {
        points.push({
            x: getRandomInRange(0, canvas.width),
            y: getRandomInRange(0, canvas.height),
            a: getRandomInRange(0, 2 * Math.PI),
            s: 1
        });
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(movePoint);

    points = points.filter(p =>
        p.x >= 0 && p.x <= canvas.width &&
        p.y >= 0 && p.y <= canvas.height
    );

    points.forEach(drawPoint);

    points.forEach(p1 => {
        points.forEach(p2 => {
            if (p1 !== p2) {
                const d = distance(p1, p2);
                if (d < CONNECT_DISTANCE) {
                    drawLine(p1, p2, d);
                }
            }
        });
    });
};

loop();
