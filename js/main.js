/* =========================================================
   María Chaves - JavaScript de la web
   Autor: Daniel Chaves Domínguez (2º DAW)
   ========================================================= */

const TELEFONO_WHATSAPP = '34689751693';
const TELEFONO_TEXTO = '689 751 693';

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

if (botonDisparo && diagrama) {
  botonDisparo.addEventListener('click', function () {
    diagrama.classList.remove('firing');
    setTimeout(function () {
      diagrama.classList.add('firing');
    }, 20);
  });
}

const formulario = document.getElementById('booking-form');

function crearMensaje(nombre, elegidos, notas) {
  const lineas = ['Hola, soy ' + nombre + '.'];

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

  if (notas) {
    lineas.push(notas);
  }

  return lineas.join('\n');
}

if (formulario) {
  const inputNombre = document.getElementById('booking-name');
  const errorNombre = document.getElementById('booking-name-error');
  const mensajeEstado = document.getElementById('booking-status');

  function mostrarError(mostrar) {
    errorNombre.hidden = !mostrar;
    inputNombre.classList.toggle('error', mostrar);
    if (mostrar) {
      inputNombre.setAttribute('aria-invalid', 'true');
    } else {
      inputNombre.removeAttribute('aria-invalid');
    }
  }

  inputNombre.addEventListener('input', function () {
    if (inputNombre.value.trim() !== '') mostrarError(false);
  });

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    if (nombre === '') {
      mostrarError(true);
      inputNombre.focus();
      return;
    }
    mostrarError(false);

    const notas = document.getElementById('booking-notes').value.trim();

    const texto = crearMensaje(nombre, seleccion, notas);
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
