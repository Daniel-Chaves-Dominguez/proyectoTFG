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

const anio = document.getElementById('anio');
if (anio) {
  anio.textContent = new Date().getFullYear();
}

const cabecera = document.querySelector('.cabecera');

function comprobarScroll() {
  if (window.scrollY > 20) {
    cabecera.classList.add('con-borde');
  } else {
    cabecera.classList.remove('con-borde');
  }
}

if (cabecera) {
  window.addEventListener('scroll', comprobarScroll);
  comprobarScroll();
}

const menu = document.getElementById('menu');
const botonAbrir = document.getElementById('abrir-menu');
const botonCerrar = document.getElementById('cerrar-menu');

function abrirMenu() {
  menu.classList.add('abierto');
  botonAbrir.setAttribute('aria-expanded', 'true');
  botonCerrar.focus();
}

function cerrarMenu() {
  menu.classList.remove('abierto');
  botonAbrir.setAttribute('aria-expanded', 'false');
}

if (menu && botonAbrir && botonCerrar) {
  botonAbrir.addEventListener('click', abrirMenu);
  botonCerrar.addEventListener('click', cerrarMenu);

  menu.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) {
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

  document.querySelectorAll('.estado').forEach(function (el) {
    el.classList.toggle('abierto', estado.abierto);
    el.querySelector('.estado__texto').textContent = estado.texto;
  });

  document.querySelectorAll('.horario-fila').forEach(function (fila) {
    const dias = fila.dataset.dias.split(',').map(Number);
    const esHoy = dias.includes(ahora.dia);
    fila.classList.toggle('hoy', esHoy);
    fila.querySelector('.etiqueta-hoy').hidden = !esHoy;
  });
}

if (document.querySelector('.estado')) {
  actualizarHorario();
  setInterval(actualizarHorario, 60000);
}

const ZONAS = {
  mujer: [
    { talla: 'XS', precio: 5, imagen: '', partes: ['Labio superior', 'Patillas', 'Barbilla', 'Areolas', 'Línea alba', 'Perianal'] },
    { talla: 'S', precio: 6, imagen: '', partes: ['Axilas', 'Mentón', 'Triángulo alba', 'Manos', 'Ingles', 'Labios vaginales', 'Pies'] },
    { talla: 'M', precio: 14, imagen: '', partes: ['Facial', 'Antebrazos', 'Ingles brasileñas', 'Pubis', 'Glúteos', 'Lumbar'] },
    { talla: 'L', precio: 22, imagen: '', partes: ['Zona íntima completa', 'Brazos completos', 'Medias piernas', 'Espalda'] },
    { talla: 'XL', precio: 37, imagen: '', partes: ['Piernas completas'] }
  ],
  hombre: [
    { talla: 'XS', precio: 7, imagen: '', partes: ['Mejillas', 'Entrecejo', 'Nuca'] },
    { talla: 'S', precio: 8, imagen: '', partes: ['Cuello', 'Axilas', 'Manos', 'Pies', 'Perianal'] },
    { talla: 'M', precio: 17, imagen: '', partes: ['Facial', 'Hombros', 'Tórax', 'Abdomen', 'Antebrazos', 'Lumbar', 'Pubis', 'Glúteos'] },
    { talla: 'L', precio: 27, imagen: '', partes: ['Brazos completos', 'Zona íntima completa', 'Medias piernas'] },
    { talla: 'XL', precio: 47, imagen: '', partes: ['Espalda completa', 'Pecho completo', 'Piernas completas'] }
  ]
};

const PACKS = {
  mujer: [
    { nombre: 'Axilas, ingles y pubis', precio: 23, imagen: '' },
    { nombre: 'Axilas, ingles, pubis y medias piernas', precio: 41, imagen: '' },
    { nombre: 'Axilas, ingles, pubis, perianal y medias piernas', precio: 45, imagen: '' },
    { nombre: 'Axilas, ingles, pubis, perianal y piernas completas', precio: 63, imagen: '' },
    { nombre: 'Cuerpo básico', descripcion: 'Sin facial ni brazos.', precio: 68, imagen: '' },
    { nombre: 'Cuerpo completo', precio: 83, imagen: '' }
  ],
  hombre: [
    { nombre: 'Tórax y abdomen', precio: 32, imagen: '' },
    { nombre: 'Piernas completas y glúteos', precio: 58, imagen: '' },
    { nombre: 'Cuerpo inferior', precio: 75, imagen: '' },
    { nombre: 'Cuerpo superior', precio: 85, imagen: '' },
    { nombre: 'Cuerpo básico', descripcion: 'Sin zona íntima.', precio: 100, imagen: '' },
    { nombre: 'Cuerpo completo', precio: 120, imagen: '' }
  ]
};

