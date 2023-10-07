// Aplica o tema salvo ao carregar a página
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'animal');


document.getElementById('animal-theme')?.addEventListener('click', function () {
    document.documentElement.setAttribute('data-theme', 'animal');
    localStorage.setItem('theme', 'animal');
    alert("Theme changed successfully!!")
});

document.getElementById('ufs-theme')?.addEventListener('click', function () {
    document.documentElement.setAttribute('data-theme', 'ufs');
    localStorage.setItem('theme', 'ufs');
    alert("Theme changed successfully!!")
});
