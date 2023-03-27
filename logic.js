const game = document.getElementById("game")
const score_display = document.getElementById("score")

const perguntas_tipo = [
    {
        tipo : "QUEM",
        perguntas : [
            {
                pergunta : "Quem é considerado o pai da geometria?",
                resposta : ["Euclides", "Platão","Aristóteles"],
                certo : "Euclides",
                nivel : "facil",
                },
                {
                pergunta : "Quem Einstein se referiu sendo mais inteligente que ele mesmo?",
                resposta : ["Isaac Newton", "Leonardo Da Vinci","Nikola Tesla"],
                certo : "Nikola Tesla",
                nivel : "medio",
                },
                {
                pergunta : "Qual enxadrista foi considerado o gênio efêmero?",
                resposta : ["Bobby Fischer","Kasparov","Paul Morphy"],
                certo : "Paul Morphy",
                nivel : "dificil",
                }
        ]
    },
    {
        tipo : "QUANDO",
        perguntas : [
            {
                pergunta : "Em qual ano ocorreu a Revolução Francesa?",
                resposta : ["1787","1788","1789"],
                certo : "1789",
                nivel : "facil"
            },
            {
                pergunta : "Quando que a sequência de Fibonacci foi introduzida ao continente europeu pela primeira vez?",
                resposta : ["1202","1581","1650"],
                certo : "1202",
                nivel : "medio"
            },
            {
                pergunta : "Quando que a escola Educar de Itapema suspendeu as aulas devido ao COVID-19?",
                resposta : ["14/03/2020","15/03/2020","16/03/2020"],
                certo : "16/03/2020",
                nivel : "dificil"
            }
        ]
    },
    {
        tipo : "ONDE",
        perguntas : [
            {
                pergunta : "Onde nasceu Freddie Mercury?",
                resposta : ["Tânzania","Índia","Reino Unido"],
                certo : "Tânzania",
                nivel : "facil"
            },
            {
                pergunta : "Onde John Lennon conheceu Paul McCartney?",
                resposta : ["Cavern Club","Liverpool Club","Dancing Club"],
                certo : "Cavern Club",
                nivel : "medio"
            },
            {
                pergunta : "Onde um astronauta estaria se ele saísse voando à 300.000 km/s pra fora da Terra?",
                resposta : ["Sol","Andrômeda","Saturno"],
                certo : "Sol",
                nivel : "dificil"
            }
        ]
    },
    {
        tipo : "QUANTO",
        perguntas : [
            {
                pergunta : "Quantos planetas tem o sistema solar?",
                resposta : ["8","9","10"],
                certo : "8",
                nivel : "facil"
            },
            {
                pergunta : "Quantos ossos temos no nosso corpo?",
                resposta : ["206","199","301"],
                certo : "206",
                nivel : "medio"
            },
            {
                pergunta : "Quantos cm³ de sangue aproxi. o coração de uma baleia azul bombeia?",
                resposta : ["220.000","22.000","2.000"],
                certo : "220.000",
                nivel : "dificil"
            }
        ]
    },
    {
        tipo : "QUAL",
        perguntas : [
            {
                pergunta : "Qual montanha mais alta do Sistema Solar?",
                resposta : ["Monte Everest","Monte Olimpo","Pico da Neblina"],
                certo : "Monte Olimpo",
                nivel : "facil"
            },
            {
                pergunta : "Qual é o nome do matemático que ganhou o Nobel de economia em 1994?",
                resposta : ["John Nash","Gauss","Ramanujan"],
                certo : "John Nash",
                nivel : "medio"
            },
            {
                pergunta : "Qual filósofo era conhecido como cachorro?",
                resposta : ["Diógenes","Durkheim","Confúcio"],
                certo : "Diógenes",
                nivel : "dificil"
            },
        ]
    },
]

let score = 0


function add_categoria(categoria){
    const coluna = document.createElement("div");
    coluna.classList.add("coluna")

    const titulo = document.createElement("div");
    titulo.classList.add("titulo")
    titulo.innerHTML = categoria.tipo

    coluna.appendChild(titulo)
    game.append(coluna)
    titulo.style.textAlign = "center"

    categoria.perguntas.forEach(pergunta => {
        const card = document.createElement("div")
        card.classList.add("card")
        coluna.append(card)

        if(pergunta.nivel === "facil"){
            card.innerHTML = 300
        }
        if(pergunta.nivel === "medio"){
            card.innerHTML = 600
        }
        if(pergunta.nivel === "dificil"){
            card.innerHTML = 900
        }

        card.setAttribute("info-pergunta",pergunta.pergunta)
        card.setAttribute("info-resposta-1",pergunta.resposta[0])
        card.setAttribute("info-resposta-2",pergunta.resposta[1])
        card.setAttribute("info-resposta-3",pergunta.resposta[2])
        card.setAttribute("info-certo",pergunta.certo)
        card.setAttribute("info-value",card.getInnerHTML())
    
        card.addEventListener("click",flipCard)
    })
}

perguntas_tipo.forEach(categoria => add_categoria(categoria));

function flipCard(){
    this.innerHTML = ""
    this.style.fontSize = "1.2rem"
    this.style.lineHeight = "1.5rem"

    const text = document.createElement("div")
    text.classList.add("card-text")
    text.innerHTML = this.getAttribute("info-pergunta")
    const firstBtn = document.createElement("button")
    const secondBtn = document.createElement("button")
    const thirdBtn = document.createElement("button")

    firstBtn.classList.add("first-btn")
    secondBtn.classList.add("second-btn")
    thirdBtn.classList.add("third-btn")

    firstBtn.innerHTML = this.getAttribute("info-resposta-1")
    secondBtn.innerHTML = this.getAttribute("info-resposta-2")
    thirdBtn.innerHTML = this.getAttribute("info-resposta-3")

    firstBtn.addEventListener("click",resultado)
    secondBtn.addEventListener("click",resultado)
    thirdBtn.addEventListener("click",resultado)

    this.append(text,firstBtn,secondBtn,thirdBtn)

    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.removeEventListener("click",flipCard))
}



function resultado(){
    const allCards = Array.from(document.querySelectorAll(".card")) 
    allCards.forEach(card => card.addEventListener("click",flipCard))

    const card_btn = this.parentElement

    if(card_btn.getAttribute("info-certo") == this.innerHTML){
        score = score + parseInt(card_btn.getAttribute("info-value"))
        score_display.innerHTML = score
        card_btn.classList.add("resposta-certa")
         
        setTimeout(() => {
            while(card_btn.firstChild){
                card_btn.removeChild(card_btn.lastChild)
            }   
            card_btn.innerHTML = card_btn.getAttribute("info-value")
        },100);

    } else{
        card_btn.classList.add("resposta-errada")
        setTimeout(() => {
            while(card_btn.firstChild){
                card_btn.removeChild(card_btn.lastChild)
            }   
            card_btn.innerHTML = 0 
        },100);
    }
    card_btn.removeEventListener("click",flipCard)
}
