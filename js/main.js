/* =========================================================
   María Chaves - JavaScript de la web
   Autor: Daniel Chaves Domínguez (2º DAW)
   ========================================================= */

const TELEFONO_WHATSAPP = '34689751693';
const TELEFONO_TEXTO = '689 751 693';

// Horario: 0 = domingo, 1 = lunes ... 6 = sábado (igual que getDay())
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


/* ---------- Año del pie ---------- */
const anio = document.getElementById('anio');
if (anio) {
  anio.textContent = new Date().getFullYear();
}


/* ---------- Borde de la cabecera al hacer scroll ---------- */
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


/* ---------- Menú móvil ---------- */
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

  // al pulsar un enlace del menú se cierra
  menu.querySelectorAll('nav a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
  });

  // con la tecla Escape también
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) {
      cerrarMenu();
      botonAbrir.focus();
    }
  });
}


/* ---------- Abierto / cerrado en tiempo real ---------- */
// Se usa la hora de Madrid aunque el visitante esté en otro país

function aMinutos(hora) {
  const partes = hora.split(':');
  return Number(partes[0]) * 60 + Number(partes[1]);
}

function horaDeMadrid() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());

  let diaTexto = '';
  let horas = 0;
  let minutos = 0;
  partes.forEach(function (p) {
    if (p.type === 'weekday') diaTexto = p.value;
    if (p.type === 'hour') horas = Number(p.value);
    if (p.type === 'minute') minutos = Number(p.value);
  });

  const dias = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return { dia: dias.indexOf(diaTexto), minutos: horas * 60 + minutos };
}

function textoEstado(dia, minutos) {
  // ¿Está abierto ahora?
  for (const tramo of HORARIO[dia]) {
    if (minutos >= aMinutos(tramo[0]) && minutos < aMinutos(tramo[1])) {
      return { abierto: true, texto: 'Abierto ahora, hasta las ' + tramo[1] + '.' };
    }
  }

  // Si no, buscamos la próxima apertura (hoy más tarde o los días siguientes)
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

  // marcar el día de hoy en la tabla del horario
  document.querySelectorAll('.horario-fila').forEach(function (fila) {
    const dias = fila.dataset.dias.split(',').map(Number);
    const esHoy = dias.includes(ahora.dia);
    fila.classList.toggle('hoy', esHoy);
    fila.querySelector('.etiqueta-hoy').hidden = !esHoy;
  });
}

if (document.querySelector('.estado')) {
  actualizarHorario();
  setInterval(actualizarHorario, 60000); // cada minuto
}


/* ---------- Selector de zonas ---------- */
const radiosZona = document.querySelectorAll('input[name="zona"]');

radiosZona.forEach(function (radio) {
  radio.addEventListener('change', function () {
    document.querySelectorAll('.panel-zona').forEach(function (panel) {
      panel.classList.remove('activo');
    });
    document.getElementById('panel-' + radio.value).classList.add('activo');
  });
});


/* ---------- Botón "Simular un disparo" ---------- */
const botonDisparo = document.getElementById('boton-disparo');
const diagrama = document.getElementById('diagrama');

if (botonDisparo && diagrama) {
  botonDisparo.addEventListener('click', function () {
    diagrama.classList.remove('disparando');
    void diagrama.offsetWidth; // truco para que la animación se repita
    diagrama.classList.add('disparando');
  });
}


/* ---------- Botón flotante de WhatsApp ---------- */
// Se esconde cuando ya se ven los botones del inicio o el formulario
const fab = document.getElementById('fab');
const zonasConBoton = [document.getElementById('heroe-acciones'), document.getElementById('contacto')]
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


/* ---------- Formulario de cita por WhatsApp ---------- */
// No se envía nada a ningún servidor: se monta el mensaje y se abre wa.me

const FRANJAS = {
  mananas: 'por las mañanas',
  tardes: 'por las tardes',
  sabado: 'el sábado por la mañana',
  indiferente: ''
};

const formulario = document.getElementById('form-reserva');

function crearMensaje(nombre, tratamiento, franja, notas) {
  const lineas = ['Hola, soy ' + nombre + '.'];

  if (tratamiento) {
    lineas.push('Me gustaría pedir cita para ' + tratamiento + '.');
  } else {
    lineas.push('Me gustaría que me asesorarais sobre qué tratamiento me conviene.');
  }

  if (FRANJAS[franja]) {
    lineas.push('Me viene mejor ' + FRANJAS[franja] + '.');
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

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    if (nombre === '') {
      mostrarError(true);
      inputNombre.focus();
      return;
    }
    mostrarError(false);

    const tratamiento = document.getElementById('reserva-tratamiento').value;
    const franja = formulario.querySelector('input[name="franja"]:checked').value;
    const notas = document.getElementById('reserva-notas').value.trim();

    const texto = crearMensaje(nombre, tratamiento, franja, notas);
    const url = 'https://wa.me/' + TELEFONO_WHATSAPP + '?text=' + encodeURIComponent(texto);

    // si el navegador bloquea la ventana nueva, abrimos en la misma
    const ventana = window.open(url, '_blank');
    if (ventana) {
      ventana.opener = null;
    } else {
      window.location.href = url;
    }

    mensajeEstado.textContent = 'Hemos abierto WhatsApp con tu mensaje. Si no se ha abierto, escríbenos al ' + TELEFONO_TEXTO + '.';
  });
}
