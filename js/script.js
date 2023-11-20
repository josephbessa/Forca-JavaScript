// Objeto com temas e arrays de palavras
const temas = {
    programacao: ["javascript", "html", "css", "desenvolvedor", "java", "array", "php", "python", "typescript", "angular", "react", "nodejs", "jquery", "bootstrap", "firebase", "ajax"],
    animais: ["gato", "cachorro", "leao", "elefante", "tigre", "raposa", "golfinho", "panda", "zebra", "leopardo", "rinoceronte", "urso", "jacare", "coruja", "avestruz", "papagaio"],
    frutas: ["banana", "laranja", "uva", "abacaxi", "manga", "goiaba", "pera", "kiwi", "melancia", "morango", "cereja", "abacate", "pitaya", "figo", "pêssego", "ameixa"]
};

// Escolher um tema aleatório
const temasArray = Object.keys(temas);
const temaSelecionado = temasArray[Math.floor(Math.random() * temasArray.length)];

// Escolher uma palavra aleatória do tema selecionado
let palavrasTema = temas[temaSelecionado];
let palavraOculta = palavrasTema[Math.floor(Math.random() * palavrasTema.length)];

// Atualizar o tema da palavra
document.getElementById("tema-palavra").innerText = "Tema: " + temaSelecionado;

let letrasAdivinhadas = [];
let maxTentativas = 6;
let tentativasRestantes = maxTentativas;

// Inicializar o jogo
document.addEventListener("DOMContentLoaded", function () {
    exibirPalavra();
});

// Função para exibir a palavra
function exibirPalavra() {
    let exibicao = "";
    for (let letra of palavraOculta) {
        if (letrasAdivinhadas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }
    document.getElementById("exibicao-palavra").innerHTML = exibicao.trim();
    return exibicao;
}

// Função que vai verificar a letra
function verificarLetra(letra) {
    return palavraOculta.includes(letra);
}

// Função para atualizar as letras advinhadas
function atualizarLetrasAdivinhadas() {
    document.getElementById("letras-adivinhadas").innerHTML = "Letras adivinhadas: " + letrasAdivinhadas.join(", ");
}

// função para advinhar a letra
function adivinharLetra() {
    let entradaLetra = document.getElementById("entrada-letra");
    let letraAdivinhada = entradaLetra.value.toLowerCase();

    if (letraAdivinhada.length === 1 && /^[a-z]+$/.test(letraAdivinhada)) {
        if (letrasAdivinhadas.includes(letraAdivinhada)) {
            alert("Você já tentou essa letra!");
        } else {
            letrasAdivinhadas.push(letraAdivinhada);

            if (verificarLetra(letraAdivinhada)) {
                alert("Letra correta!");
            } else {
                tentativasRestantes--;
                alert("Letra incorreta. Tentativas restantes: " + tentativasRestantes);
            }

            let exibicaoAtual = exibirPalavra();
            atualizarLetrasAdivinhadas();

            verificarStatusJogo(exibicaoAtual);
        }

        entradaLetra.value = "";
    } else {
        alert("Por favor, insira uma única letra válida.");
    }
}

// Função vencedor ou perdedor
function verificarStatusJogo(exibicaoAtual) {
    if (tentativasRestantes === 0) {
        alert("Você perdeu! A palavra era: " + palavraOculta);
        reiniciarJogo();
    } else if (!exibicaoAtual.includes("_")) {
        alert("Parabéns! Você ganhou!");
        reiniciarJogo();
    }
}

// Função para reiniciar a partida
function reiniciarJogo() {
    const novoTema = temasArray[Math.floor(Math.random() * temasArray.length)];
    
    palavrasTema = temas[novoTema];
    palavraOculta = palavrasTema[Math.floor(Math.random() * palavrasTema.length)];

    document.getElementById("tema-palavra").innerText = "Tema: " + novoTema;

    letrasAdivinhadas = [];
    tentativasRestantes = maxTentativas;
    exibirPalavra();
    atualizarLetrasAdivinhadas();
}
