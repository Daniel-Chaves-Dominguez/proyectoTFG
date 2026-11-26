/* =========================================================
   María Chaves - JavaScript de la web
   Autor: Daniel Chaves Domínguez (2º DAW)
   ========================================================= */

const TELEFONO_WHATSAPP = '34689751693';
const TELEFONO_TEXTO = '689 751 693';

const HORARIO = {
  0: [],
  1: [['10:00', '13:30'], ['17:00', '20:30']],
  2: [['10:00', '13:30'], ['17:00', '20:30']],
  3: [['10:00', '13:30'], ['17:00', '20:30']],
  4: [['10:00', '13:30'], ['17:00', '20:30']],
  5: [['10:00', '13:30'], ['17:00', '20:30']],
  6: [['10:00', '12:30']]
};

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

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
const restoPagina = document.querySelectorAll('.header, main, .footer');

function abrirMenu() {
  menu.classList.add('open');
  botonAbrir.setAttribute('aria-expanded', 'true');
  restoPagina.forEach(function (parte) {
    parte.inert = true;
  });
  botonCerrar.focus();
}

function cerrarMenu() {
  menu.classList.remove('open');
  botonAbrir.setAttribute('aria-expanded', 'false');
  restoPagina.forEach(function (parte) {
    parte.inert = false;
  });
}