const ESTETICA = [
  {
    nombre: 'Limpieza facial profunda',
    descripcion: 'Elimina impurezas, células muertas y exceso de grasa. Deja la piel limpia, fresca y más luminosa, y ayuda a prevenir puntos negros y granitos.',
    pasos: ['Agua micelar', 'Exfoliante con scrub', 'Vapor de ozono', 'Peeling', 'Eliminación de puntos negros', 'Alta frecuencia', 'Mascarilla', 'Crema hidratante', 'Crema solar'],
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 35 }]
  },
  {
    nombre: 'Radiofrecuencia facial',
    descripcion: 'Estimula el colágeno y la elastina para mejorar la firmeza, la elasticidad y la calidad de la piel del rostro.',
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 50 }, { texto: 'Bono 3 sesiones', precio: 135 }, { texto: 'Bono 5 sesiones', precio: 210 }]
  },
  {
    nombre: 'Radiofrecuencia en papada y mentón',
    descripcion: 'Reafirma la piel y mejora el contorno de la parte de abajo del rostro.',
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 25 }, { texto: 'Bono 3 sesiones', precio: 65 }, { texto: 'Bono 5 sesiones', precio: 110 }]
  },
  {
    nombre: 'Radiofrecuencia en ojeras',
    descripcion: 'Mejora la circulación y atenúa las bolsas y la flacidez del contorno de ojos.',
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 20 }, { texto: 'Bono 3 sesiones', precio: 50 }, { texto: 'Bono 5 sesiones', precio: 80 }]
  },
  {
    nombre: 'Radiofrecuencia en brazos',
    descripcion: 'Combate la flacidez y mejora la firmeza de la piel de los brazos.',
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 40 }, { texto: 'Bono 3 sesiones', precio: 110 }, { texto: 'Bono 5 sesiones', precio: 180 }]
  },
  {
    nombre: 'Radiofrecuencia en abdomen',
    descripcion: 'Reafirma la piel, reduce la flacidez y mejora el aspecto de la zona abdominal.',
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 40 }, { texto: 'Bono 3 sesiones', precio: 110 }, { texto: 'Bono 5 sesiones', precio: 180 }]
  },
  {
    nombre: 'Radiofrecuencia en glúteos',
    descripcion: 'Reafirma la piel, mejora la textura y realza su forma de manera natural.',
    imagen: '',
    opciones: [{ texto: '1 sesión', precio: 40 }, { texto: 'Bono 3 sesiones', precio: 110 }, { texto: 'Bono 5 sesiones', precio: 180 }]
  }
];

let seleccion = [];

function crearFoto(imagen, texto) {
  if (imagen !== '') {
    return '<img class="tarjeta__foto" src="' + imagen + '" alt="" width="600" height="400" loading="lazy">';
  }
  return '<div class="tarjeta__foto boceto" aria-hidden="true">' +
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></svg>' +
    '<span>Foto: ' + texto + '</span></div>';
}

function crearOpcion(id, nombre, texto, precio) {
  return '<li class="opcion">' +
    '<span class="opcion__texto">' + texto + '</span>' +
    '<span class="opcion__precio">' + precio + '€</span>' +
    '<button type="button" class="boton-anadir" aria-pressed="false" data-id="' + id + '" data-nombre="' + nombre + '" data-precio="' + precio + '">Añadir</button>' +
    '</li>';
}

function tarjetaZona(zona, publico) {
  let botones = '';
  zona.partes.forEach(function (parte, i) {
    const id = publico + '-zona-' + zona.talla + '-' + i;
    const nombre = parte + ' (depilación láser, ' + publico + ')';
    botones += '<button type="button" class="chip" aria-pressed="false" data-id="' + id + '" data-nombre="' + nombre + '" data-precio="' + zona.precio + '">' + parte + '</button>';
  });

  return '<article class="tarjeta">' +
    crearFoto(zona.imagen, 'zona ' + zona.talla) +
    '<div class="tarjeta__cuerpo">' +
    '<div class="tarjeta__arriba"><h3>Zona ' + zona.talla + '</h3><p class="tarjeta__precio">' + zona.precio + '€<span> / zona</span></p></div>' +
    '<p class="tarjeta__texto">Toca las zonas que quieras hacerte:</p>' +
    '<div class="chips">' + botones + '</div>' +
    '</div></article>';
}

