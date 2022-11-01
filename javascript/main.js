var visualAcucity = 0;
var visualAcucityAntiga;
var counterVal = 0;
var orientacion = 'dreta'; 
var totalAnswers = new Array(26).fill(0);
var correctAnswers = new Array(26).fill(0);
var visualAgotadas = [];
var valorDistance = localStorage.getItem("distanceInput"); 
var valorSquare = localStorage.getItem("squareInput"); 
var s; 
var index = 1; 
var ancho; 
var montaña = false; 
var respuestasMontaña = []; 
var respuesta = 'acierto'; 
var i = 0; 
var cambioDirecciones = []; 

window.onload = function() {
    todo(); 
}

function conversio() {
    s = (0.29*valorDistance)/visualAcucity; // s en mm, l'ampla i l'alçada de la E es 5 cops "s"
    result = s*5;
    factor = result/valorSquare; 
    pixels = 100*factor; 
    var pixels = Math.round(pixels);
    var text = pixels.toString(10);
    document.getElementById("foto").style.width= text+"px"; 
    document.getElementById("foto").style.height=text+"px";
}
function abrirNuevoTab() {
    // Abrir nuevo tab
    localStorage.setItem('correct',  JSON.stringify(correctAnswers));
    localStorage.setItem('total',  JSON.stringify(totalAnswers));
    var win = window.open("resultat.html", '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }

function todo() {
    aciertoFallo();
    rotateSnellen(); 
    conversio();
    directions(); 
    ++i;
    if (i > 1) {
        ++totalAnswers[index];
        index = Math.round(visualAcucity*10);
    }
    if (cambioDirecciones.length == 4) {
        abrirNuevoTab(); 
    }
}

function aciertoFallo() {
    if (respuesta == 'acierto') {
        acierto();
        if (i > 0) ++correctAnswers[index]; 
    }
    else fallo(); 
}

function directions() {
    if (i != 0) {
        if (respuestasMontaña[i-1] != respuestasMontaña[i]) {
            cambioDirecciones.push(visualAcucityAntiga.toFixed(1));
        }
        if (cambioDirecciones.length == 4) {
            localStorage.setItem('cambio',  JSON.stringify(cambioDirecciones));
        }
    }
}

function acierto() {
    visualAcucityAntiga = visualAcucity; 
    visualAcucity = visualAcucity + 0.1; 
    if (visualAcucity > 2.6) {
        localStorage.setItem('cambio',  JSON.stringify(cambioDirecciones));
        abrirNuevoTab(); 
    } 
    var texto = 'Visual Acuity ' + Math.round(visualAcucity*10)/10; 
    document.getElementById('acucity').innerHTML = texto; 
    respuestasMontaña.push(1); 
}

function fallo() {
    visualAcucityAntiga = visualAcucity; 
    if (visualAcucity > 0.1) visualAcucity = visualAcucity - 0.1; 
    var texto = 'Visual Acuity ' + Math.round(visualAcucity*10)/10; 
    document.getElementById('acucity').innerHTML = texto;
    respuestasMontaña.push(0); 
}

function adalt() {
    if (orientacion == 'adalt') respuesta = 'acierto'; 
    else respuesta = 'fallo'; 
    todo(); 
}

function esquerra() {
    if (orientacion == 'esquerra') {
        respuesta = 'acierto';
    }
    else respuesta = 'fallo'; 
    todo();  
}

function dreta() {
    if (orientacion == 'dreta') respuesta = 'acierto'; 
    else respuesta = 'fallo'; 
    todo();  
}

function abaix() {
    if (orientacion == 'abaix') respuesta = 'acierto'; 
    else respuesta = 'fallo'; 
    todo();  
}

document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    var codeValue = event.code;
   
    console.log("keyValue: " + keyValue);
    console.log("codeValue: " + codeValue);

    if (keyValue == 'ArrowRight') {
        dreta(); 
    }
    else if (keyValue == 'ArrowLeft') {
        esquerra(); 
    }
    else if (keyValue == 'ArrowUp') {
        adalt(); 
    }
    else if (keyValue == 'ArrowDown'){
        abaix();
    }
  }, false);

function rotate(turnAngle) {
    document.getElementById('foto').setAttribute("style", "transform: rotate(" + turnAngle + "deg)");
}

function rotateSnellen() {
    var num = Math.floor(Math.random() * 4) + 1;
    if (num == 1) {
        rotate(0); 
        orientacion = 'dreta';
    }
    else if (num == 2) {
        rotate(90); 
        orientacion = 'abaix';
    }
    else if (num == 3) {
        rotate(180); 
        orientacion = 'esquerra';
    }
    else {
        rotate(270); 
        orientacion = 'adalt';
    }
}