let drawing_mode = false;
let pen_color = "black";
let prev_color = "black";
let drawLine = false;
let drawCircle = false;

const fragment = document.createDocumentFragment();
const myDiv = document.getElementById("mydiv");
const divHeight = Number(myDiv.offsetHeight) / 10;
const divWidth = Number(myDiv.offsetWidth) / 10;

for (let i = 0; i < divHeight; i++) {
    for (let j = 0; j < divWidth; j++) {
        const butn = document.createElement('div');
        butn.id = `${j}_${i}`;
        butn.onmousedown = () => start(butn.id);
        butn.onmouseup = () => stop(butn.id);
        butn.onmouseover = () => btn(butn.id);
        butn.onclick = () => btn1(butn.id);
        butn.setAttribute('pos-x', j);
        butn.setAttribute('pos-y', i);
        fragment.appendChild(butn);
    }
}
myDiv.appendChild(fragment);


function btn(clicked) {
    if (drawing_mode)
        document.getElementById(clicked).style.backgroundColor = pen_color;
}

let x = undefined;
let pos_start = undefined, pos_end = undefined;

function btn1(clicked) {
    document.getElementById(clicked).style.backgroundColor = pen_color;

    if (drawLine) {
        if (x == undefined) {
            x = clicked;
            pos_start = x;
        }

        else {
            x = clicked;
            pos_end = x;
        }

        if (pos_start != undefined && pos_end != undefined) {
            if (drawLine) {
                create_line();
                drawLine = false;
            }
            x = undefined;
            pos_start = undefined;
            pos_end = undefined;
        }
    }
    else if (drawCircle) {
        if (x == undefined) {
            x = clicked;
            pos_start = x;
        }

        else {
            x = clicked;
            pos_end = x;
        }

        if (pos_start != undefined && pos_end != undefined) {
            if (drawCircle) {
                create_circle();
                drawCircle = false;
            }
            x = undefined;
            pos_start = undefined;
            pos_end = undefined;
        }
    }
}

function start() {
    drawing_mode = true;
}
function stop() {
    drawing_mode = false;
}

function change_color() {
    pen_color = prompt("Which Color?");
}

function Eraser() {
    prev_color = pen_color;
    pen_color = "white";
}

function Pen() {
    pen_color = prev_color;
}

function clear_screen() {
    for (let i = 0; i < Number(document.getElementById("mydiv").offsetHeight) / 10; i++) {
        for (let j = 0; j < Number(document.getElementById("mydiv").offsetWidth) / 10; j++) {
            document.getElementById('' + j + '_' + i + '').style.backgroundColor = "white";
        }
    }
}


function draw_line() {
    alert("Choose start and end pixel");
    drawLine = true;
}

function draw_circle() {
    alert("Choose start and end pixel");
    drawCircle = true;
}

function change_bg() {
    let bg_change = prompt("Which Color?");
    for (let i = 0; i < Number(document.getElementById("mydiv").offsetHeight) / 10; i++) {
        for (let j = 0; j < Number(document.getElementById("mydiv").offsetWidth) / 10; j++) {
            document.getElementById('' + j + '_' + i + '').style.backgroundColor = bg_change;
        }
    }
}

function create_line() {
    let X = Number(document.getElementById(pos_start).getAttribute('pos-x'));
    let Y = Number(document.getElementById(pos_start).getAttribute('pos-y'));
    let dx = Math.abs(Number(document.getElementById(pos_end).getAttribute('pos-x')) - X);
    let dy = Math.abs(Number(document.getElementById(pos_end).getAttribute('pos-y')) - Y);
    const S1 = Math.sign(Number(document.getElementById(pos_end).getAttribute('pos-x')) - X);
    const S2 = Math.sign(Number(document.getElementById(pos_end).getAttribute('pos-y')) - Y);
    let interchange;
    if (dy > dx) {
        let temp = dx;
        dx = dy;
        dy = temp;
        interchange = true;
    }
    else
        interchange = false;

    let err = 2 * dy - dx;

    for (let i = 1; i <= dx; i++) {
        document.getElementById('' + X + '_' + Y + '').style.backgroundColor = pen_color;
        while (err > 0) {
            if (interchange)
                X = X + S1;
            else
                Y = Y + S2;

            err = err - 2 * dx;
        }

        if (interchange)
            Y = Y + S2;
        else
            X = X + S1;

        err = err + 2 * dy;
    }
}

function create_circle() {
    let X0 = Number(document.getElementById(pos_start).getAttribute('pos-x'));
    let Y0 = Number(document.getElementById(pos_start).getAttribute('pos-y'));
    let X1 = Number(document.getElementById(pos_end).getAttribute('pos-x'));
    let Y1 = Number(document.getElementById(pos_end).getAttribute('pos-y'));

    let radius = Math.sqrt(Math.pow(X1 - X0, 2) + Math.pow(Y1 - Y0, 2));

    let x = 0;
    let y = Math.floor(radius);
    let d = 3 - 2 * Math.floor(radius);

    function drawCirclePoints(x, y) {
        document.getElementById(`${X0 + x}_${Y0 + y}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 - x}_${Y0 + y}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 + x}_${Y0 - y}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 - x}_${Y0 - y}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 + y}_${Y0 + x}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 - y}_${Y0 + x}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 + y}_${Y0 - x}`).style.backgroundColor = pen_color;
        document.getElementById(`${X0 - y}_${Y0 - x}`).style.backgroundColor = pen_color;
    }

    while (y >= x) {
        drawCirclePoints(x, y);
        x++;

        if (d > 0) {
            y--;
            d = d + 4 * (x - y) + 10;
        } else {
            d = d + 4 * x + 6;
        }
        drawCirclePoints(x, y);
    }
}