if (menu && botonAbrir && botonCerrar) {
  botonAbrir.addEventListener('click', abrirMenu);
  botonCerrar.addEventListener('click', function () {
    cerrarMenu();
    botonAbrir.focus();
  });

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

function aMinutos(hora) {
  const partes = hora.split(':');
  return Number(partes[0]) * 60 + Number(partes[1]);
}

function horaDeMadrid() {
  const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
  return { dia: ahora.getDay(), minutos: ahora.getHours() * 60 + ahora.getMinutes() };
}

function textoEstado(dia, minutos) {
  for (const tramo of HORARIO[dia]) {
    if (minutos >= aMinutos(tramo[0]) && minutos < aMinutos(tramo[1])) {
      return { abierto: true, texto: 'Abierto ahora, hasta las ' + tramo[1] + '.' };
    }
  }

  for (let i = 0; i <= 7; i++) {
    const otroDia = (dia + i) % 7;
    for (const tramo of HORARIO[otroDia]) {
      if (i > 0 || aMinutos(tramo[0]) > minutos) {
        let cuando = 'el ' + DIAS[otroDia];
        if (i === 0) cuando = 'hoy';
        if (i === 1) cuando = 'mañana';
        return { abierto: false, texto: 'Cerrado ahora. Abrimos ' + cuando + ' a las ' + tramo[0] + '.' };
      }
    }
  }

  return { abierto: false, texto: 'Cerrado temporalmente.' };
}

function actualizarHorario() {
  const ahora = horaDeMadrid();
  const estado = textoEstado(ahora.dia, ahora.minutos);

  document.querySelectorAll('.status').forEach(function (el) {
    el.classList.toggle('open', estado.abierto);
    el.querySelector('.status__text').textContent = estado.texto;
  });

  document.querySelectorAll('.schedule-row').forEach(function (fila) {
    const dias = fila.dataset.days.split(',').map(Number);
    const esHoy = dias.includes(ahora.dia);
    fila.classList.toggle('today', esHoy);
    fila.querySelector('.today-label').hidden = !esHoy;
  });
}

if (document.querySelector('.status')) {
  actualizarHorario();
  setInterval(actualizarHorario, 60000);
}

const TEXTO_PUBLICO = {
  woman: 'mujer',
  man: 'hombre'
};

const ZONAS = {
  woman: [
    { talla: 'XS', precio: 5, imagen: 'img/treatments/woman-zone-xs.jpg', partes: ['Labio superior', 'Patillas', 'Barbilla', 'Areolas', 'Línea alba', 'Perianal'] },
    { talla: 'S', precio: 6, imagen: 'img/treatments/woman-zone-s.jpg', partes: ['Axilas', 'Mentón', 'Triángulo alba', 'Manos', 'Ingles', 'Labios vaginales', 'Pies'] },
    { talla: 'M', precio: 14, imagen: 'img/treatments/woman-zone-m.jpg', partes: ['Facial', 'Antebrazos', 'Ingles brasileñas', 'Pubis', 'Glúteos', 'Lumbar'] },
    { talla: 'L', precio: 22, imagen: 'img/treatments/woman-zone-l.jpg', partes: ['Zona íntima completa', 'Brazos completos', 'Medias piernas', 'Espalda'] },
    { talla: 'XL', precio: 37, imagen: 'img/treatments/woman-zone-xl.jpg', partes: ['Piernas completas'] }
  ],
  man: [
    { talla: 'XS', precio: 7, imagen: 'img/treatments/man-zone-xs.jpg', partes: ['Mejillas', 'Entrecejo', 'Nuca'] },
    { talla: 'S', precio: 8, imagen: 'img/treatments/man-zone-s.jpg', partes: ['Cuello', 'Axilas', 'Manos', 'Pies', 'Perianal'] },
    { talla: 'M', precio: 17, imagen: 'img/treatments/man-zone-m.jpg', partes: ['Facial', 'Hombros', 'Tórax', 'Abdomen', 'Antebrazos', 'Lumbar', 'Pubis', 'Glúteos'] },
    { talla: 'L', precio: 27, imagen: 'img/treatments/man-zone-l.jpg', partes: ['Brazos completos', 'Zona íntima completa', 'Medias piernas'] },
    { talla: 'XL', precio: 47, imagen: 'img/treatments/man-zone-xl.jpg', partes: ['Espalda completa', 'Pecho completo', 'Piernas completas'] }
  ]
};

const PACKS = {
  woman: [
    { nombre: 'Axilas, ingles y pubis', precio: 23, imagen: 'img/treatments/woman-pack-1.jpg' },
    { nombre: 'Axilas, ingles, pubis y medias piernas', precio: 41, imagen: 'img/treatments/woman-pack-2.jpg' },
    { nombre: 'Axilas, ingles, pubis, perianal y medias piernas', precio: 45, imagen: 'img/treatments/woman-pack-3.jpg' },
    { nombre: 'Axilas, ingles, pubis, perianal y piernas completas', precio: 63, imagen: 'img/treatments/woman-pack-4.jpg' },
    { nombre: 'Cuerpo básico', descripcion: 'Sin facial ni brazos.', precio: 68, imagen: 'img/treatments/woman-pack-5.jpg' },
    { nombre: 'Cuerpo completo', precio: 83, imagen: 'img/treatments/woman-pack-6.jpg' }
  ],
  man: [
    { nombre: 'Tórax y abdomen', precio: 32, imagen: 'img/treatments/man-pack-1.jpg' },
    { nombre: 'Piernas completas y glúteos', precio: 58, imagen: 'img/treatments/man-pack-2.jpg' },
    { nombre: 'Cuerpo inferior', precio: 75, imagen: 'img/treatments/man-pack-3.jpg' },
    { nombre: 'Cuerpo superior', precio: 85, imagen: 'img/treatments/man-pack-4.jpg' },
    { nombre: 'Cuerpo básico', descripcion: 'Sin zona íntima.', precio: 100, imagen: 'img/treatments/man-pack-5.jpg' },
    { nombre: 'Cuerpo completo', precio: 120, imagen: 'img/treatments/man-pack-6.jpg' }
  ]
};

const RADIOFRECUENCIA = {
  face: [
    {
      nombre: 'Radiofrecuencia facial',
      descripcion: 'Estimula el colágeno y la elastina para mejorar la firmeza, la elasticidad y la calidad de la piel del rostro.',
      imagen: 'img/treatments/rf-face.jpg',
      imagenHombre: 'img/treatments/man-rf-face.jpg',
      opciones: [{ texto: '1 sesión', precio: 50 }, { texto: 'Bono 3 sesiones', precio: 135 }, { texto: 'Bono 5 sesiones', precio: 210 }]
    },
    {
      nombre: 'Radiofrecuencia en papada y mentón',
      descripcion: 'Reafirma la piel y mejora el contorno de la parte de abajo del rostro.',
      imagen: 'img/treatments/rf-chin.jpg',
      imagenHombre: 'img/treatments/man-rf-chin.jpg',
      opciones: [{ texto: '1 sesión', precio: 25 }, { texto: 'Bono 3 sesiones', precio: 65 }, { texto: 'Bono 5 sesiones', precio: 110 }]
    },
    {
      nombre: 'Radiofrecuencia en ojeras',
      descripcion: 'Mejora la circulación y atenúa las bolsas y la flacidez del contorno de ojos.',
      imagen: 'img/treatments/rf-eyes.jpg',
      imagenHombre: 'img/treatments/man-rf-eyes.jpg',
      opciones: [{ texto: '1 sesión', precio: 20 }, { texto: 'Bono 3 sesiones', precio: 50 }, { texto: 'Bono 5 sesiones', precio: 80 }]
    }
  ],
  body: [
    {
      nombre: 'Radiofrecuencia en brazos',
      descripcion: 'Combate la flacidez y mejora la firmeza de la piel de los brazos.',
      imagen: 'img/treatments/rf-arms.jpg',
      imagenHombre: 'img/treatments/man-rf-arms.jpg',
      opciones: [{ texto: '1 sesión', precio: 40 }, { texto: 'Bono 3 sesiones', precio: 110 }, { texto: 'Bono 5 sesiones', precio: 180 }]
    },
    {
      nombre: 'Radiofrecuencia en abdomen',
      descripcion: 'Reafirma la piel, reduce la flacidez y mejora el aspecto de la zona abdominal.',
      imagen: 'img/treatments/rf-abdomen.jpg',
      imagenHombre: 'img/treatments/man-rf-abdomen.jpg',
      opciones: [{ texto: '1 sesión', precio: 40 }, { texto: 'Bono 3 sesiones', precio: 110 }, { texto: 'Bono 5 sesiones', precio: 180 }]
    },
    {
      nombre: 'Radiofrecuencia en glúteos',
      descripcion: 'Reafirma la piel, mejora la textura y realza su forma de manera natural.',
      imagen: 'img/treatments/rf-glutes.jpg',
      imagenHombre: 'img/treatments/man-rf-glutes.jpg',
      opciones: [{ texto: '1 sesión', precio: 40 }, { texto: 'Bono 3 sesiones', precio: 110 }, { texto: 'Bono 5 sesiones', precio: 180 }]
    }
  ]
};

const ESTETICA = [
  {
    nombre: 'Limpieza facial profunda',
    descripcion: 'Elimina impurezas, células muertas y exceso de grasa. Deja la piel limpia, fresca y más luminosa, y ayuda a prevenir puntos negros y granitos.',
    pasos: ['Agua micelar', 'Exfoliante con scrub', 'Vapor de ozono', 'Peeling', 'Eliminación de puntos negros', 'Alta frecuencia', 'Mascarilla', 'Crema hidratante', 'Crema solar'],
    imagen: 'img/treatments/facial-cleansing.jpg',
    imagenHombre: 'img/treatments/man-facial-cleansing.jpg',
    opciones: [{ texto: '1 sesión', precio: 35 }]
  },
  {
    nombre: 'Depilación de cejas',
    descripcion: 'Damos forma a tus cejas según tu rostro para que la mirada quede más limpia y definida.',
    imagen: 'img/treatments/eyebrows.jpg',
    imagenHombre: 'img/treatments/man-eyebrows.jpg',
    opciones: [{ texto: '1 sesión', precio: 6 }]
  }
];

let seleccion = [];

function crearHueco(texto, clase) {
  return '<div class="' + clase + ' placeholder" aria-hidden="true">' +
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></svg>' +
    '<span>Foto: ' + texto + '</span></div>';
}

function crearFoto(imagen, texto) {
  if (imagen !== '') {
    return '<img class="card__photo" src="' + imagen + '" alt="" width="600" height="400" loading="lazy">';
  }
  return crearHueco(texto, 'card__photo');
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

function tarjetaEstetica(tratamiento, grupo, i) {
  let opciones = '';
  tratamiento.opciones.forEach(function (opcion, j) {
    const id = grupo + '-' + i + '-' + j;
    let nombre = tratamiento.nombre;
    if (tratamiento.opciones.length > 1) {
      nombre += ' (' + opcion.texto.toLowerCase() + ')';
    }
    opciones += crearOpcion(id, nombre, opcion.texto, opcion.precio);
  });

  let pasos = '';
  if (tratamiento.pasos) {
    pasos = '<details class="card__steps"><summary>Ver los ' + tratamiento.pasos.length + ' pasos</summary><ol>';
    tratamiento.pasos.forEach(function (paso) {
      pasos += '<li>' + paso + '</li>';
    });
    pasos += '</ol></details>';
  }

  return '<article class="card">' +
    crearFoto(tratamiento.imagen, tratamiento.nombre.toLowerCase()) +
    '<div class="card__body">' +
    '<h3>' + tratamiento.nombre + '</h3>' +
    '<p class="card__text">' + tratamiento.descripcion + '</p>' +
    pasos +
    '<ul class="options">' + opciones + '</ul>' +
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

  pintarLista(RADIOFRECUENCIA.face, 'rf-face');
  pintarLista(RADIOFRECUENCIA.body, 'rf-body');
  pintarLista(ESTETICA, 'aesthetics');
}

function pintarLista(lista, grupo) {
  let html = '';
  lista.forEach(function (tratamiento, i) {
    html += tarjetaEstetica(tratamiento, grupo, i);
  });
  document.getElementById('cards-' + grupo).innerHTML = html;
}

function cambiarFotos(lista, grupo, publico) {
  const fotos = document.querySelectorAll('#cards-' + grupo + ' .card__photo');
  lista.forEach(function (tratamiento, i) {
    if (publico === 'man') {
      fotos[i].src = tratamiento.imagenHombre;
    } else {
      fotos[i].src = tratamiento.imagen;
    }
  });
}

function mostrarTarjetas() {
  const publico = document.querySelector('input[name="audience"]:checked').value;
  const categoria = document.querySelector('input[name="category"]:checked').value;

  let idVisible = 'cards-' + publico + '-' + categoria;
  if (categoria !== 'zones' && categoria !== 'packs') {
    idVisible = 'cards-' + categoria;
  }

  document.querySelectorAll('.cards').forEach(function (bloque) {
    bloque.classList.toggle('active', bloque.id === idVisible);
  });

  cambiarFotos(RADIOFRECUENCIA.face, 'rf-face', publico);
  cambiarFotos(RADIOFRECUENCIA.body, 'rf-body', publico);
  cambiarFotos(ESTETICA, 'aesthetics', publico);
}

function sumarPrecios() {
  let total = 0;
  seleccion.forEach(function (tratamiento) {
    total += tratamiento.precio;
  });
  return total;
}

function pintarListaElegidos(lista) {
  lista.innerHTML = '';
  seleccion.forEach(function (tratamiento) {
    const fila = document.createElement('li');

    const nombre = document.createElement('span');
    nombre.textContent = tratamiento.nombre;

    const precio = document.createElement('span');
    precio.className = 'selection__price';
    precio.textContent = tratamiento.precio + '€';

    const quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.className = 'selection__remove';
    quitar.dataset.remove = tratamiento.id;
    quitar.setAttribute('aria-label', 'Quitar ' + tratamiento.nombre);
    quitar.textContent = '×';

    fila.append(nombre, precio, quitar);
    lista.append(fila);
  });
}

function abrirListaBarra(abrir) {
  document.getElementById('bar-panel').hidden = !abrir;
  document.getElementById('bar-toggle').setAttribute('aria-expanded', abrir);
  document.getElementById('bar-action').textContent = abrir ? 'Cerrar' : 'Ver';
  document.getElementById('booking-bar').classList.toggle('open', abrir);
}

function quitarTratamiento(id) {
  seleccion = seleccion.filter(function (t) { return t.id !== id; });
  actualizarSeleccion();
}

function actualizarSeleccion() {
  document.querySelectorAll('[data-id]').forEach(function (boton) {
    const elegido = seleccion.some(function (t) { return t.id === boton.dataset.id; });
    boton.setAttribute('aria-pressed', elegido);
    if (boton.classList.contains('add-button')) {
      boton.textContent = elegido ? 'Añadido' : 'Añadir';
    }
  });

  const total = sumarPrecios();
  const hayAlgo = seleccion.length > 0;

  document.getElementById('booking-bar').hidden = !hayAlgo;
  document.getElementById('bar-count').textContent = seleccion.length;
  document.getElementById('bar-text').textContent = seleccion.length === 1 ? 'elegido' : 'elegidos';
  document.getElementById('bar-total').textContent = total + '€';
  document.body.classList.toggle('has-selection', hayAlgo);

  if (!hayAlgo) abrirListaBarra(false);

  pintarListaElegidos(document.getElementById('bar-list'));
  pintarListaElegidos(document.getElementById('selection-list'));

  document.getElementById('selection-empty').hidden = hayAlgo;
  const textoTotal = document.getElementById('selection-total');
  textoTotal.hidden = !hayAlgo;
  textoTotal.textContent = 'Total: ' + total + '€';
}

function alternarTratamiento(boton) {
  const id = boton.dataset.id;
  const posicion = seleccion.findIndex(function (t) { return t.id === id; });

  if (posicion === -1) {
    seleccion.push({ id: id, nombre: boton.dataset.name, precio: Number(boton.dataset.price) });
  } else {
    seleccion.splice(posicion, 1);
  }
  actualizarSeleccion();
}

const seccionTratamientos = document.getElementById('treatments');

if (seccionTratamientos && document.getElementById('cards-aesthetics')) {
  pintarTratamientos();
  mostrarTarjetas();

  document.querySelectorAll('input[name="audience"], input[name="category"]').forEach(function (radio) {
    radio.addEventListener('change', mostrarTarjetas);
  });

  seccionTratamientos.addEventListener('click', function (e) {
    const boton = e.target.closest('[data-id]');
    if (boton) alternarTratamiento(boton);
  });

  ['bar-list', 'selection-list'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function (e) {
      const boton = e.target.closest('[data-remove]');
      if (boton) quitarTratamiento(boton.dataset.remove);
    });
  });

  document.getElementById('bar-toggle').addEventListener('click', function () {
    abrirListaBarra(document.getElementById('bar-panel').hidden);
  });

  document.getElementById('bar-clear').addEventListener('click', function () {
    seleccion = [];
    actualizarSeleccion();
  });

  document.getElementById('bar-book').addEventListener('click', function () {
    abrirListaBarra(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') abrirListaBarra(false);
  });

  const barra = document.getElementById('booking-bar');
  const contacto = document.getElementById('contact');
  if (contacto && 'IntersectionObserver' in window) {
    const observadorBarra = new IntersectionObserver(function (entradas) {
      barra.classList.toggle('is-hidden', entradas[0].isIntersecting);
    });
    observadorBarra.observe(contacto);
  }
}

const botonDisparo = document.getElementById('fire-button');
const diagrama = document.getElementById('diagram');
const resultadoDisparo = document.getElementById('fire-result');
let esperaResultado = null;

if (botonDisparo && diagrama) {
  botonDisparo.addEventListener('click', function () {
    diagrama.classList.remove('firing');
    setTimeout(function () {
      diagrama.classList.add('firing');
    }, 20);

    resultadoDisparo.classList.remove('visible');
    clearTimeout(esperaResultado);
    esperaResultado = setTimeout(function () {
      resultadoDisparo.classList.add('visible');
    }, 3000);
  });
}

const comparador = document.getElementById('compare');
const rangoComparar = document.getElementById('compare-range');
const capaPelos = document.getElementById('compare-hair');
const lineaComparar = document.getElementById('compare-line');
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let intervaloComparar = null;

// Bordes de la pierna de delante en la foto (1200 x 800), medidos cada 50 píxeles
// desde debajo de la rodilla (x = 200) hasta el tobillo (x = 700)
const PIERNA_ARRIBA = [88, 128, 168, 212, 248, 288, 332, 378, 416, 448, 476];
const PIERNA_ABAJO = [380, 412, 437, 459, 480, 504, 530, 557, 584, 611, 636];

// Dónde empieza y acaba la pierna en una x (entre dos medidas se calcula el punto intermedio)
function bordesPierna(x) {
  let i = Math.floor((x - 200) / 50);
  if (i > PIERNA_ARRIBA.length - 2) i = PIERNA_ARRIBA.length - 2;
  const t = (x - 200 - i * 50) / 50;
  return {
    arriba: PIERNA_ARRIBA[i] + (PIERNA_ARRIBA[i + 1] - PIERNA_ARRIBA[i]) * t,
    abajo: PIERNA_ABAJO[i] + (PIERNA_ABAJO[i + 1] - PIERNA_ABAJO[i]) * t
  };
}

// Ángulo del vello: hacia el tobillo, siguiendo la pierna. Con el seno, los pelos que están cerca
// van casi en la misma dirección y por zonas cambia un poco, como el vello de verdad
function anguloVello(x, y) {
  const grados = 38 - (x - 200) / 500 * 8 + Math.sin(x / 55 + y / 40) * 10 + (Math.random() - 0.5) * 14;
  return grados * Math.PI / 180;
}

// Un pelo: una forma fina que sale de la raíz (x, y) y acaba en punta
function crearPelo(x, y, angulo, largo, grosor, opacidad) {
  const dirX = Math.cos(angulo);
  const dirY = Math.sin(angulo);
  const puntaX = x + dirX * largo;
  const puntaY = y + dirY * largo;

  // Se curvan un poco, casi siempre hacia el mismo lado
  let curva = largo * (0.04 + Math.random() * 0.08);
  if (Math.random() < 0.2) curva = -curva;
  const curvaX = (x + puntaX) / 2 - dirY * curva;
  const curvaY = (y + puntaY) / 2 + dirX * curva;

  // Los dos lados de la raíz; desde ahí se estrecha hasta la punta
  const mitad = grosor / 2;
  return '<path d="M' + (x - dirY * mitad).toFixed(2) + ' ' + (y + dirX * mitad).toFixed(2) +
    ' Q' + curvaX.toFixed(2) + ' ' + curvaY.toFixed(2) + ' ' + puntaX.toFixed(2) + ' ' + puntaY.toFixed(2) +
    ' Q' + curvaX.toFixed(2) + ' ' + curvaY.toFixed(2) + ' ' + (x + dirY * mitad).toFixed(2) + ' ' + (y - dirX * mitad).toFixed(2) +
    'Z" opacity="' + opacidad.toFixed(2) + '"/>';
}

// Pelos repartidos por toda la pierna (grosor y largo en medidas de la foto)
function crearPelos(cantidad, grosor, largoMinimo, largoMaximo, opacidadMinima, opacidadMaxima) {
  let pelos = '';
  let hechos = 0;
  while (hechos < cantidad) {
    // Un punto al azar; si no cae dentro de la pierna, se prueba con otro
    const x = 200 + Math.random() * 490;
    const y = 80 + Math.random() * 560;
    const borde = bordesPierna(x);
    if (y < borde.arriba + 3 || y > borde.abajo - 3) continue;
    // Junto a la rodilla y al tobillo hay menos vello
    if (x < 260 && Math.random() > (x - 200) / 60) continue;
    if (x > 640 && Math.random() > (690 - x) / 50) continue;

    hechos++;
    const largo = largoMinimo + Math.random() * (largoMaximo - largoMinimo);
    const opacidad = opacidadMinima + Math.random() * (opacidadMaxima - opacidadMinima);
    pelos += crearPelo(x, y, anguloVello(x, y), largo, grosor * (0.8 + Math.random() * 0.4), opacidad);
  }
  return pelos;
}

// Pelos en el borde de arriba de la pierna: se ven contra el fondo gris
function crearPelosBorde(cantidad, grosor) {
  let pelos = '';
  for (let i = 0; i < cantidad; i++) {
    const x = 370 + Math.random() * 300;
    const y = bordesPierna(x).arriba + Math.random() * 2;
    // Siguen el borde, pero se separan un poco de la piel
    const angulo = anguloVello(x, y) - (8 + Math.random() * 14) * Math.PI / 180;
    pelos += crearPelo(x, y, angulo, 7 + Math.random() * 9, grosor, 0.45 + Math.random() * 0.35);
  }
  return pelos;
}

// escala: cuántas medidas de la foto ocupa un píxel de la pantalla
function pintarPelos(capa, escala, fino) {
  let html = '<svg viewBox="0 0 1200 800" aria-hidden="true">';
  if (fino) {
    // Después del tratamiento: unos pocos pelos finos y claros
    html += '<g fill="#9c7a68">' + crearPelos(30, 0.7 * escala, 4, 9, 0.2, 0.4) + '</g>';
  } else {
    // Vello fino y claro, y encima el más oscuro y largo
    html += '<g fill="#7a5c4e">' + crearPelos(480, 0.5 * escala, 7, 14, 0.18, 0.4) + '</g>';
    html += '<g fill="#3b2820">' + crearPelos(360, 0.7 * escala, 12, 24, 0.35, 0.7) + '</g>';
    html += '<g fill="#3b2820">' + crearPelosBorde(60, 0.7 * escala) + '</g>';
  }
  capa.innerHTML = html + '</svg>';
}

function moverComparador(valor) {
  rangoComparar.value = valor;
  capaPelos.style.clipPath = 'inset(0 ' + (100 - valor) + '% 0 0)';
  lineaComparar.style.left = valor + '%';
}

function animarComparador() {
  let valor = 100;
  moverComparador(valor);
  intervaloComparar = setInterval(function () {
    valor = valor - 1;
    moverComparador(valor);
    if (valor <= 30) clearInterval(intervaloComparar);
  }, 20);
}

if (comparador) {
  // En el móvil la foto es pequeña: se limita para que el pelo no salga gordo
  let escalaPelo = 1200 / comparador.offsetWidth;
  if (escalaPelo > 1.8) escalaPelo = 1.8;
  pintarPelos(capaPelos, escalaPelo, false);
  pintarPelos(document.getElementById('compare-fine'), escalaPelo, true);
  moverComparador(50);

  rangoComparar.addEventListener('input', function () {
    clearInterval(intervaloComparar);
    moverComparador(Number(rangoComparar.value));
  });

  if (!sinMovimiento && 'IntersectionObserver' in window) {
    moverComparador(100);
    const observadorComparar = new IntersectionObserver(function (entradas) {
      if (entradas[0].isIntersecting) {
        animarComparador();
        observadorComparar.disconnect();
      }
    }, { threshold: 0.6 });
    observadorComparar.observe(comparador);
  }
}

const fab = document.getElementById('fab');
const zonasConBoton = [document.getElementById('hero-actions'), document.getElementById('treatments'), document.getElementById('contact')]
  .filter(function (el) { return el !== null; });

if (fab && zonasConBoton.length > 0 && 'IntersectionObserver' in window) {
  const visibles = new Set();

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        visibles.add(entrada.target);
      } else {
        visibles.delete(entrada.target);
      }
    });
    fab.classList.toggle('is-hidden', visibles.size > 0);
  });

  zonasConBoton.forEach(function (el) {
    observador.observe(el);
  });
}

