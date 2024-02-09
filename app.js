//Declarar las VARIABLES
let numSecreto = 0;
let intentos = 0; //es para el contador, se inicializa en 0
let listaNumSorteados =  [];  //lista para almacenan los numeros sorteados 
let numMaximo = 10 // dar el limite de la lista

//Función para ASIGNAR TEXTO 
function asignarTextoElemento(elemento,texto) {
    let elementoHTML = document.querySelector (elemento);
    elementoHTML.innerHTML = texto;
    return; 
}

//Función para capturar el INPUT, dato que ingresa el usuario
function verificarIntento(){ 
    let numDeUsuario = parseInt(document.getElementById ('valorUsuario').value) ;

        if (numDeUsuario === numSecreto) { //condicion para que compare los dos números
            asignarTextoElemento ('p', `Acertaste el número en ${intentos} ${(intentos ===1) ? 'vez' : 'veces'}`); //es para INDICAR SI LA PERSONA ACIERTA O NO. 
            document.getElementById ('reiniciar').removeAttribute('disabled'); //es para HABILITAR EL BOTON NUEVO JUEGO cuando el jugador gana.  

        } else { //cuando el usuario no acierta
            if (numDeUsuario > numSecreto) { //ayuda para el usuario
                asignarTextoElemento ('p', 'El número secreto es menor');
            } else {
                asignarTextoElemento ('p', 'El número secreto es mayor');
            }
            intentos++;// CONTADOR
            limpiarCaja ();
        }
        return;  
}

//Función para LIMPIAR EL CAMPO 
function limpiarCaja (){
    document.querySelector('#valorUsuario').value = '';
}

//Función para GENERAR NUMERO ALEATORIO
function generarNumSecreto (){ 
    let numeroGenerado = Math.floor (Math.random ()*numMaximo+1); // CHEQUEA Y EVITA QUE SE REPITA EL NUMERO SECRETO. 

    if (listaNumSorteados.length == numMaximo) { //SOLUCIONA EL PROBLEMA DE LA RECURSIVIDAD  
        asignarTextoElemento ('p' , 'Ya se han sorteado todos los números posibles');
    } else { //sino salió sorteado el número se sigue jugando

        if (listaNumSorteados.includes (numeroGenerado)){ 
            return generarNumSecreto (); //RECURSIVIDAD 
        } else {
            listaNumSorteados.push (numeroGenerado); // agrega el nuevo número a la lista
            return numeroGenerado;
        }
    }
}

//Función para CONDICIONES INICIALES
function condicionesIniciales (){
    asignarTextoElemento('h1', 'Juego del número secreto'); 
    asignarTextoElemento('p', `Indica un número del 1 al ${numMaximo}`);  //indica mensaje de intervalo de número.
    numSecreto = generarNumSecreto ();  //genera el número aleatorio
    intentos = 1; //inicializa el número de intentos
}

//Función para REINICIAR JUEGO 
function reiniciarJuego (){ //hay: 
    //limpiar la caja
    limpiarCaja (); 
    //indicar mensaje de intervalo de numero 
    //generar el numero aleatorio
    //inicializar en numero de intentos
    condicionesIniciales ();
    //deshabilitar el boton de nuevo juego 
    document.querySelector ('#reiniciar').setAttribute ('disabled' , 'true');
}

condicionesIniciales ();