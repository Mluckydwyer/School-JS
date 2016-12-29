/**
 * Created by mluck on 12/22/2016.
 */

var canvas = null;
var context = null;

var flakes = [];

var name = "Joyous Citizen";
var flakeCount = 300;
var flakeSlope = -.5;
var flakeMaxSize = 10;
var flakeMinSize = 3;
var flakeMaxSpeed = 6;
var flakeMinSpeed = 1;
var fancyGraphics = true;
var playerSpeed = (flakeMaxSpeed + flakeMinSpeed) / 2;
var col;
var keys = [false, false, false, false]; // up, down, left, right

var setup = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    resizeCanvas();

    col = new Array(canvas.width);
    for (var i = 0; i < canvas.width; i++)
        col[i] = new Array(canvas.height);

    console.log(col.length + "  " + col[0].length)
    resetCols();

    for (var i = 0; i < flakeCount - 1; i++) {
        flakes.push(new flake(false));
    }

    flakes.push(new flake(true));

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 38) {
            keys[0] = true;
        }
        if (e.keyCode == 40) {
            keys[1] = true;
        }
        if (e.keyCode == 37) {
            keys[2] = true;
        }
        if (e.keyCode == 39) {
            keys[3] = true;
        }

    }, false);

    document.addEventListener("keyup", function (e) {
        if (e.keyCode == 38) {
            keys[0] = false;
        }
        if (e.keyCode == 40) {
            keys[1] = false;
        }
        if (e.keyCode == 37) {
            keys[2] = false;
        }
        if (e.keyCode == 39) {
            keys[3] = false;
        }
    }, false);
};

var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Resize: Width = " + canvas.width + " Height = " + canvas.height);
};

var getUsername = function () {
    document.getElementById("loader").className = document.getElementById("loader").className.replace("hide", "show");
    document.getElementById("loader-icon").className = document.getElementById("loader-icon").className + " loading";
    document.getElementById("name-pop").className = document.getElementById("name-pop").className.replace("show", "hide");
    showSnack("Attaining Holiday Spirit", 15);

    if (document.getElementById("username-input").value != "") {
        name = document.getElementById("username-input").value;
    }

    resizeCanvas();


    document.getElementById("canvas").className = document.getElementById("canvas").className.replace("hide", "show");
    document.getElementById("name-pop").className = document.getElementById("name-pop").className.replace("hide", "show");
    document.getElementById("info-field").className = document.getElementById("info-field").className.replace("show", "hide");

    setTimeout(function () {
        document.getElementById("loader").className = document.getElementById("loader").className.replace("show", "hide");
        document.getElementById("loader-icon").className = document.getElementById("loader-icon").className.replace("loading", "");
        document.getElementById("backdrop").className = document.getElementById("backdrop").className.replace("show", "hide");

        document.getElementById("card-text").innerHTML = "Happy Holidays!";
        document.getElementById("card-text").className = document.getElementById("card-text").className.replace("hide", "show");

        showSnack("Let it snow..." + name, 5);
        setInterval(draw, 30);
    }, 15000);
    
    // for (var i = 0; i < 600; i++) draw();
};

var showSnack = function (text, time) {
    var snack = document.getElementById("snackbar");
    snack.innerHTML = text;
    snack.className = snack.className.replace("hide", "show");
    setTimeout(hideSnack, time * 1000);
};

var hideSnack = function () {
    var snack = document.getElementById("snackbar");
    snack.className = "hide";
};

var flake = function (isPlayer) {
    var d = 1;
    if (Math.random() > .5) d *= -1;
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.d = d;
    this.s = flakeMinSpeed + Math.random() * (flakeMaxSpeed - flakeMinSpeed);
    this.r = flakeMinSize + (Math.random() * (flakeMaxSize - flakeMinSize));
    this.p = isPlayer;
};

var resetCols = function () {
    for (var i = 0; i < canvas.width; i++)
        for (var j = 0; j < canvas.height; j++)
            col[i][j] = false;
};

var isColiding = function (f) {
    var c = false;

    for (var i = f.x; i < f.r; i++)
        for (var j = f.y; j < f.r; j++)
            if (col[i][j]) c = true;

    return c;
};

// Draw Loop
var draw = function () {
    var ctx = context;

    var g = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
    g.addColorStop(0, "#0c4196");
    g.addColorStop(1, "#062b68");

    ctx.fillStyle = g;

    var img = document.createElement('img');
    img.src = "http://conestogalogcabins.com/wp-content/uploads/2013/12/2013-07-06-Tomovick-002-1280x720.jpg";
    //ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    resetCols();

    var f;
    for (var i = flakes.length - 1; i >= 0; i--) {
        f = flakes[i];

        if (f.p) {
            ctx.fillStyle = '#ff1d00';
            ctx.strokeStyle = '#ea1b00';
            if (keys[0]) f.y -= playerSpeed;
            if (keys[1]) f.y += playerSpeed;
            if (keys[2]) f.x -= playerSpeed;
            if (keys[3]) f.x += playerSpeed;
            if (f.x < 0) f.x = 0;
            if (f.y < 0) f.y = 0;
            if (f.x > canvas.width - f.r) f.x = canvas.width - f.r;
            if (f.y > canvas.height) {
                showSnack("You made it " + name + "!");
                flakes[i] = new flake(true);
                ctx.fillStyle = '#62f442';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            if (isColiding(f)) {
                showSnack("Try again");
                flakes[i] = new flake(true);
                ctx.fillStyle = '#ff1d00';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            f.x = Math.floor(f.x);
            f.y = Math.floor(f.y);
        }
        else {
            if (f.y >= canvas.height || f.x < 0 || f.x > canvas.width) {
                flakes[i] = new flake(false);
            }

            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#eaeaea';
            f.y += f.s;
            f.x += flakeSlope * f.d;

            f.x = Math.floor(f.x);
            f.y = Math.floor(f.y);

            for (var x = f.x; x < f.r; x++)
                for (var y = f.y; y < f.r; y++) {
                    if (x > canvas.width - 1 || y > canvas.height - 1) continue;
                    else col[x][y] = true;
                }
        }

        if (fancyGraphics) {

            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
        }
        else {
            ctx.fillRect(f.x, f.y, f.r, f.r);
        }

        ctx.stroke();
        ctx.fill();
    }
};

window.onload = setup;