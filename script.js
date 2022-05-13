const madame = document.getElementById('madame')

// const inimigo = document.createElement('img')
//       inimigo.classList.add('inimigo')
//       inimigo.setAttribute('src', 'medias/animacoes/inimigo.gif')

const corredores = document.querySelectorAll('.corredor')

class Jogo {
    constructor(madame, melhorScore, corredores) {
        this.madame = madame
        this.melhorScore = melhorScore
        this.corredores = corredores

        this.scoreAtual = 0
        this.posicaoAtual = 0

        this.clicksNaMesmaDirecao  =  0

        this.loopingCounter = 100

        this.idElemento = 0
        this.idBomba = 0

        this.posicaoInicialDoElemento = -10

        this.jogoEmAndamento = 0

        this.jaTemPocao = false

        this.tempoNoAr = 0

        this.pulando = 0

        this.intervaloGeracaoInimigos = 3000 /* 1500 */ /* 750 */
        this.velocidadeDosPersongens = 50
    }

    prestarAtencaoEmEventos() {
        window.addEventListener('keydown', evento => {
            this.gerenciaMovimentacao(evento)
        })

        window.addEventListener('keyup', evento => {
            if (evento.code == 'Space') {
                this.tempoNoAr = 22
            }
        })

        window.addEventListener('click', () => {
            this.atirarPocao()
        })
    }

    tocarMusica() {
        window.addEventListener(('click'), () => {
            if (this.jogoEmAndamento == 1) {

            } else {
                const musiquinha = document.createElement('audio')
                musiquinha.setAttribute('src', 'medias/sons/musica.wav')
                
                musiquinha.play()

                this.jogoEmAndamento = 1
                
                setInterval(() => {
                    const musiquinha = document.createElement('audio')
                    musiquinha.setAttribute('src', 'medias/sons/musica.wav')
                    musiquinha.play()
                }, 12800)
            }
            
        })
    }

    gerenciaMovimentacao(evento) {
        if (evento.code == 'KeyW' || evento.code == 'ArrowUp') {
            this.atualizaPosicaoAtualDaMadame('up')
        }
        
        if (evento.code == 'KeyS' || evento.code == 'ArrowDown') {
            this.atualizaPosicaoAtualDaMadame('down')
        }

        if (evento.code == 'Space') {
            this.pular()
        }
    }

    atualizaPosicaoAtualDaMadame(direcao) {     
        if (this.pulando == 1) {
            
        } else {
            if (direcao == 'up') {
                if (this.clicksNaMesmaDirecao != 1) {
                    this.clicksNaMesmaDirecao += 1
    
                    this.madame.setAttribute('corredor', (+this.madame.getAttribute('corredor') - 1))
    
                    this.posicaoAtual -= document.querySelector('.corredor').clientHeight
                    this.madame.style.top = this.posicaoAtual + 'px'
                }
                else {
                    // Não deverá ir para cima, tendo em vista que o madame já está no topo
                }
            } else {
                if (this.clicksNaMesmaDirecao != -1) {
                    this.clicksNaMesmaDirecao -= 1
    
                    this.madame.setAttribute('corredor', (+this.madame.getAttribute('corredor') + 1))
    
                    this.posicaoAtual += document.querySelector('.corredor').clientHeight
                    this.madame.style.top = this.posicaoAtual + 'px'
                }
                else {
                    // Não deverá ir para baixo, tendo em vista que o madame já está no limite
                }
            }
        }
    }

    scoreLooping() {
        setInterval(() => {
            this.atualizaScoreAtual(1)
        }, 350)
    }

    atualizaScoreAtual(incremento) {
        let espacoParaScoreAtual = document.getElementById('scoreAtual')
        espacoParaScoreAtual.innerText = this.scoreAtual += incremento
    }

    configurarMelhorScore() {
        let espacoParaMelhorScore = document.getElementById('melhorScore')
        espacoParaMelhorScore.innerText = `HI ${this.melhorScore}`
    }

