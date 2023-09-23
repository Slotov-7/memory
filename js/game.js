// Criação do timer 
// Funções a serem editadas: 
// ----- Evitar efeitos colaterais das funções checkCards, revealCard e createCard


const grid = document.querySelector('.grid');

const icon = [
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
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// tentar retirar as variaveis
let firstCard = '';
let secondCard = '';

// Checagem para ver se todas as cartas ja foram descobertas, ou seja quando a quantidade de cartas desabilitadas forem 20
// aparecer um alerta falando que o jogo terminou
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    alert(`O jogo terminou!`);
  }
}


// reeditar p/ tornar funcional
const checkCards = () => {
  const icons = [firstCard, secondCard].map(card => card.getAttribute("data-icon"));
  if (icons[0] === icons[1]) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";
    checkEndGame();

  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

// reeditar para transformar em funcional!!!!!
const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

// função que não fere o paradigma
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


window.onload = () => loadGame();



