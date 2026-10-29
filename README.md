# María Chaves - Laser hair removal and beauty treatments

Website for María Chaves' laser hair removal and beauty centre.

Project made by **Daniel Chaves Domínguez** (2nd year DAW) with **HTML, CSS and JavaScript**, without frameworks.
The only external library is **Firebase**, which is used as the database for the reviews.

## How to view it

Nothing needs to be installed. You can open `index.html` directly in the browser, although it is
better to use the **Live Server** extension for VS Code (right click on `index.html` > *Open with Live
Server*).

## Structure

```
index.html          Home page
aviso-legal.html    Legal notice
privacidad.html     Privacy and cookies policy
404.html            Error page (page not found)
site.webmanifest    Data used when the website is added to the phone's home screen
robots.txt          Tells search engines what they can see
sitemap.xml         List of pages for search engines
style.css           All the styles
js/main.js          All the JavaScript
img/                Logo, icons and images
img/treatments/     Temporary treatment photos (from Pexels)
fonts/              Fonts (EB Garamond and Jost)
```

## Features

- **Booking via WhatsApp**: the form asks for the name and the phone (a Spanish number with 9
  digits, with or without +34), builds the message with the data and opens WhatsApp. You can
  choose morning or afternoon and then the day and time (30-minute appointments, within the
  centre's opening hours). For now nothing is saved: later on, appointments will be stored in the
  database so that two people cannot book the same time.
- **Treatments and prices**: you choose woman or man and the type (laser by single areas, laser
  packs, facial radiofrequency, body radiofrequency or beauty treatments). Each treatment is a card
  with a photo, information and price. Several items can be selected: a bar appears at the bottom
  with the total and, when booking, the list is included in the WhatsApp message. The cards are
  created with JS from the data in `js/main.js` (`ZONAS`, `PACKS`, `RADIOFRECUENCIA` and
  `ESTETICA`), so to change a price you only need to edit it there.
- **About María**: who she is and how the centre works, with a gallery of the centre. Clicking a
  photo opens it bigger in a `<dialog>` that can be used with the keyboard (arrows to change the
  photo, Esc to close, and the focus goes back to the photo when it is closed).
- **Reviews**: customers can leave their name, 1 to 5 stars and a comment. They are saved in
  Firebase and the average rating is calculated.
- **Real-time opening hours**: shows whether the centre is open or closed right now, using Madrid
  time, and highlights today in the opening hours table.
- **Laser animation**: the «Simular un disparo» (simulate a shot) button animates the drawing that
  shows how the laser works.
- **Animated logo** with CSS (it is not animated if the user has «reduce motion» enabled).
- **Mobile menu** and floating booking button.
- **FAQ** with collapsible questions using `<details>`.
- **Responsive** design (mobile, tablet and desktop).
- No cookies or analytics, and the fonts are hosted on the website itself, so no cookie banner is
  needed.

## Treatment photos

For now the cards use temporary photos from [Pexels](https://www.pexels.com) (free to use, no
attribution needed), saved in `img/treatments/`. They will be replaced with the photos chosen by
María, hosted on Cloudinary.

The radiofrequency and beauty treatments are the same for women and men, so each one has two
photos: `imagen` (woman) and `imagenHombre` (man). The photo changes when you choose woman or man.

If a treatment has no photo (its `imagen` field is empty), the card shows a striped placeholder. To
change a photo, upload it to Cloudinary and paste its URL in the treatment's `imagen` field in
`js/main.js`. When all the photos are on Cloudinary, the `img/treatments/` folder can be deleted. It is a good idea to
add `f_auto,q_auto,w_600` after `/upload/` in the URL so that Cloudinary serves it in the right
format and size. For example:

```
https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/f_auto,q_auto,w_600/limpieza-facial.jpg
```

Photos are automatically cropped to a 3:2 ratio (`object-fit: cover`), so it is best to keep the
important part in the centre.

## Photos of María and the centre

The «Sobre María» section works the same way: María's photo is in `FOTO_MARIA` and the gallery
photos are in `FOTOS_CENTRO`, both in `js/main.js`. While the URL is empty, a striped placeholder
with the text of the photo is shown. To add a photo, paste its URL and, in the gallery, change
`texto` if needed (it is the caption of the enlarged view and what screen readers say).

María's photo is cropped to a 4:5 ratio (portrait) and the gallery photos to 4:3, so a horizontal
photo works best for the first one of the gallery, which is the biggest.

## Reviews with Firebase

Until Firebase is configured, reviews are not active: the form shows a message saying they will be
available soon. To activate them:

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project
   (the free plan is more than enough).
2. In the project, go to **Firestore Database** > *Create database* (location in Europe, for
   example `eur3`).
3. In *Project settings* > *Your apps*, add a **web** app and copy `apiKey`, `authDomain` and
   `projectId` into `FIREBASE_CONFIG`, at the beginning of the reviews block in `js/main.js`.
4. In Firestore > **Rules**, paste these rules and publish them. This way anyone can read and add
   reviews, but nobody can change or delete them from the website, and the data is checked to have
   the correct format:

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

The Firebase `apiKey` is not secret: it goes in the website's code, and what protects the data are
the rules. If someone leaves an offensive review, it can be deleted manually from the Firebase
console (Firestore > `opiniones` collection).

## To do

- [ ] Add María's **tax ID (NIF)** and **email** in `aviso-legal.html` and `privacidad.html` (they
      are currently highlighted in yellow).
- [ ] Add the **postal code** to the address (the town and province are already there: Puerto Real, Cádiz).
- [ ] When there is a domain, replace `https://tu-dominio.es` with the real domain (find and replace
      in `index.html`, `robots.txt` and `sitemap.xml`). It is used for Google and for the image shown
      when the link is shared.
- [ ] When it is known, add the postal code to the Google business data (`"postalCode"` inside
      `"address"`, in the `<script type="application/ld+json">` of `index.html`).
- [ ] Replace the temporary treatment **photos** with María's photos on Cloudinary (see above).
- [ ] Add the photos of **María and the centre** to `FOTO_MARIA` and `FOTOS_CENTRO` (see above).
- [ ] Add María's **training and years of experience** to «Sobre María» (they are still blank in
      the business plan) and confirm the text of that section with her.
- [ ] Set up **Firebase** for the reviews (see above).
- [ ] Confirm the **FAQ** and the «Paso a paso» (step by step) and «Cuidados» (care) texts with María.
- [ ] Have someone review the legal texts.
