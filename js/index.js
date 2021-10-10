const imagenes = document.querySelectorAll('img');

const SOURCES = [
    './img/perro.svg',
    './img/vaquita.svg',
    './img/perro-gris.svg',
    './img/rana.svg',
    './img/tigre.svg',
    './img/gallina.svg',
    './img/cangrejo.svg',
    './img/cerdito.svg'

]

function generar_panel(){
    const imagenesUsadas = {
        './img/perro.svg': 0,
        './img/vaquita.svg': 0,
        './img/perro-gris.svg': 0,
        './img/rana.svg': 0,
        './img/tigre.svg': 0,
        './img/gallina.svg': 0,
        './img/cangrejo.svg': 0,
        './img/cerdito.svg': 0
    }

    imagenes.forEach(function(imagen){
        let fuente = SOURCES[Math.floor(Math.random() * SOURCES.length)]
        let cantidadImagenesEnPanel = imagenesUsadas[fuente]

        while(cantidadImagenesEnPanel == 2){
            fuente = SOURCES[Math.floor(Math.random() * SOURCES.length)]
            cantidadImagenesEnPanel = imagenesUsadas[fuente]
        }

        imagenesUsadas[fuente] += 1
        imagen.src = fuente;
        imagen.classList.add('img-thumbnail');
    })
}

generar_panel();

const panel = [];
document.querySelector('#jugar').onclick = empezarJuego;
const reversoTarjeta = './img/blanco.svg'
let otraTarjetaVolteada = false;

function empezarJuego(){
    imagenes.forEach(function(imagen, index){
        imagen.id = index;
        panel.push(imagen.src);
        imagen.src = reversoTarjeta;
        imagen.onclick = mostrarTarjeta;
    })
}

function mostrarTarjeta(evento){
    let tarjeta = evento.target;
    tarjeta.src = panel[tarjeta.id];

    const tarjetaAnterior = document.querySelector('.volteada');
    if (tarjeta === tarjetaAnterior){
        return;
    }
    
    if(otraTarjetaVolteada){

        if (panel[tarjetaAnterior.id] !== panel[tarjeta.id]){
            setTimeout(function(){
                tarjeta.src = reversoTarjeta;
                tarjetaAnterior.src = reversoTarjeta;
            }, 1000)
        }
        
        tarjeta.classList.remove('volteada');
        tarjetaAnterior.classList.remove('volteada');
        otraTarjetaVolteada = false;
    } else {
        otraTarjetaVolteada = true;
        tarjeta.classList.add('volteada');
    }
}



