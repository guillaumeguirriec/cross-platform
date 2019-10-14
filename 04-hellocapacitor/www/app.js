const { Plugins, CameraResultType } = capacitorExports;
const devFestDataURL = "https://devfest-nantes-2018-api.cleverapps.io/blog";
const devFestImagesURL = "https://devfest2018.gdgnantes.com";
const xmlHttpRequest = new XMLHttpRequest();
const { Camera } = Plugins;
const { Storage } = Plugins;
let modal;
let image;

// get DevFest Data
getDevFestData();

// functions
function addCard(content) {
  // ionContent
  let ionContent = document.getElementById("ion-content");

  // card
  let ionCard = document.createElement("ion-card");

  // header
  let img = document.createElement("img");
  img.setAttribute("src", devFestImagesURL + content.image);
  let ionCardHeader = document.createElement("ion-card-header");
  let ionCardTitle = document.createElement("ion-card-title");
  ionCardTitle.innerHTML = content.title;
  ionCardHeader.appendChild(img);
  ionCardHeader.appendChild(ionCardTitle);

  // content
  let ionCardContent = document.createElement("ion-card-content");
  ionCardContent.innerHTML += content.brief;

  // build card
  ionCard.appendChild(ionCardHeader);
  ionCard.appendChild(ionCardContent);
  ionContent.appendChild(ionCard);
}

function getDevFestData() {
  xmlHttpRequest.onreadystatechange = function(event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        data.forEach(devFestData => {
          addCard(devFestData);
        });
      } else {
        console.log(
          "Status de la réponse: %d (%s)",
          this.status,
          this.statusText
        );
      }
    }
  };

  xmlHttpRequest.open("GET", devFestDataURL, true);
  xmlHttpRequest.send(null);
}

async function takePicture() {
  image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

  presentModal();
}

customElements.define(
  "modal-page",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <ion-header>
          <ion-toolbar>
            <ion-title>Création d'un article privé</ion-title>
            <ion-buttons slot="primary">
              <ion-button onClick="dismissModal()">
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <form onsubmit="save(event)">
            <ion-item>
              <ion-label position="floating">Titre</ion-label>
              <ion-input required/>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Description</ion-label>
              <ion-input/>
            </ion-item>
            <ion-fab horizontal="center" expand="block">
              <ion-button type="submit">
                Enregistrer
              </ion-button>
            </ion-fab>
          </form>
        </ion-content>`;
    }
  }
);

async function presentModal() {
  // create the modal with the `modal-page` component
  const modalElement = document.createElement("ion-modal");
  modalElement.component = "modal-page";

  // present the modal
  document.body.appendChild(modalElement);
  modal = modalElement;
  return modalElement.present();
}

async function dismissModal() {
  await modal.dismiss({
    dismissed: true
  });
}

async function save(event) {
  event.preventDefault();
  const title = event.target[0].value;
  const description = event.target[1].value;
  const imageUrl = image.webPath;

  // ionContent
  let ionContent = document.getElementById("ion-content");

  // card
  let ionCard = document.createElement("ion-card");

  // header
  let img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  let ionCardHeader = document.createElement("ion-card-header");
  let ionCardTitle = document.createElement("ion-card-title");
  ionCardTitle.innerHTML += title;
  ionCardHeader.appendChild(img);
  ionCardHeader.appendChild(ionCardTitle);

  // content
  let ionCardContent = document.createElement("ion-card-content");
  ionCardContent.innerHTML += description;

  // build card
  ionCard.appendChild(ionCardHeader);
  ionCard.appendChild(ionCardContent);
  ionContent.appendChild(ionCard);

  // JSON "set" example
  await Storage.set({
    key: "article",
    value: JSON.stringify({
      title: title,
      description: description,
      image: imageUrl
    })
  });

  await modal.dismiss({
    dismissed: true
  });
}
