var canvas = null;
var context = null;

var x = 0;
var y = 0;
var w = 25;
var h = 25;
var s = 32;
var speedControl = false;
var colorChange = true;
var color = "#FF0000";
var keys = [false, false, false, false];

var socket = null;

var setup = function () {

    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    resizeCanvas();

    x = canvas.width / 2 - w;
    y = canvas.height / 2 - h;

    showControls();
    setInterval(draw, 50);

    socket = io.connect('http://n.mluckydwyer.com');
};

var draw = function () {
    if (keys[0] == true && x >= 30) {
        console.log("Left Arrow Pressed");
        x -= s;
    }
    if (keys[2] == true && x <= window.innerWidth - 45) {
        console.log("Right Arrow Pressed");
        x += s;
    }

    if (keys[3] == true && y <= window.innerHeight - 45) {
        console.log("Down Arrow Pressed");
        y += s;
    }
    if (keys[1] == true && y >= 30) {
        console.log("Up Arrow Pressed");
        y -= s;
    }


    if (colorChange) randomColor();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);

    context.fontSize = 250;
    // context.fillText("X:\t" + x, 25, 25);
    // context.fillText("Y:\t" + y, 25, 40);
    // context.fillText("Speed:\t" + s, 25, 65);
    // context.fillText("Color:\t" + color, 25, 90);
    var title = document.getElementsByTagName("title");
    title.innerHTML = "S:\t" + s;
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
    if (e.keyCode == 82) {
        reset()
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

document.addEventListener("keypress", function (e) {

}, false);

document.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function reset() {
    x = canvas.width / 2 - w;
    y = canvas.height / 2 - h;
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
}

document.addEventListener("click", function (e) {
    showControls();
    getTestTime();
}, false);

function showControls() {
    showSnackbar("Use The Arrow Keys To Control The Square  -  Press The 'C' Key To Change Color Mode  -  Press The 'R' Key To Reset  -  Press 'F11' To Enter Full Screen Mode  -  Click Anywhere To Show This Again");
}

function showSnackbar(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 15000)
}

function getTestTime() {
    /*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'http://localhost:8888/test', true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status==200) {
            console.log(xmlhttp.responseText);
        }
    };
    xmlhttp.send();
    */

    socket.emit('input',{"time" : new Date().getTime()});
    socket.on('output', function (data) {
        console.log(data);
    });
}

window.onload = setup;
