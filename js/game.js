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

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// tentar retirar as variaveis
firstCard = '';
secondCard = '';

//  A função serve para verificar qnd o jogo termina. Ela verifica se o número de cartas desativadas é igual a 20 
// E se verdadeiro exibe-se um alerta.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 24) {
    alert(`O jogo terminou!`);
  }
}


// Função q vê se as cartas são iguais ou não, 
//se as cartas forem iguais ela disabilita as duas cartas
// se não ela vai remover as duas cartas pois elas não são iguais
// usando tambem a fução checkEndGame para ver se o jogo acabou.
const checkCards = (firstCard, secondCard) => {
  const icons = [firstCard, secondCard].map(card => card.getAttribute("data-icon"));
  if (icons[0] === icons[1]) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
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

// essa função serva para virar a carta qnd o jogador clicar
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

// transformar em funcional!!!!!!!!!!!!
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



