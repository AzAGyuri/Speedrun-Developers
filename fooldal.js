alert("Ezen az oldal a 2 bekezdés szövegére kattintva a szöveg színe randomizáltan változik!\nPróbálja ki!");
function szoveg(){
    document.getElementById("fooldal").style.color="#"+Math.floor(Math.random()*16777215).toString(16);
}