# María Chaves - Depilación láser y estética

Página web para el centro de depilación láser y estética de María Chaves.

Proyecto hecho por **Daniel Chaves Domínguez** (2º DAW) con **HTML, CSS y JavaScript**, sin frameworks.
La única librería externa es **Firebase**, que se usa como base de datos para las opiniones.

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
robots.txt          Indica a los buscadores qué pueden ver
sitemap.xml         Lista de páginas para los buscadores
style.css           Todos los estilos
js/main.js          Todo el JavaScript
img/                Logo, iconos e imágenes
fonts/              Tipografías (EB Garamond y Jost)
```

## Qué tiene la web

- **Cita por WhatsApp**: el formulario monta el mensaje con los datos y abre WhatsApp. Se puede
  elegir mañana o tarde y después el día y la hora (citas de 30 minutos, dentro del horario del
  centro). De momento no se guarda nada: más adelante las citas irán a la base de datos para que
  no se puedan reservar dos a la misma hora.
- **Tratamientos y precios**: se elige mujer u hombre y el tipo (láser por zonas sueltas, láser
  por packs o estética). Cada tratamiento es una tarjeta con foto, información y precio. Se pueden
  elegir varias cosas: aparece una barra abajo con el total y, al pedir cita, la lista va en el
  mensaje de WhatsApp. Las tarjetas se crean con JS a partir de los datos de `js/main.js`
  (`ZONAS`, `PACKS` y `ESTETICA`), así que para cambiar un precio solo hay que tocar ahí.
- **Opiniones**: los clientes pueden dejar su nombre, de 1 a 5 estrellas y un comentario. Se
  guardan en Firebase y se calcula la media.
- **Horario en tiempo real**: indica si el centro está abierto o cerrado ahora mismo, con la hora
  de Madrid, y marca el día de hoy en la tabla del horario.
- **Animación del láser**: el botón «Simular un disparo» anima el dibujo de cómo actúa el láser.
- **Logo animado** con CSS (si el usuario tiene activado «reducir movimiento» no se anima).
- **Menú para móvil** y botón flotante de WhatsApp.
- **Preguntas frecuentes** desplegables con `<details>`.
- Diseño **responsive** (móvil, tablet y ordenador).
- Sin cookies ni analítica, y las fuentes están en la propia web, así que no hace falta banner de
  cookies.

## Fotos de los tratamientos

Mientras no hay foto, cada tarjeta enseña un boceto con rayas. Para poner una foto, se sube a
Cloudinary y se pega su URL en el campo `imagen` del tratamiento en `js/main.js`. Conviene añadir
`f_auto,q_auto,w_600` detrás de `/upload/` en la URL para que Cloudinary la sirva en el formato y
el tamaño adecuados. Por ejemplo:

```
https://res.cloudinary.com/TU_CUENTA/image/upload/f_auto,q_auto,w_600/limpieza-facial.jpg
```

Las fotos se recortan solas en formato 3:2 (`object-fit: cover`), así que mejor que lo importante
esté en el centro.

## Opiniones con Firebase

Mientras no se configure Firebase, las opiniones no están activas: el formulario avisa de que
llegarán pronto. Para activarlas:

1. Entrar en [console.firebase.google.com](https://console.firebase.google.com) y crear un proyecto
   (el plan gratuito sobra).
2. En el proyecto, **Firestore Database** > *Crear base de datos* (ubicación en Europa, por ejemplo
   `eur3`).
3. En *Configuración del proyecto* > *Tus apps*, añadir una app **web** y copiar `apiKey`,
   `authDomain` y `projectId` en `FIREBASE_CONFIG`, al principio del bloque de opiniones de
   `js/main.js`.
4. En Firestore > **Reglas**, pegar estas reglas y publicarlas. Así cualquiera puede leer y añadir
   opiniones, pero nadie puede cambiarlas ni borrarlas desde la web, y se comprueba que los datos
   tienen el formato correcto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /opiniones/{id} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasOnly(['nombre', 'estrellas', 'comentario', 'fecha'])
        && request.resource.data.nombre is string
        && request.resource.data.nombre.size() > 0
        && request.resource.data.nombre.size() <= 40
        && request.resource.data.estrellas is int
        && request.resource.data.estrellas >= 1
        && request.resource.data.estrellas <= 5
        && request.resource.data.comentario is string
        && request.resource.data.comentario.size() > 0
        && request.resource.data.comentario.size() <= 500
        && request.resource.data.fecha is int;
      allow update, delete: if false;
    }
  }
}
```

La `apiKey` de Firebase no es secreta: va en el código de la web y lo que protege los datos son las
reglas. Si alguien deja una opinión ofensiva, se borra a mano desde la consola de Firebase
(Firestore > colección `opiniones`).

## Pendiente

- [ ] Poner el **NIF** y el **correo** de María en `aviso-legal.html` y `privacidad.html` (ahora
      salen marcados en amarillo).
- [ ] Añadir **municipio, código postal y provincia** a la dirección.
- [ ] Cuando haya dominio, cambiar `https://tu-dominio.es` por el dominio real (buscar y reemplazar
      en `index.html`, `robots.txt` y `sitemap.xml`). Se usa para Google y para la imagen que sale
      al compartir el enlace.
- [ ] Añadir el municipio y el código postal también en los datos para Google (`"address"`, en el
      `<script type="application/ld+json">` de `index.html`).
- [ ] Poner las **fotos** de los tratamientos (ver arriba).
- [ ] Configurar **Firebase** para las opiniones (ver arriba).
- [ ] Confirmar con María las **preguntas frecuentes** y los textos de «Paso a paso» y «Cuidados».
- [ ] Que alguien revise los textos legales.