function tarjetaPack(pack, publico, i) {
  const id = publico + '-pack-' + i;
  const nombre = 'Pack ' + pack.nombre.toLowerCase() + ' (depilación láser, ' + publico + ')';
  let descripcion = '';
  if (pack.descripcion) {
    descripcion = '<p class="tarjeta__texto">' + pack.descripcion + '</p>';
  }

  return '<article class="tarjeta">' +
    crearFoto(pack.imagen, pack.nombre.toLowerCase()) +
    '<div class="tarjeta__cuerpo">' +
    '<p class="tarjeta__tipo">Pack</p>' +
    '<h3>' + pack.nombre + '</h3>' +
    descripcion +
    '<ul class="opciones">' + crearOpcion(id, nombre, 'Por sesión', pack.precio) + '</ul>' +
    '</div></article>';
}

function tarjetaEstetica(tratamiento, i) {
  let opciones = '';
  tratamiento.opciones.forEach(function (opcion, j) {
    const id = 'estetica-' + i + '-' + j;
    let nombre = tratamiento.nombre;
    if (tratamiento.opciones.length > 1) {
      nombre += ' (' + opcion.texto.toLowerCase() + ')';
    }
    opciones += crearOpcion(id, nombre, opcion.texto, opcion.precio);
  });

  let pasos = '';
  if (tratamiento.pasos) {
    pasos = '<details class="tarjeta__pasos"><summary>Ver los ' + tratamiento.pasos.length + ' pasos</summary><ol>';
    tratamiento.pasos.forEach(function (paso) {
      pasos += '<li>' + paso + '</li>';
    });
    pasos += '</ol></details>';
  }

  return '<article class="tarjeta">' +
    crearFoto(tratamiento.imagen, tratamiento.nombre.toLowerCase()) +
    '<div class="tarjeta__cuerpo">' +
    '<h3>' + tratamiento.nombre + '</h3>' +
    '<p class="tarjeta__texto">' + tratamiento.descripcion + '</p>' +
    pasos +
    '<ul class="opciones">' + opciones + '</ul>' +
    '</div></article>';
}

function pintarTratamientos() {
  ['mujer', 'hombre'].forEach(function (publico) {
    let html = '';
    ZONAS[publico].forEach(function (zona) {
      html += tarjetaZona(zona, publico);
    });
    document.getElementById('tarjetas-' + publico + '-zonas').innerHTML = html;

    html = '';
    PACKS[publico].forEach(function (pack, i) {
      html += tarjetaPack(pack, publico, i);
    });
    document.getElementById('tarjetas-' + publico + '-packs').innerHTML = html;
  });

  let html = '';
  ESTETICA.forEach(function (tratamiento, i) {
    html += tarjetaEstetica(tratamiento, i);
  });
  document.getElementById('tarjetas-estetica').innerHTML = html;
}

function mostrarTarjetas() {
  const publico = document.querySelector('input[name="publico"]:checked').value;
  const categoria = document.querySelector('input[name="categoria"]:checked').value;

  let idVisible = 'tarjetas-' + publico + '-' + categoria;
  if (categoria === 'estetica') {
    idVisible = 'tarjetas-estetica';
  }

  document.querySelectorAll('.tarjetas').forEach(function (bloque) {
    bloque.classList.toggle('activo', bloque.id === idVisible);
  });
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
    precio.className = 'eleccion__precio';
    precio.textContent = tratamiento.precio + '€';

    const quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.className = 'eleccion__quitar';
    quitar.dataset.quitar = tratamiento.id;
    quitar.setAttribute('aria-label', 'Quitar ' + tratamiento.nombre);
    quitar.textContent = '×';

    fila.append(nombre, precio, quitar);
    lista.append(fila);
  });
}

function abrirListaBarra(abrir) {
  document.getElementById('barra-panel').hidden = !abrir;
  document.getElementById('barra-ver').setAttribute('aria-expanded', abrir);
  document.getElementById('barra-accion').textContent = abrir ? 'Cerrar' : 'Ver';
  document.getElementById('barra-cita').classList.toggle('abierta', abrir);
}

function quitarTratamiento(id) {
  seleccion = seleccion.filter(function (t) { return t.id !== id; });
  actualizarSeleccion();
}

