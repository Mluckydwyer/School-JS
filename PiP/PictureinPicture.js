/**
 * Created by mluck on 3/6/2017.
 */

var canvas = null;
var context = null;
var anything = "artwork";
var picPrelaod = 5;
var speed = 2;
var steps = 1000 / speed;
var loadTime = 3;
var pics = [];
var qorS = false; // Q = true, S = false
var worker = null;

var outStepH = null;
var outStepW = null;
var inStepH = null;
var inStepW = null;
var oldImg = null;
var newImg = null;

var drawer = null;

var load = function () {
    for (var x = 1; x < 3; x++) {

        var img = new Image(200, 200);
        if (x < 10) img.setAttribute("src", "http://beeple-crap.com/media/everyday11/january2017/big/01-0" + x + "-17.jpg");
        else if (x == 26) continue;
        else img.src = "http://beeple-crap.com/media/everyday11/january2017/big/01-" + x + "-17.jpg";

        img.width = 200;
        img.height = 200;

        img.onload = function () {
            pics.push(img);
        }
    }
};

var getInput = function () {
    document.getElementById("loader").className = document.getElementById("loader").className.replace("hide", "show");
    document.getElementById("loader-icon").className = document.getElementById("loader-icon").className + " loading";
    document.getElementById("name-pop").className = document.getElementById("name-pop").className.replace("show", "hide");
    showSnack("Acquiring Mojo", 15);

    //worker.go(name);
    resizeCanvas();

    document.getElementById("canvas").className = document.getElementById("canvas").className.replace("hide", "show");
    document.getElementById("name-pop").className = document.getElementById("name-pop").className.replace("hide", "show");
    document.getElementById("info-field").className = document.getElementById("info-field").className.replace("show", "hide");

    setTimeout(function () {
        document.getElementById("loader").className = document.getElementById("loader").className.replace("show", "hide");
        document.getElementById("loader-icon").className = document.getElementById("loader-icon").className.replace("loading", "");
        document.getElementById("backdrop").className = document.getElementById("backdrop").className.replace("show", "hide");
        document.getElementById("card-text").className = document.getElementById("card-text").className.replace("show", "hide");

        showSnack("Ride On!" + name, 5);
        run();
    }, loadTime * 1000);

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

var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Resize: Width = " + canvas.width + " Height = " + canvas.height);
};

var setup = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    //load(1);
    var img = new Image();
    img.src = "Test_Pic.png";
    pics.push(img);
    pics.push(img);
    resizeCanvas();
    console.log("Images Loaded");
};

var run = function () {
    console.log(pics);
    console.log("Go");

    for (var j = 0; j < pics.length; j++) {
    zoom(0);
    drawer = setInterval(function () {
        zoom(0);
        console.log("Test");
    }, 2000 / speed);
}
};

var zoom = function (i) {
    oldImg = pics[i];
    newImg = pics[0];

    if (pics.length != i + 1) newImg = pics[i + 1];

    outStepH = oldImg.height / steps;
    outStepW = oldImg.width / steps;
    inStepH = canvas.height / steps / 2;
    inStepW = canvas.width / steps / 2;

    drawImg(i);

    if (pics.length != i + 1) zoom(i + 1);
};

var drawImg = function (j) {

    setTimeout(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(oldImg, -5 * j * outStepW, -5 * j * outStepH, canvas.width + 10 * outStepW * j, canvas.height + 10 * outStepH * j);
        context.drawImage(newImg, canvas.width / 2 - j * inStepW, canvas.height / 2 - j * inStepH, canvas.width * (j / steps), canvas.height * (j / steps));
    }, j * 2);

    if (j < steps) drawImg(j + 1);
};

window.onload = setup;
