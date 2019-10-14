const devFestDataURL = "https://devfest-nantes-2018-api.cleverapps.io/blog";
const devFestImagesURL = "https://devfest2018.gdgnantes.com";
const xmlHttpRequest = new XMLHttpRequest();

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

function takePicture() {}
