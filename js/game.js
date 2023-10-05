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

// Função para verificar se o jogo terminou. Se todas as cartas estiverem desativadas, o jogo termina.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  const playersName = [
    localStorage['player1Name'],
    localStorage['player2Name'],
  ];

  if (disabledCards.length === 24) {
    clearInterval(this.loop);

    if (isMultiplayer) {
      const playersWithScore = playersScores.map((n, i) => ({ score: n, index: i })).sort((a, b) => b.score - a.score);
      const [winner, loser] = playersWithScore.map(player => ({ ...player, name: playersName[player.index] }));

      if (winner.score === loser.score) {
        alert(`It's a tie! Both ${winner.name} and ${loser.name} scored ${winner.score} points!!`);
      } else {
        alert(`Congratulations! ${winner.name} won with ${winner.score} points!! Your time was ${timer.innerHTML}`);
      }
    } else {
      alert(`Congratulations, ${playersName[0]}! Your time was ${timer.innerHTML}s`);
    }
  }
}

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

<<<<<<< HEAD
// Função que vê se as cartas são iguais ou não, 
//se as cartas forem iguais ela disabilita as duas cartas
// se não ela vai remover as duas cartas pois elas não são iguais
// usando tambem a fução checkEndGame para ver se o jogo acabou.
=======
// Função para verificar se duas cartas são iguais.
// Se forem iguais, as cartas são desativadas. Se não forem iguais, as cartas são viradas novamente.
>>>>>>> 7125a1a61240ba6b2b62f660810ed4ecb7fe06f6
const checkCards = (firstCard, secondCard) => {
  let player = turn ? 1 : 0;
  if (isMultiplayer) {
    changeTurn();
  }
  const icons = [firstCard, secondCard].map(card => card.getAttribute("data-icon"));
  if (icons[0] === icons[1]) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    playersScores[player] += 1;
    updateScores();
    checkEndGame();
    return ['', ''];
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
    }, 500);
    return ['', ''];
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
const startTimer = () => {

  this.loop = setInterval(() => {

    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1

  }, 1000)
}

// A função window.onload é acionada quando a página HTML é totalmente carregada.
// Aqui, ela é usada para iniciar o jogo de memória, configurar os nomes dos jogadores e iniciar o cronômetro.
window.onload = () => {
  document.getElementById('P1_Name').innerText += " " + localStorage['player1Name'];
  if (isMultiplayer) {
    document.getElementById('turn').innerText += "Turn: " + localStorage['player1Name']
    document.getElementById('P2_Name').innerText += " " + localStorage['player2Name'];
  }

  spanPlayer.innerHTML = localStorage.getItem('player');
  setTimeout(function () { startTimer(); }, 500),
    loadGame();
}