const botonArriba = document.getElementById('to-top');

function comprobarBotonArriba() {
  // Solo aparece cuando se ha bajado más de una pantalla
  botonArriba.classList.toggle('is-hidden', window.scrollY < window.innerHeight);
}

if (botonArriba) {
  window.addEventListener('scroll', comprobarBotonArriba);
  comprobarBotonArriba();
}

const DURACION_CITA = 30;
const MESES_A_MOSTRAR = 3;

// Festivos que caen el mismo día todos los años (mes-día)
const FESTIVOS = ['01-01', '01-06', '02-28', '05-01', '08-15', '10-12', '11-01', '12-06', '12-08', '12-25'];

// Otros días que el centro está cerrado (año-mes-día): Semana Santa, fiestas de Puerto Real, vacaciones...
const DIAS_CERRADOS = ['2027-03-25', '2027-03-26'];

let mesVisible = 0;
let diaElegido = null;

const formulario = document.getElementById('booking-form');

function aHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas + ':' + (resto < 10 ? '0' + resto : resto);
}

function fechaATexto(fecha) {
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  return fecha.getFullYear() + '-' + (mes < 10 ? '0' + mes : mes) + '-' + (dia < 10 ? '0' + dia : dia);
}

function estaCerrado(fecha) {
  const texto = fechaATexto(fecha);
  return FESTIVOS.includes(texto.slice(5)) || DIAS_CERRADOS.includes(texto);
}

