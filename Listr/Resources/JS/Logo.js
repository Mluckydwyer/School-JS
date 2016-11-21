function logoHover() {
    document.getElementById("l-header").className = document.getElementById("l-header").className.replace("l", "color");
    document.getElementById("i-header").className = document.getElementById("i-header").className.replace("i", "color");
    document.getElementById("s-header").className = document.getElementById("s-header").className.replace("s", "color");
    document.getElementById("t-header").className = document.getElementById("t-header").className.replace("t", "color");
    document.getElementById("r-header").className = document.getElementById("r-header").className.replace("r", "color");
}

function reset() {
    document.getElementById("l-header").className = document.getElementById("l-header").className.replace("color", "l");
    document.getElementById("i-header").className = document.getElementById("i-header").className.replace("color", "i");
    document.getElementById("s-header").className = document.getElementById("s-header").className.replace("color", "s");
    document.getElementById("t-header").className = document.getElementById("t-header").className.replace("color", "t");
    document.getElementById("r-header").className = document.getElementById("r-header").className.replace("color", "r");
}
