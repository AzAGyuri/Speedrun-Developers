window.alert("2 kép található az oldalon. Ugyanaz mindkettő.\nKattintson a kisebbikre!");

let kep = document.getElementById("CSMimage0");
kep.onclick = function(){
    kep.id="CSMimage"+(Math.floor(Math.random()*6));
}