function tramoDelDia(diaSemana, franja) {
  const tramos = HORARIO[diaSemana];
  if (franja === 'morning') return tramos[0];
  return tramos[1];
}

function horasLibres(fecha, franja) {
  if (estaCerrado(fecha)) return [];

  const tramo = tramoDelDia(fecha.getDay(), franja);
  if (!tramo) return [];

  let ahora = -1;
  if (fecha.toDateString() === new Date().toDateString()) {
    ahora = horaDeMadrid().minutos;
  }

  const horas = [];
  for (let inicio = aMinutos(tramo[0]); inicio + DURACION_CITA <= aMinutos(tramo[1]); inicio += DURACION_CITA) {
    if (inicio > ahora) horas.push(aHora(inicio));
  }
  return horas;
}

function crearFichas(contenedor, nombre, opciones) {
  contenedor.innerHTML = '';
  opciones.forEach(function (opcion, i) {
    const caja = document.createElement('span');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = nombre;
    input.id = nombre + '-' + i;
    input.value = opcion.valor;
    input.className = 'sr-only';

    const etiqueta = document.createElement('label');
    etiqueta.htmlFor = input.id;
    etiqueta.className = 'pill';
    etiqueta.textContent = opcion.texto;

    caja.append(input, etiqueta);
    contenedor.append(caja);
  });
}

