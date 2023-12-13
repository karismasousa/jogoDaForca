const prompt = require('prompt-sync')();
class GameController {
    constructor() {
      this.player = new Player("Jogador1");
      this.match = new Match();
    }
  
    iniciarJogo() {
      console.log("Bem-vindo ao Jogo da Forca!");
      console.log("Dica: Países do mundo");
      this.match.iniciarPartida();
      this.realizarJogada();
    }
  
    encerrarJogo() {
      this.simularLoading(() => {
        console.log("Jogo encerrado. Pontuação final: " + this.player.getPontuacao());
        console.log("A palavra era: " + this.match.getPalavra());
        this.menu();
      });
    }
  
    realizarJogada() {
      this.match.mostrarPalavraAtual();
      const letra = this.player.fazerJogada();
  
      this.match.processarJogada(letra);
  
      if (this.match.verificarVitoria()) {
        console.log("Parabéns! Você venceu!");
        this.player.incrementarPontuacao();
        this.encerrarJogo();
      } else if (this.match.verificarDerrota()) {
        console.log("Você perdeu! A palavra era: " + this.match.getPalavra());
        this.encerrarJogo();
      } else {
        this.realizarJogada();
      }
    }
  
    menu() {
      const opcao = prompt("Deseja jogar novamente? (S/N)").toUpperCase();
      if (opcao === "S") {
        this.match = new Match(); 
        this.iniciarJogo();
      } else {
        console.log("Obrigado por jogar!");
      }
    }
  
    simularLoading(callback) {
      let progress = 0;
      const loadingInterval = setInterval(() => {
        progress += 50;
        const progressBar = this.loadingBar(progress);
        console.clear();
        console.log(`\nCarregando: ${progress}%`);
        console.log(progressBar);
  
        if (progress === 100) {
          clearInterval(loadingInterval);
          callback();
        }
      }, 500);
    }
  
    loadingBar(percentage) {
      const barLength = 20;
      const filledLength = Math.round(barLength * (percentage / 100));
      const emptyLength = barLength - filledLength;
  
      const progressBar =
        "[" + "=".repeat(filledLength) + " ".repeat(emptyLength) + "]";
      return progressBar;
    }
  }
  
  class Player {
    constructor(nome) {
      this.nome = nome;
      this.pontuacao = 0;
    }
  
    fazerJogada() {
      const letra = prompt("Digite uma letra: ").toUpperCase();
      return letra;
    }
  
    incrementarPontuacao() {
      this.pontuacao++;
    }
  
    getPontuacao() {
      return this.pontuacao;
    }
  }
  
  class Match {
    constructor() {
      this.paises = ["BRASIL", "ESTADOS UNIDOS", "CANADA", "ITALIA", "ALEMANHA", "JAPAO", "AUSTRALIA"];
      this.palavra = this.escolherPalavraAleatoria();
      this.letrasAdivinhadas = [];
      this.tentativasRestantes = 6;
    }
  
    escolherPalavraAleatoria() {
      const indice = Math.floor(Math.random() * this.paises.length);
      return this.paises[indice];
    }
  
    iniciarPartida() {
      this.palavraAtual = "_".repeat(this.palavra.length);
    }
  
    mostrarPalavraAtual() {
      console.log("Palavra: " + this.palavraAtual);
      console.log("Tentativas restantes: " + this.tentativasRestantes);
    }
  
    processarJogada(letra) {
      if (!this.letrasAdivinhadas.includes(letra)) {
        this.letrasAdivinhadas.push(letra);
        if (!this.palavra.includes(letra)) {
          this.tentativasRestantes--;
        } else {
          this.atualizarPalavraAtual(letra);
        }
      }
    }
  
    atualizarPalavraAtual(letra) {
      for (let i = 0; i < this.palavra.length; i++) {
        if (this.palavra[i] === letra) {
          this.palavraAtual =
            this.palavraAtual.substring(0, i) +
            letra +
            this.palavraAtual.substring(i + 1);
        }
      }
    }
  
    verificarVitoria() {
      return this.palavraAtual === this.palavra;
    }
  
    verificarDerrota() {
      return this.tentativasRestantes === 0;
    }
  
    getPalavra() {
      return this.palavra;
    }
  }
  
  const gameController = new GameController();
  gameController.iniciarJogo();
  