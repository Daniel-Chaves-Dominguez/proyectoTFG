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

function pintarPelos(capa, cantidad, color, grosor) {
  let pelos = '';
  for (let i = 0; i < cantidad; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 500;
    const largo = 10 + Math.random() * 18;
    const finalX = x + largo * 0.4 + Math.random() * 4;
    const finalY = y + largo;
    const curvaX = x + Math.random() * 8 - 4;
    const curvaY = y + largo / 2;
    const opacidad = 0.5 + Math.random() * 0.5;
    pelos += '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) +
      ' Q' + curvaX.toFixed(1) + ' ' + curvaY.toFixed(1) + ' ' + finalX.toFixed(1) + ' ' + finalY.toFixed(1) +
      '" opacity="' + opacidad.toFixed(2) + '"/>';
  }
  capa.innerHTML = '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<g fill="none" stroke="' + color + '" stroke-width="' + grosor + '" stroke-linecap="round">' + pelos + '</g></svg>';
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
  pintarPelos(capaPelos, 420, '#3b2620', 1.5);
  pintarPelos(document.getElementById('compare-fine'), 25, '#b98a7c', 0.8);
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

const DURACION_CITA = 30;
const MESES_A_MOSTRAR = 2;

let mesVisible = 0;
let diaElegido = null;

const formulario = document.getElementById('booking-form');

function aHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas + ':' + (resto < 10 ? '0' + resto : resto);
}

function tramoDelDia(diaSemana, franja) {
  const tramos = HORARIO[diaSemana];
  if (franja === 'morning') return tramos[0];
  return tramos[1];
}

function horasLibres(fecha, franja) {
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

const FOTOS_CENTRO = [
  { imagen: 'img/centre/facade.jpg', texto: 'Fachada en C/ La Palma, 29' },
  { imagen: 'img/centre/reception.jpg', texto: 'Recepción y sala de espera' },
  { imagen: 'img/centre/cabin.jpg', texto: 'Cabina de tratamientos' },
  { imagen: 'img/centre/showcase.jpg', texto: 'Vitrina con productos y gafas de protección' },
  { imagen: 'img/centre/sign.jpg', texto: 'Letrero de la entrada' },
  { imagen: 'img/centre/window.jpg', texto: 'Escaparate con el logo' }
];

const cajaFotoMaria = document.getElementById('about-photo');
const galeria = document.getElementById('gallery');
const visor = document.getElementById('lightbox');
let fotoActual = 0;
let botonGaleria = null;

function pintarFotoMaria() {
  if (FOTO_MARIA !== '') {
    cajaFotoMaria.innerHTML = '<img class="about__img" src="' + FOTO_MARIA + '" alt="María Chaves" width="800" height="1000" loading="lazy">';
  } else {
    cajaFotoMaria.innerHTML = crearHueco('María', 'about__img');
  }
}

function pintarGaleria() {
  let html = '';
  FOTOS_CENTRO.forEach(function (foto, i) {
    let contenido = crearHueco(foto.texto, 'gallery__img');
    if (foto.imagen !== '') {
      contenido = '<img class="gallery__img" src="' + foto.imagen + '" alt="" width="800" height="600" loading="lazy">';
    }
    html += '<li><button type="button" class="gallery__item" data-index="' + i + '" aria-label="Ampliar foto: ' + foto.texto + '">' +
      contenido + '</button></li>';
  });
  galeria.innerHTML = html;
}

function mostrarFotoGrande(numero) {
  if (numero < 0) numero = FOTOS_CENTRO.length - 1;
  if (numero >= FOTOS_CENTRO.length) numero = 0;
  fotoActual = numero;
  const foto = FOTOS_CENTRO[fotoActual];
  const caja = document.getElementById('lightbox-photo');

  if (foto.imagen !== '') {
    caja.innerHTML = '<img class="lightbox__img" src="' + foto.imagen + '" alt="' + foto.texto + '">';
  } else {
    caja.innerHTML = crearHueco(foto.texto, 'lightbox__img');
  }

  document.getElementById('lightbox-caption').textContent = foto.texto + ' · ' + (fotoActual + 1) + ' de ' + FOTOS_CENTRO.length;
}

if (cajaFotoMaria && galeria && visor) {
  pintarFotoMaria();
  pintarGaleria();

  galeria.addEventListener('click', function (e) {
    const boton = e.target.closest('.gallery__item');
    if (!boton) return;
    botonGaleria = boton;
    mostrarFotoGrande(Number(boton.dataset.index));
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
    if (botonGaleria) botonGaleria.focus();
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

  if (opiniones.length === 0) {
    textoMedia.textContent = 'Todavía no hay opiniones. ¡Anímate a dejar la primera!';
    return;
  }

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