function actualizarSeleccion() {
  document.querySelectorAll('[data-id]').forEach(function (boton) {
    const elegido = seleccion.some(function (t) { return t.id === boton.dataset.id; });
    boton.setAttribute('aria-pressed', elegido);
    if (boton.classList.contains('boton-anadir')) {
      boton.textContent = elegido ? 'Añadido' : 'Añadir';
    }
  });

  const total = sumarPrecios();
  const hayAlgo = seleccion.length > 0;

  document.getElementById('barra-cita').hidden = !hayAlgo;
  document.getElementById('barra-numero').textContent = seleccion.length;
  document.getElementById('barra-texto').textContent = seleccion.length === 1 ? 'elegido' : 'elegidos';
  document.getElementById('barra-total').textContent = total + '€';
  document.body.classList.toggle('con-seleccion', hayAlgo);

  if (!hayAlgo) abrirListaBarra(false);

  pintarListaElegidos(document.getElementById('barra-lista'));
  pintarListaElegidos(document.getElementById('eleccion-lista'));

  document.getElementById('eleccion-vacia').hidden = hayAlgo;
  const textoTotal = document.getElementById('eleccion-total');
  textoTotal.hidden = !hayAlgo;
  textoTotal.textContent = 'Total: ' + total + '€';
}

function alternarTratamiento(boton) {
  const id = boton.dataset.id;
  const posicion = seleccion.findIndex(function (t) { return t.id === id; });

  if (posicion === -1) {
    seleccion.push({ id: id, nombre: boton.dataset.nombre, precio: Number(boton.dataset.precio) });
  } else {
    seleccion.splice(posicion, 1);
  }
  actualizarSeleccion();
}

const seccionTratamientos = document.getElementById('tratamientos');

if (seccionTratamientos && document.getElementById('tarjetas-estetica')) {
  pintarTratamientos();
  mostrarTarjetas();

  document.querySelectorAll('input[name="publico"], input[name="categoria"]').forEach(function (radio) {
    radio.addEventListener('change', mostrarTarjetas);
  });

  seccionTratamientos.addEventListener('click', function (e) {
    const boton = e.target.closest('[data-id]');
    if (boton) alternarTratamiento(boton);
  });

  ['barra-lista', 'eleccion-lista'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function (e) {
      const boton = e.target.closest('[data-quitar]');
      if (boton) quitarTratamiento(boton.dataset.quitar);
    });
  });

  document.getElementById('barra-ver').addEventListener('click', function () {
    abrirListaBarra(document.getElementById('barra-panel').hidden);
  });

  document.getElementById('barra-vaciar').addEventListener('click', function () {
    seleccion = [];
    actualizarSeleccion();
  });

  document.getElementById('barra-pedir').addEventListener('click', function () {
    abrirListaBarra(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') abrirListaBarra(false);
  });

  const barra = document.getElementById('barra-cita');
  const contacto = document.getElementById('contacto');
  if (contacto && 'IntersectionObserver' in window) {
    const observadorBarra = new IntersectionObserver(function (entradas) {
      barra.classList.toggle('oculta', entradas[0].isIntersecting);
    });
    observadorBarra.observe(contacto);
  }
}

const botonDisparo = document.getElementById('boton-disparo');
const diagrama = document.getElementById('diagrama');

if (botonDisparo && diagrama) {
  botonDisparo.addEventListener('click', function () {
    diagrama.classList.remove('disparando');
    setTimeout(function () {
      diagrama.classList.add('disparando');
    }, 20);
  });
}

const fab = document.getElementById('fab');
const zonasConBoton = [document.getElementById('heroe-acciones'), document.getElementById('tratamientos'), document.getElementById('contacto')]
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
    fab.classList.toggle('oculto', visibles.size > 0);
  });

  zonasConBoton.forEach(function (el) {
    observador.observe(el);
  });
}

const DURACION_CITA = 30;
const MESES_A_MOSTRAR = 2;

let mesVisible = 0;
let diaElegido = null;

const formulario = document.getElementById('form-reserva');

function aHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas + ':' + (resto < 10 ? '0' + resto : resto);
}

function tramoDelDia(diaSemana, franja) {
  const tramos = HORARIO[diaSemana];
  if (franja === 'manana') return tramos[0];
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
    etiqueta.className = 'ficha';
    etiqueta.textContent = opcion.texto;

    caja.append(input, etiqueta);
    contenedor.append(caja);
  });
}

function pintarCalendario(franja) {
  const hoy = new Date();
  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const primero = new Date(hoy.getFullYear(), hoy.getMonth() + mesVisible, 1);

  document.getElementById('calendario-mes').textContent = primero.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  document.getElementById('mes-anterior').disabled = mesVisible === 0;
  document.getElementById('mes-siguiente').disabled = mesVisible === MESES_A_MOSTRAR - 1;

  const contenedor = document.getElementById('calendario-dias');
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
    boton.className = 'calendario__dia';
    boton.textContent = dia;
    boton.dataset.fecha = fecha.toDateString();
    boton.setAttribute('aria-label', fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));
    boton.setAttribute('aria-pressed', diaElegido === boton.dataset.fecha);

    boton.disabled = fecha < inicioHoy || horasLibres(fecha, franja).length === 0;

    if (fecha.getTime() === inicioHoy.getTime()) {
      boton.classList.add('calendario__dia--hoy');
    }

    contenedor.append(boton);
  }
}

