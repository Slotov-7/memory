// Criação do timer 
// Funções a serem editadas: 
// ----- Evitar efeitos colaterais das funções checkCards, revealCard


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
const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'animal') {
    return iconAnimals;
  } else {
    return iconUfs;
  }
}

const icon = getIcons();


const grid = document.querySelector('.grid');

// A função cria um element HTML adjunto de tag e class da CSS.
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// tentar retirar as variaveis
let firstCard = '';
let secondCard = '';

//  A função serve para verificar qnd o jogo termina. Ela verifica se o número de cartas desativadas é igual a 20 
// E se verdadeiro exibe um alerta.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 24) {
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

// função que não fere o paradigma(mantida)
// A função serve para criar as cartas com seus respsctivos icons.
// Também servindo para add um EventListener no elem card, para que quando a carta for selecionada(houver o click) chame a função revealCard
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

// Na modificação feita em comparação com código original foi alterado o uso de ForEach pelo Map e o Reduce
// Esta função é chamada quando a página é carregada. Ela funciona de forma a criar um array duplicando os icon
// O sort embaralha o array e então cria e fixa um element(item) de carta para cada icon dessa array
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



