# María Chaves - Depilación láser y estética

Página web para el centro de depilación láser y estética de María Chaves.

Proyecto hecho por **Daniel Chaves Domínguez** (2º DAW) con **HTML, CSS y JavaScript**, sin frameworks
ni librerías.

## Cómo verla

No hace falta instalar nada. Se puede abrir `index.html` directamente en el navegador, aunque es
mejor usar la extensión **Live Server** de VS Code (clic derecho en `index.html` > *Open with Live
Server*).

## Estructura

```
index.html          Página principal
aviso-legal.html    Aviso legal
privacidad.html     Política de privacidad y cookies
404.html            Página de error (página no encontrada)
site.webmanifest    Datos para cuando se añade la web a la pantalla de inicio del móvil
style.css           Todos los estilos
js/main.js          Todo el JavaScript
img/                Logo, iconos e imágenes
fonts/              Tipografías (EB Garamond y Jost)
```

## Qué tiene la web

- **Cita por WhatsApp**: el formulario monta el mensaje con los datos y abre WhatsApp. No se
  guarda nada en ningún servidor.
- **Horario en tiempo real**: indica si el centro está abierto o cerrado ahora mismo, con la hora
  de Madrid, y marca el día de hoy en la tabla del horario.
- **Selector de zonas**: al elegir una zona se ven las sesiones, cada cuánto tiempo y la duración
  aproximada del tratamiento.
- **Animación del láser**: el botón «Simular un disparo» anima el dibujo de cómo actúa el láser.
- **Logo animado** con CSS (si el usuario tiene activado «reducir movimiento» no se anima).
- **Menú para móvil** y botón flotante de WhatsApp.
- **Preguntas frecuentes** desplegables con `<details>`.
- Diseño **responsive** (móvil, tablet y ordenador).
- Sin cookies ni analítica, y las fuentes están en la propia web, así que no hace falta banner de
  cookies.

## Pendiente

- [ ] Poner el **NIF** y el **correo** de María en `aviso-legal.html` y `privacidad.html` (ahora
      salen marcados en amarillo).
- [ ] Añadir **municipio, código postal y provincia** a la dirección.
- [ ] Confirmar con María los **tratamientos de estética**, las **sesiones** de cada zona y las
      **preguntas frecuentes**.
- [ ] Que alguien revise los textos legales.
