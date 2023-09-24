
const form = document.getElementById('myform');

document.getElementById('btn1').onclick = function() {
  //remove hidden from 'P1 insert name' prompt and text
  document.getElementById('P1 txt').removeAttribute('hidden')
  document.getElementById('P1 name').removeAttribute('hidden')
  const P1 = document.getElementById('P1 name')
  //redirect to game page
  window.location = "../memory/pages/game.html";
}
document.getElementById('btn2').onclick = function() {
  //remove hidden from 'P1 and P2 insert name' prompt and text
  document.getElementById('P1 txt').removeAttribute('hidden')
  document.getElementById('P1 name').removeAttribute('hidden')
  document.getElementById('P2 txt').removeAttribute('hidden')
  document.getElementById('P2 name').removeAttribute('hidden')
  //redirect to game page
  window.location = "../memory/pages/game.html";
}
document.getElementById('btn3').onclick = function() {
  window.location = "../memory/pages/theme.html";
}