    loopingGeral() {
        let elementos = document.querySelectorAll('.elemento')

        let corredorDaMadame = null
        let corredorDoElemento = null
        
        let colisaoX = null
        let colisaoY = null
        let estaoNoMesmoCorredor = null
        let houveColisao = null

        setInterval(() => {
            elementos = document.querySelectorAll('.elemento')

            corredorDaMadame = this.madame.getAttribute('corredor')

            elementos.forEach(elemento => {
                corredorDoElemento = elemento.getAttribute('corredor')
                
                colisaoX = elemento.getBoundingClientRect().left <= this.madame.getBoundingClientRect().right - 10 && elemento.getBoundingClientRect().right >= this.madame.getBoundingClientRect().left + 10
                colisaoY = elemento.getBoundingClientRect().top <= this.madame.getBoundingClientRect().bottom - 10 && elemento.getBoundingClientRect().bottom >= this.madame.getBoundingClientRect().top + 10
                estaoNoMesmoCorredor = corredorDoElemento == corredorDaMadame
                houveColisao = (colisaoX && colisaoY && estaoNoMesmoCorredor)

                if (houveColisao) {
                    if (elemento.classList.contains('inimigo')) {
                        alert('colisão')
                    } else if (elemento.classList.contains('pocao')) {
                        this.coletaPocao()
                    }
                }

                
            })
        }, this.loopingCounter)
    }

    loopingGeradorDeInimigos() {
        const loop1 = setInterval(() => {
            const tipoInimigo = Math.floor((Math.random() * 2) + 1);
            let inimigo = null

            switch (tipoInimigo) {
                case 1:
                    inimigo = 'padre'
                    break;  
                case 2:
                    inimigo = 'barril'
                    break;  
            }
            
            this.gerarNovoElemento(inimigo)
        }, 3000)
        
        setTimeout(() => {
            clearInterval(loop1)
            const loop2 = setInterval(() => {
                const tipoInimigo = Math.floor((Math.random() * 2) + 1);
                let inimigo = null
    
                switch (tipoInimigo) {
                    case 1:
                        inimigo = 'padre'
                        break;  
                    case 2:
                        inimigo = 'barril'
                        break;  
                }
                
                this.gerarNovoElemento(inimigo)
            }, 1500)

            setTimeout(() => {
                clearInterval(loop2)
                const loop3 = setInterval(() => {
                    const tipoInimigo = Math.floor((Math.random() * 2) + 1);
                    let inimigo = null
        
                    switch (tipoInimigo) {
                        case 1:
                            inimigo = 'padre'
                            break;  
                        case 2:
                            inimigo = 'barril'
                            break;  
                    }
                    
                    this.gerarNovoElemento(inimigo)
                }, 750)
    
                setTimeout(() => {
                    clearInterval(loop3)
                    const loop4 = setInterval(() => {
                        const tipoInimigo = Math.floor((Math.random() * 2) + 1);
                        let inimigo = null
            
                        switch (tipoInimigo) {
                            case 1:
                                inimigo = 'padre'
                                break;  
                            case 2:
                                inimigo = 'barril'
                                break;  
                        }
                        
                        this.gerarNovoElemento(inimigo)
                    }, 200)
                    setTimeout(() => {
                        clearInterval(loop3)
                        const loop4 = setInterval(() => {
                            const tipoInimigo = Math.floor((Math.random() * 2) + 1);
                            let inimigo = null
                
                            switch (tipoInimigo) {
                                case 1:
                                    inimigo = 'padre'
                                    break;  
                                case 2:
                                    inimigo = 'barril'
                                    break;  
                            }
                            
                            this.gerarNovoElemento(inimigo)
                        }, 50)
                    }, 80000)
                }, 60000)
            }, 40000)
        }, 20000)
        
    }