function pintarCalendario(franja) {
  const hoy = new Date();
  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const primero = new Date(hoy.getFullYear(), hoy.getMonth() + mesVisible, 1);

  document.getElementById('calendar-month').textContent = primero.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  document.getElementById('prev-month').disabled = mesVisible === 0;
  document.getElementById('next-month').disabled = mesVisible === MESES_A_MOSTRAR - 1;

  const contenedor = document.getElementById('calendar-days');
  contenedor.innerHTML = '';

  const huecos = (primero.getDay() + 6) % 7;
  for (let i = 0; i < huecos; i++) {
    contenedor.append(document.createElement('span'));
  }

  const diasDelMes = new Date(primero.getFullYear(), primero.getMonth() + 1, 0).getDate();
  for (let dia = 1; dia <= diasDelMes; dia++) {
    const fecha = new Date(primero.getFullYear(), primero.getMonth(), dia);

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'calendar__day';
    boton.textContent = dia;
    boton.dataset.date = fecha.toDateString();
    boton.setAttribute('aria-label', fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));
    boton.setAttribute('aria-pressed', diaElegido === boton.dataset.date);

    boton.disabled = fecha < inicioHoy || horasLibres(fecha, franja).length === 0;

    if (fecha.getTime() === inicioHoy.getTime()) {
      boton.classList.add('calendar__day--today');
    }

    contenedor.append(boton);
  }
}

function pintarHoras(fecha, franja) {
  const horas = horasLibres(fecha, franja).map(function (hora) {
    return { valor: hora, texto: hora };
  });
  crearFichas(document.getElementById('hour-list'), 'hour', horas);
}

function marcarError(error, campo, mostrar) {
  error.hidden = !mostrar;
  if (campo) {
    campo.classList.toggle('error', mostrar);
    if (mostrar) {
      campo.setAttribute('aria-invalid', 'true');
    } else {
      campo.removeAttribute('aria-invalid');
    }
  }
}

function limpiarTelefono(texto) {
  // Quita espacios, puntos, guiones y paréntesis
  let numero = texto.replace(/[\s.\-()]/g, '');
  if (numero.startsWith('+34')) numero = numero.slice(3);
  if (numero.startsWith('0034')) numero = numero.slice(4);
  return numero;
}

function telefonoValido(numero) {
  // 9 cifras y la primera es 6, 7, 8 o 9
  return /^[6789]\d{8}$/.test(numero);
}

function formatearTelefono(numero) {
  return numero.slice(0, 3) + ' ' + numero.slice(3, 6) + ' ' + numero.slice(6);
}

function crearMensaje(nombre, telefono, elegidos, cuando, notas) {
  const lineas = ['Hola, soy ' + nombre + '.'];
  lineas.push('Mi teléfono es ' + formatearTelefono(telefono) + '.');

  if (elegidos.length > 0) {
    lineas.push('Me gustaría pedir cita para:');
    let total = 0;
    elegidos.forEach(function (tratamiento) {
      lineas.push('- ' + tratamiento.nombre + ': ' + tratamiento.precio + '€');
      total += tratamiento.precio;
    });
    lineas.push('Total: ' + total + '€.');
  } else {
    lineas.push('Me gustaría que me asesorarais sobre qué tratamiento me conviene.');
  }

  if (cuando === '') {
    lineas.push('Me da igual el horario.');
  } else {
    lineas.push('Me gustaría el ' + cuando + ' (si está libre).');
  }

  if (notas) {
    lineas.push(notas);
  }

  return lineas.join('\n');
}

