// Criação do timer 
// Funções a serem editadas: 
// ----- Evitar efeitos colaterais das funções checkCards, revealCard
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
  'corredor',
  'dcomp',
  'did7',
  'entredids',
  'filaresun',
  'gato',
  'mapa',
  'reitoria',
  'resun',
  'ufs',
  'vivencia',
];

// A função serve para acessar o tema atual, e retornar a respectiva lista de icon 
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

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// se retirar as variáveis a função revealCards quebra
let firstCard = '';
let secondCard = '';

//  A função serve para verificar qnd o jogo termina. Ela verifica se o número de cartas desativadas é igual a 20 
// E se verdadeiro exibe-se um alerta.
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

      alert(`Congratulations! ${winner.name} won with ${winner.score} points!! Your time was ${timer.innerHTML}`);
    } else {
      alert(`Congratulations, ${playersName[0]}! Your time was ${timer.innerHTML}`);
    }
  }
}

const updateScores = () => {
  spanPlayer1Score.innerText = `Score: ${playersScores[0]}`;
  if (isMultiplayer) {
    spanPlayer2Score.innerText = `Score: ${playersScores[1]}`;
  }
};

const changeTurn = () => {
  turn = !turn;
  spanTurn.innerText = `Turn: ${turn ? localStorage['player2Name'] : localStorage['player1Name']}`;
}

// Função q vê se as cartas são iguais ou não, 
//se as cartas forem iguais ela disabilita as duas cartas
// se não ela vai remover as duas cartas pois elas não são iguais
// usando tambem a fução checkEndGame para ver se o jogo acabou.
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

// essa função serve para virar a carta qnd o jogador clicar
// e depois chama a função checkcards para verificar se as cartas
// viradas são iguais. 
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

// A função cria uma nova carta com base no icon fornecido. 
// Ela cria os elements HTML e o event necessário para a carta
// além de definir um data-icon na carta para armazenar o icon.
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

// loadGame serve para criar uma gridView com os cards
// Na modificação feita em comparação com código original foi alterado o uso de ForEach pelo Map e o Reduce
// Duplica-se o Icon com o objetivo de ter duas cartas no jogo
// O sort cria uma lista embaralhada com esses Icons
// o Map transforma esses Icons em um Card para o jogo
// O reduce por vez utiliza o card para distribui-lo no grid view
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
//a função serve para contar o tempo, pagando o valor do time definido no 
// html e somando +1 a cada segundo
const startTimer = () => {

  this.loop = setInterval(() => {

    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1

  }, 1000)
}

window.onload = () => {
  document.getElementById('P1_Name').innerText += " " + localStorage['player1Name'];
  if (isMultiplayer) {
    document.getElementById('turn').innerText += "Turn: " + localStorage['player1Name']
    document.getElementById('P2_Name').innerText += " " + localStorage['player2Name'];
  }

  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
