
const form = document.getElementById('myform');

document.getElementById('btn1').onclick = function() {
  //remove hidden from 'P1 insert name' prompt and text, also gives hidden to 'P2 insert name' prompt and text in case
  //multiplayer option has been choosed before.
  document.getElementById('P1_txt').hidden = false 
  document.getElementById('P1_name').hidden = false
  document.getElementById('P2_txt').hidden = true
  document.getElementById('P2_name').hidden = true
  document.getElementById('play').hidden = false
}
document.getElementById('btn2').onclick = function() {
  //remove hidden from 'P1 and P2 insert name' prompt and text
  document.getElementById('P1_txt').hidden = false
  document.getElementById('P1_name').hidden = false
  document.getElementById('P2_txt').hidden = false
  document.getElementById('P2_name').hidden = false
  document.getElementById('play').hidden = false
}
document.getElementById('btn3').onclick = function() {
  //redirect to theme selection page
  window.location = "../pages/theme.html";
}
document.getElementById('play').onclick = function(){
//redirect to game page
window.location = "../pages/game.html";
}


