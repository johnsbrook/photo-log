function status(event) {

  // This section will create HTML to post status box

  const statusBox = document.querySelector("#statusBox");
  const statusEl = `<div id="statusText">
                      <div id="status" class="statusForm">
                        <form action="/status" method="post" id="formStatus" class="text-left">
                          <textarea
                            name="statusUpdate"
                            id="statusUpdate"
                            cols="100%"
                            rows="3"
                            placeholder="What's on your mind?"
                            class="px-3 py-1"
                          ></textarea>
                          <button class="button btn px-2 py-1"><i class="far fa-paper-plane"></i></button>
                          <span class="buttonCancel btn py-1 px-2 ml-1" id="buttonCancel"><i class="fas fa-times"></i></span>
                        </form>
                      </div>
                    </div>`;
  statusBox.insertAdjacentHTML('afterbegin', statusEl);

  // This section will display the status box
  const statusBtn = document.querySelector("#postStatus");
  const buttonCancel = document.querySelector("#buttonCancel");
  showHideStatusBox();
  function showHideStatusBox() {
    statusBtn.addEventListener("click", function () {
      statusBox.style.display = "flex";
    });
    buttonCancel.addEventListener("click", function () {
      statusBox.style.display = "none";
    });
  }

  // This section will load all the previous status post
  const status = document.querySelector("#statusText");
  const previousStats = document.querySelector("#previousStatus");
  const statusAPI = "/status";

  if (status) {
    previousStatus();
    function previousStatus(event) {
      fetch(statusAPI)
        .then((res) => res.json(statusAPI))
        .then((d) => {
          d.map((d) => {
            let id = d._id;
            let date = d.timestamp;
            let dateArray = date.split("-");
            let dateArray2 = dateArray[2].split("T");
            let dateArray3 = dateArray2[1].split(".");
            let timestamp =
              "Created on: " +
              dateArray[1] +
              "/" +
              dateArray2[0] +
              "/" +
              dateArray[0] +
              " @" +
              dateArray3[0];

            let statusText = d.statusUpdate;
            let statusCard = `<div class="mt-3 col-12 col-md-12 mx-auto card text-left pt-2 px-4 pb-4 cardStatus" data-id="${id}">
                              <span style="font-size: .8rem;">${timestamp} 
                              <span onClick="delete" class="delete"><i class="far fa-trash-alt text-right delete" data-id=${id}></i>
                              </span></span><br>
                              <span class="statusText" data-id="${id}">${statusText}</span>
                            </div>`;

            previousStats.insertAdjacentHTML("afterbegin", statusCard);
          });
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    }

    // This section will delete status post
    previousStats.addEventListener("click", function (e) {
      if (e.target.matches(".delete")) {
        console.log("you clicked on delete");
        console.log("this is the element: ", e.target);
        var el = e.target;
        console.log(el);
        var dataID = el.getAttribute("data-id");
        console.log(dataID);
        fetch("/deleteStatus/" + dataID, {
          method: "delete",
        }).then(() => {
          location.reload();
        });
      }
    });
  }
}

export { status };