    loopingGeradorDeBombas() {
        setInterval(() => {
            this.gerarNovoElemento('pocao')
        }, 10000)
    }

    gerarNovoElemento(identificacaoElemento) {
        const elemento = document.createElement('img')
        elemento.setAttribute('id',    ++this.idElemento)
        elemento.setAttribute('src',   `medias/animacoes/${identificacaoElemento}.gif`)

        if (identificacaoElemento == 'padre' || identificacaoElemento == 'barril') 
            identificacaoElemento = 'inimigo'

        elemento.classList.add('elemento', identificacaoElemento)

        const corredor = Math.floor((Math.random() * 3) + 1);

        if (corredor == 1) {
            elemento.setAttribute('corredor', corredor)
            this.corredores[0].appendChild(elemento)
        } else if (corredor == 2) {
            elemento.setAttribute('corredor', corredor)
            this.corredores[1].appendChild(elemento)
        } else {
            elemento.setAttribute('corredor', corredor)
            this.corredores[2].appendChild(elemento)
        }

        this.movimentarElemento(elemento, identificacaoElemento)
    }

    movimentarElemento(elemento, identificacaoElemento = 'null') {
        let posicaoAtual = this.posicaoInicialDoElemento

        const loop = setInterval(() => {
            if (posicaoAtual >= 110) {
                elemento.classList.remove('elemento', identificacaoElemento)
                elemento.style.display = 'none'

                clearInterval(loop)
            } else {
                posicaoAtual += 0.5
                elemento.style.right = posicaoAtual + '%'
            }
        }, this.velocidadeDosPersongens)
    }

    aumentarVelocidadeDoJogoPeriodicamente() {
        const loop = setInterval(() => {
            this.intervaloGeracaoInimigos += 10
            this.velocidadeDosPersongens -= 0.05

            if (this.velocidadeDosPersongens <= 5) {
                clearInterval(loop)
            }
        }, 100)
    }

    moverCenario() {
        const cenario1 = document.getElementById('cenario1')
        const posicaoInicialCenario1 = +window.getComputedStyle(cenario1).right.replace('px', '')
        let posicaoAtualCenario1 = posicaoInicialCenario1

        const cenario2 = document.getElementById('cenario2')
        const posicaoInicialCenario2 = +window.getComputedStyle(cenario2).right.replace('px', '')
        let posicaoAtualCenario2 = posicaoInicialCenario2

        setInterval(() => {
            posicaoAtualCenario1 += 10
            posicaoAtualCenario2 += 10

            cenario1.style.right = posicaoAtualCenario1 + 'px'
            cenario2.style.right = posicaoAtualCenario2 + 'px'

            if (cenario1.getBoundingClientRect().right <= 100) {
                posicaoAtualCenario1 = posicaoInicialCenario2
                cenario1.style.right = (posicaoAtualCenario1) + 'px'
            }

            if (cenario2.getBoundingClientRect().right <= 100) {
                posicaoAtualCenario2 = posicaoInicialCenario2
                cenario2.style.right = (posicaoAtualCenario2) + 'px'
            }


        }, this.velocidadeDosPersongens)
    }

    coletaPocao() {
        if (this.jaTemPocao) {
            
        } else {
            this.madame.setAttribute('src', 'medias/animacoes/pegandoPocao.gif')
            this.jaTemPocao = true

            new Audio('./medias/sons/ganharSkill.wav').play()

            setTimeout(() => {
                if (this.jaTemPocao) {
                    this.madame.setAttribute('src', 'medias/animacoes/curiePocao.gif')
                } else {
                    this.madame.setAttribute('src', 'medias/animacoes/curie.gif')
                }

                console.log(this.jaTemPocao)
            }, 1650)
        }
    }