if (formulario) {
  const inputNombre = document.getElementById('booking-name');
  const errorNombre = document.getElementById('booking-name-error');
  const inputTelefono = document.getElementById('booking-phone');
  const errorTelefono = document.getElementById('booking-phone-error');
  const mensajeEstado = document.getElementById('booking-status');

  inputNombre.addEventListener('input', function () {
    if (inputNombre.value.trim() !== '') marcarError(errorNombre, inputNombre, false);
  });

  inputTelefono.addEventListener('input', function () {
    if (telefonoValido(limpiarTelefono(inputTelefono.value))) marcarError(errorTelefono, inputTelefono, false);
  });

  const bloqueDia = document.getElementById('day-block');
  const bloqueHora = document.getElementById('hour-block');
  const errorHora = document.getElementById('booking-time-error');

  function franjaElegida() {
    return formulario.querySelector('input[name="time-slot"]:checked').value;
  }

  formulario.querySelectorAll('input[name="time-slot"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      const franja = franjaElegida();
      diaElegido = null;
      mesVisible = 0;
      errorHora.hidden = true;
      bloqueHora.hidden = true;
      bloqueDia.hidden = franja === 'any';
      if (franja !== 'any') pintarCalendario(franja);
    });
  });

  document.getElementById('prev-month').addEventListener('click', function () {
    mesVisible--;
    pintarCalendario(franjaElegida());
  });

  document.getElementById('next-month').addEventListener('click', function () {
    mesVisible++;
    pintarCalendario(franjaElegida());
  });

  document.getElementById('calendar-days').addEventListener('click', function (e) {
    const boton = e.target.closest('.calendar__day');
    if (!boton || boton.disabled) return;
    diaElegido = boton.dataset.date;
    pintarCalendario(franjaElegida());
    pintarHoras(new Date(diaElegido), franjaElegida());
    bloqueHora.hidden = false;
  });

  document.getElementById('hour-list').addEventListener('change', function () {
    errorHora.hidden = true;
  });

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const telefono = limpiarTelefono(inputTelefono.value);

    marcarError(errorNombre, inputNombre, nombre === '');
    marcarError(errorTelefono, inputTelefono, !telefonoValido(telefono));

    if (nombre === '') {
      inputNombre.focus();
      return;
    }
    if (!telefonoValido(telefono)) {
      inputTelefono.focus();
      return;
    }

    let cuando = '';
    if (franjaElegida() !== 'any') {
      const hora = formulario.querySelector('input[name="hour"]:checked');
      if (!diaElegido || !hora) {
        errorHora.hidden = false;
        return;
      }
      const fecha = new Date(diaElegido);
      cuando = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '') + ' a las ' + hora.value;
    }

    const notas = document.getElementById('booking-notes').value.trim();

    const texto = crearMensaje(nombre, telefono, seleccion, cuando, notas);
    const url = 'https://wa.me/' + TELEFONO_WHATSAPP + '?text=' + encodeURIComponent(texto);

    const ventana = window.open(url, '_blank');
    if (ventana) {
      ventana.opener = null;
    } else {
      window.location.href = url;
    }

    mensajeEstado.textContent = 'Hemos abierto WhatsApp con tu mensaje. Si no se ha abierto, escríbenos al ' + TELEFONO_TEXTO + '.';
  });
}

const FOTO_MARIA = '';

// Paradas del recorrido virtual. En "puntos", x e y son la posición (en %) del punto sobre la foto
const RECORRIDO = [
  {
    id: 'fachada',
    zona: 'fachada',
    titulo: 'La fachada',
    texto: 'Estamos en C/ La Palma, 29, en el casco urbano de Puerto Real. Pulsa en la puerta para entrar.',
    imagen: 'img/centre/facade.jpg',
    alt: 'Fachada blanca del centro, con el letrero de María Chaves sobre la puerta y el escaparate a la derecha',
    puntos: [
      { x: 17, y: 55, texto: 'Entrar', ir: 'recepcion' },
      { x: 18, y: 24, texto: 'Letrero', ir: 'letrero' },
      { x: 87, y: 52, texto: 'Escaparate', ir: 'escaparate' }
    ]
  },
  {
    id: 'letrero',
    zona: 'fachada',
    titulo: 'El letrero',
    texto: 'Así nos reconocerás desde la calle. La puerta está justo debajo.',
    imagen: 'img/centre/sign.jpg',
    alt: 'Letrero de María Chaves, depilación láser y estética, sobre la puerta de entrada',
    puntos: [
      { x: 60, y: 86, texto: 'Entrar', ir: 'recepcion' }
    ]
  },
  {
    id: 'escaparate',
    zona: 'fachada',
    titulo: 'El escaparate',
    texto: 'El logo de María en el cristal, a la derecha de la puerta.',
    imagen: 'img/centre/window.jpg',
    alt: 'Escaparate de cristal con el logo de María Chaves',
    puntos: []
  },
  {
    id: 'recepcion',
    zona: 'recepcion',
    titulo: 'La recepción',
    texto: 'Aquí te recibimos y esperas tu turno. Al fondo está la puerta de la cabina.',
    imagen: 'img/centre/reception.jpg',
    alt: 'Recepción luminosa con mostrador blanco, sillas de espera y una puerta al fondo',
    puntos: [
      { x: 56, y: 48, texto: 'Cabina', ir: 'cabina' }
    ]
  },
  {
    id: 'cabina',
    zona: 'cabina',
    titulo: 'La cabina',
    texto: 'Cabina cerrada con la camilla, el láser y la radiofrecuencia. Pulsa en las máquinas para verlas de cerca.',
    imagen: 'img/centre/cabin.jpg',
    alt: 'Cabina de tratamientos con camilla, el láser de diodo a la izquierda y el equipo de radiofrecuencia a la derecha',
    puntos: [
      { x: 43, y: 60, texto: 'Láser', ir: 'laser' },
      { x: 78, y: 40, texto: 'Radiofrecuencia', ir: 'radiofrecuencia' },
      { x: 27, y: 22, texto: 'Vitrina', ir: 'vitrina' }
    ]
  },
  {
    id: 'laser',
    zona: 'cabina',
    titulo: 'El láser Sapphire LS-1200',
    texto: 'Láser de diodo con frío hasta -12 ºC. Más abajo tienes todas sus características.',
    imagen: 'img/centre/laser.jpg',
    alt: 'Láser de diodo Sapphire LS-1200 con pantalla táctil y botón de parada de emergencia',
    vertical: true,
    puntos: []
  },
  {
    id: 'radiofrecuencia',
    zona: 'cabina',
    titulo: 'La radiofrecuencia Phoenix RF500',
    texto: 'El equipo de radiofrecuencia facial y corporal. Más abajo tienes sus características.',
    imagen: 'img/centre/phoenix.jpg',
    alt: 'Equipo de radiofrecuencia Phoenix RF500 con pantalla táctil',
    vertical: true,
    puntos: []
  },
  {
    id: 'vitrina',
    zona: 'cabina',
    titulo: 'La vitrina',
    texto: 'Productos de cuidado y las gafas de protección que usáis tú y María en cada sesión.',
    imagen: 'img/centre/showcase.jpg',
    alt: 'Vitrina de cristal con productos de cuidado de la piel y gafas de protección verdes',
    puntos: []
  }
];

