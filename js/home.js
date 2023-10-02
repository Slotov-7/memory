let isMultiplayer = false;
const form = document.getElementById('myform');

<<<<<<< HEAD
document.getElementById('btn1').onclick = function() {
  //remove a ocultação do texto e input do player 1, esconde novamente o texto e input do player 2 caso a opção multiplayer tenha sido
  //selecionada anteriormente, atribui 'false' ao isMultiplayer para definir o jogo como singleplayer
  document.getElementById('P1_txt').hidden = false 
=======
document.getElementById('btn1').onclick = function () {
  //remove hidden do prompt P1 , também oculta o prompt P2 caso ele o botão multiplayer tenha sido pressionado antes
  document.getElementById('P1_txt').hidden = false
>>>>>>> 54c6331a1993a69bb82bb5bb6781957e62a82542
  document.getElementById('P1_name').hidden = false
  document.getElementById('P2_txt').hidden = true
  document.getElementById('P2_name').hidden = true
  document.getElementById('play').hidden = false
  isMultiplayer = false;
}
<<<<<<< HEAD
document.getElementById('btn2').onclick = function() {
  //remove a ocultação do texto e input do player 1 e 2, atribui 'true' ao isMultiplayer para definir o jogo como multiplayer
=======
document.getElementById('btn2').onclick = function () {
  //remove hidden do prompt P1 e P2
>>>>>>> 54c6331a1993a69bb82bb5bb6781957e62a82542
  document.getElementById('P1_txt').hidden = false
  document.getElementById('P1_name').hidden = false
  document.getElementById('P2_txt').hidden = false
  document.getElementById('P2_name').hidden = false
  document.getElementById('play').hidden = false
  isMultiplayer = true;
}
document.getElementById('btn3').onclick = function () {
  //redireciona para a pagina de seleção de tema
  window.location = "/pages/theme.html";
}
document.getElementById('play').onclick = function () {
  //armazena o nome do P1 e P2
  localStorage['player1Name'] = document.getElementById('P1_name').value;
  localStorage['player2Name'] = document.getElementById('P2_name').value;

  //redireciona para a pagina de jogo multiplyer ou singleplyer a depender do boolean de 'isMultiplayer' definido nas funções
  //btn1 e btn2
  if (isMultiplayer)
    window.location = "/pages/multiplayer.html";
  else
    window.location = "/pages/game.html";
}