function pintarHoras(fecha, franja) {
  const horas = horasLibres(fecha, franja).map(function (hora) {
    return { valor: hora, texto: hora };
  });
  crearFichas(document.getElementById('lista-horas'), 'hora', horas);
}

function crearMensaje(nombre, elegidos, cuando, notas) {
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
  const inputNombre = document.getElementById('reserva-nombre');
  const errorNombre = document.getElementById('reserva-nombre-error');
  const mensajeEstado = document.getElementById('reserva-estado');

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

  const bloqueDia = document.getElementById('bloque-dia');
  const bloqueHora = document.getElementById('bloque-hora');
  const errorHora = document.getElementById('reserva-hora-error');

  function franjaElegida() {
    return formulario.querySelector('input[name="franja"]:checked').value;
  }

  formulario.querySelectorAll('input[name="franja"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      const franja = franjaElegida();
      diaElegido = null;
      mesVisible = 0;
      errorHora.hidden = true;
      bloqueHora.hidden = true;
      bloqueDia.hidden = franja === 'indiferente';
      if (franja !== 'indiferente') pintarCalendario(franja);
    });
  });

  document.getElementById('mes-anterior').addEventListener('click', function () {
    mesVisible--;
    pintarCalendario(franjaElegida());
  });

  document.getElementById('mes-siguiente').addEventListener('click', function () {
    mesVisible++;
    pintarCalendario(franjaElegida());
  });

  document.getElementById('calendario-dias').addEventListener('click', function (e) {
    const boton = e.target.closest('.calendario__dia');
    if (!boton || boton.disabled) return;
    diaElegido = boton.dataset.fecha;
    pintarCalendario(franjaElegida());
    pintarHoras(new Date(diaElegido), franjaElegida());
    bloqueHora.hidden = false;
  });

  document.getElementById('lista-horas').addEventListener('change', function () {
    errorHora.hidden = true;
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

    let cuando = '';
    if (franjaElegida() !== 'indiferente') {
      const hora = formulario.querySelector('input[name="hora"]:checked');
      if (!diaElegido || !hora) {
        errorHora.hidden = false;
        return;
      }
      const fecha = new Date(diaElegido);
      cuando = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '') + ' a las ' + hora.value;
    }

    const notas = document.getElementById('reserva-notas').value.trim();

    const texto = crearMensaje(nombre, seleccion, cuando, notas);
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

const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: ''
};

const ESPERA_MINUTOS = 10;

const formOpinion = document.getElementById('form-opinion');
const listaOpiniones = document.getElementById('lista-opiniones');
const textoMedia = document.getElementById('opiniones-media');

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
  tarjeta.className = 'opinion';

  const arriba = document.createElement('div');
  arriba.className = 'opinion__arriba';

  const nombre = document.createElement('strong');
  nombre.textContent = opinion.nombre;

  const estrellas = document.createElement('span');
  estrellas.className = 'opinion__estrellas';
  estrellas.setAttribute('aria-hidden', 'true');
  estrellas.textContent = dibujarEstrellas(opinion.estrellas);

  const estrellasTexto = document.createElement('span');
  estrellasTexto.className = 'sr-only';
  estrellasTexto.textContent = opinion.estrellas + ' de 5 estrellas';

  arriba.append(nombre, estrellas, estrellasTexto);

  const comentario = document.createElement('p');
  comentario.textContent = opinion.comentario;

  const fecha = document.createElement('p');
  fecha.className = 'opinion__fecha';
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
  const inputNombreOpinion = document.getElementById('opinion-nombre');
  const inputComentario = document.getElementById('opinion-comentario');
  const errorNombreOpinion = document.getElementById('opinion-nombre-error');
  const errorEstrellas = document.getElementById('opinion-estrellas-error');
  const errorComentario = document.getElementById('opinion-comentario-error');
  const botonEnviar = document.getElementById('opinion-enviar');
  const estadoOpinion = document.getElementById('opinion-estado');

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

  cargarOpiniones();

  formOpinion.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = inputNombreOpinion.value.trim();
    const comentario = inputComentario.value.trim();
    const estrellaMarcada = formOpinion.querySelector('input[name="estrellas"]:checked');

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

    if (document.getElementById('opinion-web').value !== '') {
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