const cajaFotoMaria = document.getElementById('about-photo');
const visorTour = document.getElementById('tour-view');
const tituloTour = document.getElementById('tour-title');
const textoTour = document.getElementById('tour-text');
const botonVolver = document.getElementById('tour-back');
const botonAmpliar = document.getElementById('tour-zoom');
const mapaTour = document.getElementById('tour-map');
const visor = document.getElementById('lightbox');
let paradaActual = 0;
let historial = [];
let moviendo = false;
let fotoActual = 0;

function pintarFotoMaria() {
  if (FOTO_MARIA !== '') {
    cajaFotoMaria.innerHTML = '<img class="about__img" src="' + FOTO_MARIA + '" alt="María Chaves" width="800" height="1000" loading="lazy">';
  } else {
    // Mientras no haya foto de María se enseña el logo
    cajaFotoMaria.innerHTML = '<div class="about__img about__logo"><img src="img/logo.svg" alt="" width="208" height="231" loading="lazy"></div>';
  }
}

function buscarParada(id) {
  return RECORRIDO.findIndex(function (parada) {
    return parada.id === id;
  });
}

function crearCapa(parada, primeraVez) {
  const capa = document.createElement('div');
  capa.className = 'tour__photo';

  let carga = '';
  if (primeraVez) carga = ' loading="lazy"';

  let html = '';
  if (parada.vertical) {
    // Las fotos verticales se ven enteras, con la misma foto desenfocada de fondo
    capa.classList.add('tour__photo--vertical');
    html += '<img class="tour__blur" src="' + parada.imagen + '" alt=""' + carga + '>';
  }
  html += '<img class="tour__img" src="' + parada.imagen + '" alt="' + parada.alt + '"' + carga + '>';

  parada.puntos.forEach(function (punto) {
    let clase = 'tour__spot';
    // Si el punto está a la derecha, el texto va a su izquierda para que no se salga
    if (punto.x > 50) clase += ' tour__spot--izquierda';
    html += '<button type="button" class="' + clase + '" style="left:' + punto.x + '%;top:' + punto.y + '%"' +
      ' data-ir="' + punto.ir + '" data-x="' + punto.x + '" data-y="' + punto.y + '">' +
      '<span class="tour__label">' + punto.texto + '</span></button>';
  });

  capa.innerHTML = html;
  return capa;
}

function ponerTextos(parada) {
  tituloTour.textContent = parada.titulo;
  textoTour.textContent = parada.texto;
  botonVolver.disabled = historial.length === 0;

  mapaTour.querySelectorAll('button').forEach(function (boton) {
    if (boton.dataset.ir === parada.zona) {
      boton.setAttribute('aria-current', 'step');
    } else {
      boton.removeAttribute('aria-current');
    }
  });
}

function precargar(parada) {
  parada.puntos.forEach(function (punto) {
    const foto = new Image();
    foto.src = RECORRIDO[buscarParada(punto.ir)].imagen;
  });
}

// tipo: 'adelante', 'atras' o 'salto'. x e y: el punto hacia el que se mueve la cámara
function irA(numero, tipo, x, y) {
  moviendo = true;
  document.getElementById('tour-hint').hidden = true;

  const parada = RECORRIDO[numero];
  const capaVieja = visorTour.querySelector('.tour__photo');
  const capaNueva = crearCapa(parada, false);
  const origen = x + '% ' + y + '%';

  if (tipo === 'adelante') capaVieja.style.transformOrigin = origen;
  if (tipo === 'atras') capaNueva.style.transformOrigin = origen;
  capaNueva.classList.add('tour__photo--' + tipo + '-entra');

  function empezar() {
    visorTour.append(capaNueva);
    capaVieja.classList.add('tour__photo--' + tipo + '-sale');
    capaVieja.querySelectorAll('.tour__spot').forEach(function (punto) {
      punto.hidden = true;
    });

    setTimeout(function () {
      capaNueva.classList.remove('tour__photo--' + tipo + '-entra');
    }, 20);

    setTimeout(function () {
      capaVieja.remove();
      moviendo = false;
    }, 1000);

    paradaActual = numero;
    ponerTextos(parada);
    tituloTour.focus({ preventScroll: true });
    precargar(parada);
  }

  // Se espera a que cargue la foto nueva para que no aparezca a trozos
  const foto = capaNueva.querySelector('.tour__img');
  if (foto.complete) {
    empezar();
  } else {
    foto.onload = empezar;
    foto.onerror = empezar;
  }
}

function mostrarFotoGrande(numero) {
  if (numero < 0) numero = RECORRIDO.length - 1;
  if (numero >= RECORRIDO.length) numero = 0;
  fotoActual = numero;
  const parada = RECORRIDO[fotoActual];

  document.getElementById('lightbox-photo').innerHTML = '<img class="lightbox__img" src="' + parada.imagen + '" alt="' + parada.alt + '">';
  document.getElementById('lightbox-caption').textContent = parada.titulo + ' · ' + (fotoActual + 1) + ' de ' + RECORRIDO.length;
}

if (cajaFotoMaria) {
  pintarFotoMaria();
}

if (visorTour && visor) {
  visorTour.append(crearCapa(RECORRIDO[0], true));
  ponerTextos(RECORRIDO[0]);

  visorTour.addEventListener('click', function (e) {
    const punto = e.target.closest('.tour__spot');
    if (!punto || moviendo) return;
    historial.push({ parada: paradaActual, x: punto.dataset.x, y: punto.dataset.y });
    irA(buscarParada(punto.dataset.ir), 'adelante', punto.dataset.x, punto.dataset.y);
  });

  botonVolver.addEventListener('click', function () {
    if (moviendo || historial.length === 0) return;
    const anterior = historial.pop();
    irA(anterior.parada, 'atras', anterior.x, anterior.y);
  });

  mapaTour.addEventListener('click', function (e) {
    const boton = e.target.closest('button');
    if (!boton || moviendo) return;
    const numero = buscarParada(boton.dataset.ir);
    if (numero === paradaActual) return;
    historial.push({ parada: paradaActual, x: 50, y: 50 });
    irA(numero, 'salto', 50, 50);
  });

  // Cuando el ratón o el teclado llegan al recorrido se cargan las fotos siguientes
  visorTour.addEventListener('mouseenter', function () {
    precargar(RECORRIDO[paradaActual]);
  });
  visorTour.addEventListener('focusin', function () {
    precargar(RECORRIDO[paradaActual]);
  });

  botonAmpliar.addEventListener('click', function () {
    mostrarFotoGrande(paradaActual);
    visor.showModal();
  });

  document.getElementById('lightbox-prev').addEventListener('click', function () {
    mostrarFotoGrande(fotoActual - 1);
  });

  document.getElementById('lightbox-next').addEventListener('click', function () {
    mostrarFotoGrande(fotoActual + 1);
  });

  document.getElementById('lightbox-close').addEventListener('click', function () {
    visor.close();
  });

  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrarFotoGrande(fotoActual - 1);
    if (e.key === 'ArrowRight') mostrarFotoGrande(fotoActual + 1);
  });

  visor.addEventListener('click', function (e) {
    if (e.target === visor) visor.close();
  });

  visor.addEventListener('close', function () {
    botonAmpliar.focus();
  });
}

