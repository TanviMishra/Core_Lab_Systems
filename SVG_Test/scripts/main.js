change = document.querySelector(".cls-4");
change2 = document.querySelector("#ellipses");
document.querySelector(".option").addEventListener("click", changeSVG);
change.setAttribute("style", "fill:yellow");
change2.setAttribute("style", "stroke-width:2.5");
function changeSVG() {
    document.querySelector(".cls-1").style.fill = "#b8f7ff";
}
document.addEventListener("scroll", dispDiv)
function dispDiv() {
    if (window.scrollY > 100) {
        console.log("height reached")
        document.querySelector("#geo").setAttribute("style", "opacity:1");
    }
}