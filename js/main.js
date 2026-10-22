/* =========================================================
   María Chaves - JavaScript de la web
   Autor: Daniel Chaves Domínguez (2º DAW)
   ========================================================= */

const anio = document.getElementById('year');
if (anio) {
  anio.textContent = new Date().getFullYear();
}

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

const TEXTO_PUBLICO = {
  woman: 'mujer',
  man: 'hombre'
};

const ZONAS = {
  woman: [
    { talla: 'XS', precio: 5, imagen: '', partes: ['Labio superior', 'Patillas', 'Barbilla', 'Areolas', 'Línea alba', 'Perianal'] },
    { talla: 'S', precio: 6, imagen: '', partes: ['Axilas', 'Mentón', 'Triángulo alba', 'Manos', 'Ingles', 'Labios vaginales', 'Pies'] },
    { talla: 'M', precio: 14, imagen: '', partes: ['Facial', 'Antebrazos', 'Ingles brasileñas', 'Pubis', 'Glúteos', 'Lumbar'] },
    { talla: 'L', precio: 22, imagen: '', partes: ['Zona íntima completa', 'Brazos completos', 'Medias piernas', 'Espalda'] },
    { talla: 'XL', precio: 37, imagen: '', partes: ['Piernas completas'] }
  ],
  man: [
    { talla: 'XS', precio: 7, imagen: '', partes: ['Mejillas', 'Entrecejo', 'Nuca'] },
    { talla: 'S', precio: 8, imagen: '', partes: ['Cuello', 'Axilas', 'Manos', 'Pies', 'Perianal'] },
    { talla: 'M', precio: 17, imagen: '', partes: ['Facial', 'Hombros', 'Tórax', 'Abdomen', 'Antebrazos', 'Lumbar', 'Pubis', 'Glúteos'] },
    { talla: 'L', precio: 27, imagen: '', partes: ['Brazos completos', 'Zona íntima completa', 'Medias piernas'] },
    { talla: 'XL', precio: 47, imagen: '', partes: ['Espalda completa', 'Pecho completo', 'Piernas completas'] }
  ]
};

const PACKS = {
  woman: [
    { nombre: 'Axilas, ingles y pubis', precio: 23, imagen: '' },
    { nombre: 'Axilas, ingles, pubis y medias piernas', precio: 41, imagen: '' },
    { nombre: 'Axilas, ingles, pubis, perianal y medias piernas', precio: 45, imagen: '' },
    { nombre: 'Axilas, ingles, pubis, perianal y piernas completas', precio: 63, imagen: '' },
    { nombre: 'Cuerpo básico', descripcion: 'Sin facial ni brazos.', precio: 68, imagen: '' },
    { nombre: 'Cuerpo completo', precio: 83, imagen: '' }
  ],
  man: [
    { nombre: 'Tórax y abdomen', precio: 32, imagen: '' },
    { nombre: 'Piernas completas y glúteos', precio: 58, imagen: '' },
    { nombre: 'Cuerpo inferior', precio: 75, imagen: '' },
    { nombre: 'Cuerpo superior', precio: 85, imagen: '' },
    { nombre: 'Cuerpo básico', descripcion: 'Sin zona íntima.', precio: 100, imagen: '' },
    { nombre: 'Cuerpo completo', precio: 120, imagen: '' }
  ]
};

function crearFoto(imagen, texto) {
  if (imagen !== '') {
    return '<img class="card__photo" src="' + imagen + '" alt="" width="600" height="400" loading="lazy">';
  }
  return '<div class="card__photo placeholder" aria-hidden="true">' +
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></svg>' +
    '<span>Foto: ' + texto + '</span></div>';
}

function crearOpcion(id, nombre, texto, precio) {
  return '<li class="option">' +
    '<span class="option__text">' + texto + '</span>' +
    '<span class="option__price">' + precio + '€</span>' +
    '<button type="button" class="add-button" aria-pressed="false" data-id="' + id + '" data-name="' + nombre + '" data-price="' + precio + '">Añadir</button>' +
    '</li>';
}

function tarjetaZona(zona, publico) {
  let botones = '';
  zona.partes.forEach(function (parte, i) {
    const id = publico + '-zone-' + zona.talla + '-' + i;
    const nombre = parte + ' (depilación láser, ' + TEXTO_PUBLICO[publico] + ')';
    botones += '<button type="button" class="chip" aria-pressed="false" data-id="' + id + '" data-name="' + nombre + '" data-price="' + zona.precio + '">' + parte + '</button>';
  });

  return '<article class="card">' +
    crearFoto(zona.imagen, 'zona ' + zona.talla) +
    '<div class="card__body">' +
    '<div class="card__top"><h3>Zona ' + zona.talla + '</h3><p class="card__price">' + zona.precio + '€<span> / zona</span></p></div>' +
    '<p class="card__text">Toca las zonas que quieras hacerte:</p>' +
    '<div class="chips">' + botones + '</div>' +
    '</div></article>';
}

function tarjetaPack(pack, publico, i) {
  const id = publico + '-pack-' + i;
  const nombre = 'Pack ' + pack.nombre.toLowerCase() + ' (depilación láser, ' + TEXTO_PUBLICO[publico] + ')';
  let descripcion = '';
  if (pack.descripcion) {
    descripcion = '<p class="card__text">' + pack.descripcion + '</p>';
  }

  return '<article class="card">' +
    crearFoto(pack.imagen, pack.nombre.toLowerCase()) +
    '<div class="card__body">' +
    '<p class="card__type">Pack</p>' +
    '<h3>' + pack.nombre + '</h3>' +
    descripcion +
    '<ul class="options">' + crearOpcion(id, nombre, 'Por sesión', pack.precio) + '</ul>' +
    '</div></article>';
}

function pintarTratamientos() {
  ['woman', 'man'].forEach(function (publico) {
    let html = '';
    ZONAS[publico].forEach(function (zona) {
      html += tarjetaZona(zona, publico);
    });
    document.getElementById('cards-' + publico + '-zones').innerHTML = html;

    html = '';
    PACKS[publico].forEach(function (pack, i) {
      html += tarjetaPack(pack, publico, i);
    });
    document.getElementById('cards-' + publico + '-packs').innerHTML = html;
  });
}

function mostrarTarjetas() {
  const publico = document.querySelector('input[name="audience"]:checked').value;
  const categoria = document.querySelector('input[name="category"]:checked').value;

  let idVisible = 'cards-' + publico + '-' + categoria;

  document.querySelectorAll('.cards').forEach(function (bloque) {
    bloque.classList.toggle('active', bloque.id === idVisible);
  });
}

const seccionTratamientos = document.getElementById('treatments');

if (seccionTratamientos) {
  pintarTratamientos();
  mostrarTarjetas();

  document.querySelectorAll('input[name="audience"], input[name="category"]').forEach(function (radio) {
    radio.addEventListener('change', mostrarTarjetas);
  });
}