    pular() {
        this.madame.setAttribute('src', './medias/imagens/pulando.png')
        let alturaAtual = +madame.style.top.replace('px', '') || 0
        
        if (this.pulando != 1) {
            this.pulando = 1
            
            // this.madame.setAttribute('src', '')
            alturaAtual -= this.corredores[0].clientHeight + 50
            this.madame.style.top = alturaAtual + 'px'

            const tempoNoAr = setInterval(() => {
                this.tempoNoAr++
    
                if (this.tempoNoAr > 20) {
                    this.tempoNoAr = 0
                    this.cair()
                    clearInterval(tempoNoAr)
                }
            }, 100);
        }


    }

    cair() {
        setTimeout(() => {
            if (this.jaTemPocao) {
                this.madame.setAttribute('src', './medias/animacoes/curiePocao.gif')
            } else {
                this.madame.setAttribute('src', './medias/animacoes/curie.gif')
            }
            this.pulando = 0
        }, 100);

        this.madame.setAttribute('src', './medias/imagens/caindo.png')
        let alturaAtual = +this.madame.style.top.replace('px', '')
        const alturaCorredor = this.corredores[0].clientHeight + 50

        alturaAtual += alturaCorredor
        this.madame.style.top = alturaAtual + 'px'
    }

    atirarPocao() {
        if (this.jaTemPocao) {
            const corredor = this.madame.getAttribute('corredor')
            const pocao = document.createElement('img')
            pocao.setAttribute('corredor',  corredor)
            pocao.setAttribute('src',       './medias/imagens/pocao.png')
    
            corredores[corredor - 1].appendChild(pocao)
            pocao.classList.add('pocaoAtirada')
    
            setTimeout(() => {
                this.jaTemPocao = false
            }, 1000);
    
            this.madame.setAttribute('src', './medias/animacoes/curie.gif')
    
            pocao.style.left = this.madame.getBoundingClientRect().right - (this.madame.width / 2)+ 'px'
    
            new Audio('./medias/sons/poder/jogar.wav').play()
    
            this.movimentarPocaoAtirada(pocao)
        }
    }

    movimentarPocaoAtirada(pocao) {
        let posicaoAtual = +pocao.style.left.replace('px', '')

        const movimentaBomba = setInterval(() => {
            posicaoAtual += 5
            pocao.style.left = posicaoAtual + 'px'

            document.querySelectorAll('.inimigo').forEach(inimigo => {
                if (pocao.getBoundingClientRect().right >= inimigo.getBoundingClientRect().left && pocao.getAttribute('corredor') == inimigo.getAttribute('corredor')) {
                    console.log('explodiu')
                    clearInterval(movimentaBomba)
                    new Audio('./medias/sons/poder/explosao.wav').play()

                    const explosao = document.createElement('img')
                    explosao.setAttribute('src', './medias/animacoes/explosao.gif')
                    explosao.classList.add('explosao')

                    document.querySelectorAll('.corredor')[+pocao.getAttribute('corredor') - 1].appendChild(explosao)

                    explosao.style.left = pocao.getBoundingClientRect().right - (pocao.width * 1.25) + 'px'

                    pocao.style.display = 'none'
                    pocao.classList.remove('pocao')
                    pocao.style.left = '9999999999999px'
                    inimigo.style.display = 'none'
                    inimigo.classList.remove('inimigo')
                    inimigo.style.left = '9999999999999px'

                    setTimeout(() => {
                        explosao.style.display = 'none'
                        explosao.classList.remove('explosao')
                        explosao.style.left = '9999999999999px'
                    }, 1250);
                }
            })
        }, 10);
    }
}

const joguito = new Jogo(madame, 100, corredores)
joguito.tocarMusica()
joguito.prestarAtencaoEmEventos()
joguito.scoreLooping()
joguito.loopingGeral()
joguito.loopingGeradorDeInimigos()
joguito.loopingGeradorDeBombas()
joguito.configurarMelhorScore()
joguito.moverCenario()
joguito.aumentarVelocidadeDoJogoPeriodicamente()

let c = 0

setInterval(() => {
    console.log(++c)
}, 1000);