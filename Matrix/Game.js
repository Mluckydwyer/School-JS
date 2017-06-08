var canvas = null;
var context = null;

var x;
var y;
var bx;
var by;
var w;
var h;
var s = 5;
var bw = 50;
var bh = 50;
var score = 0;

var speedControl = false;
var colorChange = false;
var color = "#009e0a";
var keys = [false, false, false, false];
var dir = [false, false, false, false];
var boxes;

var setup = function () {

    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    resizeCanvas();

    w = canvas.width / bw;
    h = canvas.height / bh;
    bx = bw / 2;
    by = bh / 2;
    x = w * bx;
    y = h * by;

    boxes = new Array(bw);
    for (var i = 0; i < bh; i++) {
        boxes[i] = new Array(bh);
    }

    for (var i = 0; i < bh; i++) {
        for (var j = 0; j < bh; j++) {
            boxes[i][j] = false;
        }
    }

    boxes[bx][by] = true;

    showControls();
    setInterval(draw, 100);
};

var draw = function () {
    if (bx < 0 || bx > bw - 1|| by < -1 || by > bh)
        reset();

    boxes[bx][by] = true;

    if (keys[0] == true) {
        console.log("Left Arrow Pressed");
        if (dir[2]) reset();
        else {
            dir[0] = true;
            dir[1] = false;
            dir[2] = false;
            dir[3] = false;
        }
    }
    else if (keys[2] == true) {
        console.log("Right Arrow Pressed");
        if (dir[0]) reset();
        else {
            dir[0] = false;
            dir[1] = false;
            dir[2] = true;
            dir[3] = false;
        }
    }
    else if (keys[3] == true) {
        console.log("Down Arrow Pressed");
        if (dir[1]) reset();
        else {
            dir[0] = false;
            dir[1] = false;
            dir[2] = false;
            dir[3] = true;
        }
    }
    else if (keys[1] == true) {
        console.log("Up Arrow Pressed");
        if (dir[3]) reset();
        else {
            dir[0] = false;
            dir[1] = true;
            dir[2] = false;
            dir[3] = false;
        }
    }

    if (dir[0] == true && x >= -1) {
        console.log("Left Arrow Pressed");
        x -= w;
        bx --;
    }
    else if (dir[2] == true && x <= canvas.width - 1) {
        console.log("Right Arrow Pressed");
        x += w;
        bx++;
    }

    else if (dir[3] == true && y <= canvas.height - 1) {
        console.log("Down Arrow Pressed");
        y += h;
        by++;
    }
    else if (dir[1] == true && y >= -1) {
        console.log("Up Arrow Pressed");
        y -= h;
        by--;
    }

    context.fillStyle = "#2b2b2b";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = color;
    for (var i = 0; i < bh; i++) {
        for (var j = 0; j < bh; j++) {
            if (boxes[i][j]) context.fillRect(i * w, j * h, w, h);
        }
    }

    context.fillStyle = "#b51212";
    if (colorChange) context.fillStyle = randomColor();
    context.fillRect(x, y, w, h);

    context.font = "40px Verdana";
    context.fillText("Score:\t" + score, 25, 40);

    if (boxes[bx][by] && !(dir[0] == false && dir[1] == false && dir[2] == false && dir[3] == false))
        reset();

    if (!(dir[0] == false && dir[1] == false && dir[2] == false && dir[3] == false)) score++;
};

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37) {
        keys[0] = true;
    }
    if (e.keyCode == 38) {
        keys[1] = true;
    }
    if (e.keyCode == 39) {
        keys[2] = true;
    }
    if (e.keyCode == 40) {
        keys[3] = true;
    }
    if (speedControl) {
        if (e.keyCode == 107) {
            s += 1;
        }
        if (e.keyCode == 109) {
            s -= 1;
        }
    }
    if (e.keyCode == 67) {
        colorChange = !colorChange;
    }
}, false);

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 37) {
        keys[0] = false;
    }
    if (e.keyCode == 38) {
        keys[1] = false;
    }
    if (e.keyCode == 39) {
        keys[2] = false;
    }
    if (e.keyCode == 40) {
        keys[3] = false;
    }
}, false);

document.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function reset() {
    console.log("Reset")
    dir[0] = false;
    dir[1] = false;
    dir[2] = false;
    dir[3] = false;
    score = 0;
    bx = bw / 2;
    by = bh / 2;
    x = w * bx;
    y = h * by;

    for (var i = 0; i < bh; i++) {
        for (var j = 0; j < bh; j++) {
            boxes[i][j] = false;
        }
    }
    boxes[bx][by] = true;
}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var nColor = '#';

    for (var i = 0; i < 6; i++) {
        nColor += letters[Math.floor(Math.random() * 16)];
    }
    return nColor;
}

document.addEventListener("click", function (e) { showControls(); }, false);

function showControls() {
    showSnackbar("Use the Arrow Keys to control The Square and go as long as you can without touching your trail or going out of bounds.");
}

function showSnackbar(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 15000)
}

window.onload = setup;
