const $template = document.getElementById("card").content
const $fragmento = document.createDocumentFragment()
const $guia = document.querySelector("#guia")
const cajaPares = []

const hablar = (texto) => speechSynthesis.
speak(new SpeechSynthesisUtterance(texto));

const validarPares = (elemento) =>{
    cajaPares.push(elemento)

    if(cajaPares.length === 2){
        let $carta2 = cajaPares.pop()
        let $carta1 = cajaPares.pop()
        let numCarta1 = $carta1.parentElement.querySelector(".contenedor__number").innerHTML
        let numCarta2 = $carta2.parentElement.querySelector(".contenedor__number").innerHTML
        if(numCarta1 != numCarta2){
            setTimeout(()=>{
                $carta1.classList.toggle("tapa2")
                $carta2.classList.toggle("tapa2") 
            },1200)
            
        }
    }
}

const voltear = (e)=>{
    console.log(e.target)
    let $carta = e.target
    console.log($carta.id)
    if($carta.id == "tapa"){
        $carta.classList.toggle("tapa2")
        let $ctext = $carta.parentElement.querySelector(".contenedor__text")
        hablar($ctext.innerHTML)
        validarPares($carta)
    }
}

let cardContent = [
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

const aleatorio =(max) => {
    let num = Math.floor(Math.random() * ((max+1) - 0) + 0);
    return num
}

const salioDeNuevo = (num) => (cardContent[num].cont==1)


const barajar = () =>{
    for(i = 0;i < 18;i++){
        numero = aleatorio(cardContent.length-1)
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
}
barajar();
$guia.appendChild($fragmento)
$guia.addEventListener("click",voltear,true)

