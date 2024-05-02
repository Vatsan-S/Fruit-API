// get all html elements

let searchInput = document.getElementById("search-input");
let dataContainer = document.getElementById("dataContainer");
let nutriChart = document.getElementById("nutriChart");


// data fetch and card creation

fetch("https://www.fruityvice.com/api/fruit/all")
  .then((response) => response.json())
  .then((data) => console.log(data));

let fruitData = fetch("https://www.fruityvice.com/api/fruit/all");
fruitData
  .then((response) => response.json())
  .then((data) => {
    // function to create card
    function createCard(cardData) {
      dataContainer.innerHTML = "";
      for (i = 0; i < cardData.length; i++) {
        let currentCard = cardData[i].id;
        let singleCard = document.createElement("div");
        singleCard.classList = "col-md-6 col-lg-4 col-xl-4 singleCard";
        singleCard.innerHTML = `
        <div class="inner-card" onclick="openPopup(${currentCard})">
          <div class="image-container"><p>${cardData[
            i
          ].name[0].toUpperCase()}</p></div>
          <div class="info-container">
            <h3 class="fruit-name">${cardData[i].name}</h3>
            <p class="fruit-family">${cardData[i].family}</p>
          </div>
        </div>
      `;
        dataContainer.append(singleCard);
      }
    }
    createCard(data);

    

    // search logic

    searchInput.onkeyup = function () {
      // console.log("working");
      let res = [];
      let searchName = searchInput.value;
      if (searchName.length) {
        res = data.filter((eachitem) => {
          return eachitem.name.toLowerCase().includes(searchName.toLowerCase());
        });
        createCard(res);
      } else {
        createCard(data);
      }
    };
  });



  // graph logic and design 

function openPopup(nutriData) {
  fetch("https://www.fruityvice.com/api/fruit/all")
    .then((response1) => response1.json())
    .then((data1) => {
      // console.log(nutriData)
      for (i = 0; i < data1.length; i++) {
        if (data1[i].id === nutriData) {
          let popupContainer = document.createElement("div");
          popupContainer.classList =
            "popupContainer col-sm-8 col-md-6 col-lg-4";
          document.body.append(popupContainer);
          let popupHeading = document.createElement("h3");
          popupHeading.innerHTML = `Nutrion Chart of ${data1[i].name}`;
          popupContainer.append(popupHeading);
          let graphCanvas = document.createElement("canvas");
          popupContainer.append(graphCanvas);
          let closeButton = document.createElement("button");
          closeButton.innerHTML = "Close";
          popupContainer.append(closeButton);

          let nutri = data1[i].nutritions;
          let config = {
            type: "bar",
            data: {
              labels: ["calories", "fat", "sugar", "carbohydrates", "protein"],
              datasets: [
                {
                  label: "in grms",
                  data: [
                    nutri.calories,
                    nutri.fat,
                    nutri.sugar,
                    nutri.carbohydrates,
                    nutri.protein,
                  ],
                },
              ],
            },
          };
          let graph = new Chart(graphCanvas, config);
          closeButton.addEventListener("click", function () {
            popupContainer.remove();
          });
          window.addEventListener("click", (event) => {
            if (popupContainer) {
              popupContainer.remove();
            }
          });
        }
      }
    });

 
}
