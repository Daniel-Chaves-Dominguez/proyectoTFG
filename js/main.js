/* =========================================================
   María Chaves - JavaScript de la web
   Autor: Daniel Chaves Domínguez (2º DAW)
   ========================================================= */

const cabecera = document.querySelector('.header');

function comprobarScroll() {
  if (window.scrollY > 20) {
    cabecera.classList.add('with-border');
  } else {
    cabecera.classList.remove('with-border');
  }
}

if (cabecera) {
  window.addEventListener('scroll', comprobarScroll);
  comprobarScroll();
}

const menu = document.getElementById('menu');
const botonAbrir = document.getElementById('open-menu');
const botonCerrar = document.getElementById('close-menu');

function abrirMenu() {
  menu.classList.add('open');
  botonAbrir.setAttribute('aria-expanded', 'true');
  botonCerrar.focus();
}

function cerrarMenu() {
  menu.classList.remove('open');
  botonAbrir.setAttribute('aria-expanded', 'false');
}

if (menu && botonAbrir && botonCerrar) {
  botonAbrir.addEventListener('click', abrirMenu);
  botonCerrar.addEventListener('click', cerrarMenu);

  menu.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      cerrarMenu();
      botonAbrir.focus();
    }
  });
}