const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: ''
};

const ESPERA_MINUTOS = 10;

const formOpinion = document.getElementById('review-form');
const listaOpiniones = document.getElementById('review-list');
const textoMedia = document.getElementById('reviews-average');
const cajaSinOpiniones = document.getElementById('reviews-empty');

let baseDeDatos = null;
if (FIREBASE_CONFIG.apiKey !== '' && typeof firebase !== 'undefined') {
  firebase.initializeApp(FIREBASE_CONFIG);
  baseDeDatos = firebase.firestore();
}

function leerOpiniones() {
  if (!baseDeDatos) return Promise.resolve([]);

  return baseDeDatos.collection('opiniones').orderBy('fecha', 'desc').limit(50).get()
    .then(function (resultado) {
      const opiniones = [];
      resultado.forEach(function (documento) {
        opiniones.push(documento.data());
      });
      return opiniones;
    });
}

function guardarOpinion(opinion) {
  return baseDeDatos.collection('opiniones').add(opinion);
}

function dibujarEstrellas(numero) {
  return '★'.repeat(numero) + '☆'.repeat(5 - numero);
}

function crearTarjetaOpinion(opinion) {
  const tarjeta = document.createElement('li');
  tarjeta.className = 'review';

  const arriba = document.createElement('div');
  arriba.className = 'review__top';

  const nombre = document.createElement('strong');
  nombre.textContent = opinion.nombre;

  const estrellas = document.createElement('span');
  estrellas.className = 'review__stars';
  estrellas.setAttribute('aria-hidden', 'true');
  estrellas.textContent = dibujarEstrellas(opinion.estrellas);

  const estrellasTexto = document.createElement('span');
  estrellasTexto.className = 'sr-only';
  estrellasTexto.textContent = opinion.estrellas + ' de 5 estrellas';

  arriba.append(nombre, estrellas, estrellasTexto);

  const comentario = document.createElement('p');
  comentario.textContent = opinion.comentario;

  const fecha = document.createElement('p');
  fecha.className = 'review__date';
  fecha.textContent = new Date(opinion.fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  tarjeta.append(arriba, comentario, fecha);
  return tarjeta;
}

function mostrarOpiniones(opiniones) {
  listaOpiniones.innerHTML = '';

  const hayOpiniones = opiniones.length > 0;
  cajaSinOpiniones.hidden = hayOpiniones;
  textoMedia.hidden = !hayOpiniones;
  if (!hayOpiniones) return;

  let suma = 0;
  opiniones.forEach(function (opinion) {
    suma += opinion.estrellas;
    listaOpiniones.append(crearTarjetaOpinion(opinion));
  });

  const media = (suma / opiniones.length).toFixed(1).replace('.', ',');
  let total = opiniones.length + ' opiniones';
  if (opiniones.length === 1) total = '1 opinión';
  textoMedia.textContent = '★ ' + media + ' de 5 · ' + total;
}

function cargarOpiniones() {
  leerOpiniones()
    .then(mostrarOpiniones)
    .catch(function () {
      cajaSinOpiniones.hidden = true;
      textoMedia.hidden = false;
      textoMedia.textContent = 'No se han podido cargar las opiniones. Prueba a recargar la página.';
    });
}

if (formOpinion && listaOpiniones && textoMedia) {
  const inputNombreOpinion = document.getElementById('review-name');
  const inputComentario = document.getElementById('review-comment');
  const errorNombreOpinion = document.getElementById('review-name-error');
  const errorEstrellas = document.getElementById('review-stars-error');
  const errorComentario = document.getElementById('review-comment-error');
  const botonEnviar = document.getElementById('review-submit');
  const estadoOpinion = document.getElementById('review-status');

  cargarOpiniones();

  formOpinion.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = inputNombreOpinion.value.trim();
    const comentario = inputComentario.value.trim();
    const estrellaMarcada = formOpinion.querySelector('input[name="stars"]:checked');

    marcarError(errorNombreOpinion, inputNombreOpinion, nombre === '');
    marcarError(errorEstrellas, null, estrellaMarcada === null);
    marcarError(errorComentario, inputComentario, comentario === '');

    if (nombre === '' || estrellaMarcada === null || comentario === '') {
      estadoOpinion.textContent = '';
      return;
    }

    if (!baseDeDatos) {
      estadoOpinion.textContent = 'Las opiniones aún no están activas. ¡Muy pronto podrás dejar la tuya!';
      return;
    }

    if (document.getElementById('review-website').value !== '') {
      formOpinion.reset();
      estadoOpinion.textContent = '¡Gracias! Tu opinión ya está publicada.';
      return;
    }

    let ultima = 0;
    try {
      ultima = Number(localStorage.getItem('ultimaOpinion')) || 0;
    } catch (error) {
      ultima = 0;
    }
    const minutos = (Date.now() - ultima) / 60000;
    if (minutos < ESPERA_MINUTOS) {
      estadoOpinion.textContent = 'Ya has publicado una opinión hace poco. Espera unos minutos para publicar otra.';
      return;
    }

    const opinion = {
      nombre: nombre,
      estrellas: Number(estrellaMarcada.value),
      comentario: comentario,
      fecha: Date.now()
    };

    botonEnviar.disabled = true;
    estadoOpinion.textContent = 'Publicando...';

    guardarOpinion(opinion)
      .then(function () {
        try {
          localStorage.setItem('ultimaOpinion', Date.now());
        } catch (error) {
        }
        formOpinion.reset();
        estadoOpinion.textContent = '¡Gracias! Tu opinión ya está publicada.';
        cargarOpiniones();
      })
      .catch(function () {
        estadoOpinion.textContent = 'No se ha podido publicar. Inténtalo de nuevo en un rato.';
      })
      .finally(function () {
        botonEnviar.disabled = false;
      });
  });
}
