const $template = document.getElementById("card").content
const $fragmento = document.createDocumentFragment()
const $guia = document.querySelector("#guia")
const $reiniciar = document.querySelector(".reset")
const cajaPares = []
const movimientos = document.querySelector(".pmovimiento")
let pmovimientos
const pares = document.querySelector(".npares")
let npares
let inicio = false



const hablar = (texto) => speechSynthesis.
speak(new SpeechSynthesisUtterance(texto));

const actualizarMarcador = () =>{
    movimientos.innerHTML = pmovimientos
    pares.innerHTML = npares
}

const validarPares = (elemento) =>{
    cajaPares.push(elemento)

    if(cajaPares.length === 2){//opera cuando tenemos dos cartas en la pila
        $guia.removeEventListener("click",voltear)
        let $carta2 = cajaPares.pop()
        let $carta1 = cajaPares.pop()
        let numCarta1 = $carta1.parentElement.querySelector(".contenedor__number").innerHTML
        let numCarta2 = $carta2.parentElement.querySelector(".contenedor__number").innerHTML
        if(numCarta1 != numCarta2){
            setTimeout(()=>{//tiempo de espera para volver a esconder las cartas
                $carta1.classList.toggle("tapa2")
                $carta2.classList.toggle("tapa2")
                $guia.addEventListener("click",voltear) 
            },1300)    
        }
        else{
            npares--
            actualizarMarcador()
            setTimeout(()=>{//tiempo de espera para volver a esconder las cartas
                $guia.addEventListener("click",voltear) 
            },1300)
        }
    }
}

const voltear = (e)=>{
    let $carta = e.target
    if(e.target.matches("#tapa")){//valida si contienen el selector indicado
        pmovimientos++;
        actualizarMarcador()
        $carta.classList.toggle("tapa2")
        let $ctext = $carta.parentElement.querySelector(".contenedor__text")
        hablar($ctext.innerHTML)
        validarPares($carta)
    }
}

let cardBase = [
    {
        num:"1",
        text:"uno",
        cont:0
    },
    {
        num:"2",
        text:"dos",
        cont:0
    },
    {
        num:"3",
        text:"tres",
        cont:0
    },
    {
        num:"4",
        text:"cuatro",
        cont:0
    },
    {
        num:"5",
        text:"cinco",
        cont:0
    },
    {
        num:"6",
        text:"seis",
        cont:0
    },
    {
        num:"7",
        text:"siete",
        cont:0
    },
    {
        num:"8",
        text:"ocho",
        cont:0
    },
    {
        num:"9",
        text:"nueve",
        cont:0
    }
]

let cardContent = []

const aleatorio =(max) => {
    let num = Math.floor(Math.random() * ((max+1) - 0) + 0);
    return num
}

const limpiar = ()=>{
    let $cartas = document.querySelectorAll(".contenedor")
    $cartas.forEach(
        (carta) =>{
            $guia.removeChild(carta)
        }
    )
}

const salioDeNuevo = (num) => (cardContent[num].cont==1);

const barajar = () =>{
    npares = 9
    pmovimientos = 0
    actualizarMarcador()
    cardContent = cardBase.slice()
    console.log(cardContent)
    for(i = 0;i < 18;i++){
        numero = aleatorio(cardContent.length-1)
        console.log(cardContent)
        $template.querySelector(".contenedor__number").innerHTML = cardContent[numero].num
        $template.querySelector(".contenedor__text").innerHTML = cardContent[numero].text
        if(salioDeNuevo(numero)){
            cardContent.splice(numero,1)
        }
        else{
            cardContent[numero].cont++  
        }
        let $clon = document.importNode($template,true)
        $fragmento.appendChild($clon) 
    }
    cardBase.forEach(
        (posicion)=>{
           posicion.cont= 0 
        }
    )
    if(inicio){
        limpiar()
    }
    $guia.appendChild($fragmento)
    $guia.addEventListener("click",voltear)
    inicio = true
}

barajar()
$reiniciar.addEventListener("click",barajar)

