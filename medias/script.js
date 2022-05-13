const personagem    =   document.getElementById("personagem")
const knucles       =   document.getElementById("knucles")
const moeda         =   document.getElementById("moeda") 

function seMoveInimigo(posicaoAtual, incrementoDaPosicaoAtual) {
    if (posicaoAtual === 100) {
        posicaoAtual = -10
    }

    knucles.style.right = posicaoAtual + '%'

    posicaoAtual += incrementoDaPosicaoAtual

    posicaoInimigo = posicaoAtual
}

function pula() {
    personagem.classList.add("pulo")

    personagem.setAttribute('src', 'img/cavaleiro pulando2.png')
        
    setTimeout( () => {
        personagem.setAttribute("src","img/Sprite cavaleiro2.0.gif")
        personagem.classList.remove("pulo") 
    }, 1300)
} // função responsável por executar o pulo do personagem e mudar a animação para uma que condiza com o pulo

function houveColisao(personagem, inimigo) {
    let houveColisao = false
    let colisaoX = false 
    let colisaoY = false 

    const posicoesDoPersonagem = personagem.getBoundingClientRect()
    const posicoesDoInimigo = inimigo.getBoundingClientRect()

    if (posicoesDoInimigo.left <= 154) {
        colisaoX = true 
    }

    if (posicoesDoPersonagem.bottom - 15 >= posicoesDoInimigo.top) {
        colisaoY = true
    } 

    if (colisaoX && colisaoY) {
        alert('colidiu!')
    }

    // if () {
    //     alert('cu!')
    // }    

    return houveColisao
}

window.addEventListener('keydown', (event) => {
    let posicaoPersonagem = window.getComputedStyle(personagem).bottom
    
    if (event.code=="Space" && posicaoPersonagem == '0px') 
        pula()
})

let posicaoInimigo = -10 // representando -10% à 'right' do jogo
const loop = setInterval(() => {
    // looping do jogo

    seMoveInimigo(posicaoInimigo, .5)
    houveColisao(personagem, knucles)
}, 10)

// setInterval(() => {
//     console.log(personagem.getBoundingClientRect())
// }, 500)




















// const idDoInterval = setInterval(() =>{

//     if (knucles.getBoundingClientRect().left  == personagem.getBoundingClientRect().right) {
//         alert('alert')
//     }
// }, 25)