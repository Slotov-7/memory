const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const isMultiplayer = window.location.href.includes('multiplayer');
const spanPlayer1Score = document.getElementById('P1_Score');
const spanPlayer2Score = document.getElementById('P2_Score');
const spanTurn = document.getElementById('turn');

let turn = false;
let playersScores = [0, 0];

const iconAnimals = [
  'bee',
  'chameleon',
  'crab',
  'hen',
  'jellyfish',
  'koala',
  'penguin',
  'sea-lion',
  'snake',
  'turtle',
  'cow',
  'fox',
];

const iconUfs = [
  'bicen',
  'dcomplogo',
  'dcomp',
  'did7',
  'softeam',
  'filaresun',
  'gato',
  'mapa',
  'bugados',
  'resun',
  'ufs',
  'ufscarta',
];

// A função getIcons é utilizada para retornar uma lista de ícones com base no tema escolhido do jogo.
const getIcons = () => {
  const currentTheme = localStorage.getItem('theme') || 'animal';
  if (currentTheme === 'animal') {
    return iconAnimals;
  } else {
    return iconUfs;
  }
}
const icon = getIcons();


const grid = document.querySelector('.grid');

// Função para criar um elemento HTML com uma classe CSS
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

// Função para obter o nome dos jogadores
const getName = () => [
  localStorage['player1Name'],
  localStorage['player2Name'],
];

// Função para obter os jogadores com pontuação
const getScore = (playersName) => playersScores
  .map((n, i) => ({ score: n, index: i }))
  .sort((a, b) => b.score - a.score)
  .map(player => ({ ...player, name: playersName[player.index] }));

// Função para exibir o resultado para o modo multiplayer
const multiplayerResult = (playersWithScore) => {
  const [winner, loser] = playersWithScore;

  if (winner.score === loser.score) {
    alert(`It's a tie! Both ${winner.name} and ${loser.name} scored ${winner.score} points!!`);
  } else {
    alert(`Congratulations! ${winner.name} won with ${winner.score} points!! Your time was ${timer.innerHTML}`);
  }
};

// Função para exibir o resultado para o modo single player
const singleplayerResult = (playersName) => {
  alert(`Congratulations, ${playersName[0]}! Your time was ${timer.innerHTML}s`);
};

// Função principal para verificar se o jogo terminou
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 24) {
    clearInterval(this.loop);

    const playersName = getName();

    if (isMultiplayer) {
      const playersWithScore = getScore(playersName);
      multiplayerResult(playersWithScore);
    } else {
      singleplayerResult(playersName);
    }
  }
};


// Função para atualizar as pontuações dos jogadores
const updateScores = () => {
  spanPlayer1Score.innerText = `Score: ${playersScores[0]}`;
  if (isMultiplayer) {
    spanPlayer2Score.innerText = `Score: ${playersScores[1]}`;
  }
};

// Função para alterar o turno do jogador
const changeTurn = () => {
  turn = !turn;
  spanTurn.innerText = `Turn: ${turn ? localStorage['player2Name'] : localStorage['player1Name']}`;
}

// Função para verificar se duas cartas são iguais
const checkCards = (firstCard, secondCard) => {
  let player = turn ? 1 : 0;
  if (isMultiplayer) {
    changeTurn();
  }
  // Função para verificar se os ícones das duas cartas são iguais
  const icons = (firstCard, secondCard) =>
    firstCard.getAttribute("data-icon") === secondCard.getAttribute("data-icon");
  // Função para desabilitar uma carta (adiciona uma classe "disabled-card")
  const disableCard = (card) => card.classList.add("disabled-card");

  // Função para ocultar uma carta (remove a classe "reveal-card")
  const hideCard = (card) => card.classList.remove("reveal-card");

  // Função para lidar com o resultado da comparação das cartas
  const handleResult = (result, cards) => {
    if (result) {
      // Se as cartas forem iguais, desabilite as cartas e chame a função "checkEndGame"
      cards.map(disableCard);
      playersScores[player] += 1;
      updateScores()
      checkEndGame(); // Chama a função de final do jogo
    } else {
      // Se as cartas não forem iguais, oculte as cartas após um atraso de 500ms
      setTimeout(() => {
        cards.map(hideCard);
      }, 500);
    }
    // Retorna um array vazio ['','']
    return ['', ''];
  };

  // Verifica se os ícones das duas cartas são iguais
  if (icons(firstCard, secondCard)) {
    // Se forem iguais, chama a função "handleResult" com "true" e as duas cartas
    return handleResult(true, [firstCard.firstChild, secondCard.firstChild]);
  } else {
    // Se não forem iguais, chama a função "handleResult" com "false" e as duas cartas
    return handleResult(false, [firstCard, secondCard]);
  }
};

// Função para revelar uma carta quando o houver um click nela
const revealCard = (event) => {
  const target = event.target;
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    [firstCard, secondCard] = checkCards(firstCard, secondCard);
  }
}

// Função para criar uma nova carta com base no ícone fornecido
const createCard = (icon) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../assets/${icon}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-icon', icon)

  return card;
}

// A função loadGame é responsável por criar uma gridView com os cards do jogo.
const loadGame = () => {
  const duplicateIcon = [...icon, ...icon];

  const shuffledArray = duplicateIcon.sort(() => Math.random() - 0.5);

  shuffledArray.map((icon) => {
    return createCard(icon);
  }).reduce((grid, card) => {
    grid.appendChild(card);
    return grid;
  }, grid);
}

// A função serve para iniciar o contador de tempo.
// Função para atualizar o tempo
const updateTime = () => {
  const currentTime = Number(timer.innerHTML);
  timer.innerHTML = currentTime + 1;
  return currentTime + 1;
};

// Função principal que inicia o timer
const startTimer = () => {
  setInterval(() => {
    const currentTime = updateTime();
  }, 1000);
};

// A função window.onload é acionada quando a página HTML é totalmente carregada.
// Aqui, ela é usada para iniciar o jogo de memória, configurar os nomes dos jogadores e iniciar o cronômetro.
window.onload = () => {
  document.getElementById('P1_Name').innerText += " " + localStorage['player1Name'];
  if (isMultiplayer) {
    document.getElementById('turn').innerText += "Turn: " + localStorage['player1Name']
    document.getElementById('P2_Name').innerText += " " + localStorage['player2Name'];

    // 50% de chances de ser a vez de cada jogador
    turn = (Math.random() < 0.5);
  }

  spanPlayer.innerHTML = localStorage.getItem('player');
  setTimeout(function () { startTimer(); }, 500),
    loadGame();
}
