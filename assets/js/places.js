const placesEl = document.querySelector("#places");
function places() {
  if (placesEl) {
    displayLocations();
  }
}

const API = "/getLocations/";
var allLocationsArray = [];
function displayLocations() {


  fetch(API)
    .then((res) => res.json(API))
    .then((response) => {
      response.map((divResponse) => {
        console.log(divResponse)
        var divLocations = `<div class="col-12 bg-danger">
                              <h5 id="${divResponse}">${divResponse}</h5>
                            </div>`;
        placesEl.insertAdjacentHTML("afterend", divLocations);
        var imageEl = document.getElementById(`${divResponse}`);
        imageEl.addEventListener("click", function() {
          console.log(`You've clicked on ${divResponse}.`);
        })

        var locationsAPI = API + divResponse
        console.log(locationsAPI)

        fetch(locationsAPI)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.length);
          for (var i = 0; i < res.length; i++){
            console.log('This is res.URL: ', res);
          }
        })
      })


      
    })


}

export { places };
