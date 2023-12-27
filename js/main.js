document.querySelector("button").addEventListener("click", getFetch);
// Get the current date
let currentDate = new Date();

// Format the date as YYYY-MM-DD
let todaysDate =
  currentDate.getFullYear() +
  "-" +
  ("0" + (currentDate.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + currentDate.getDate()).slice(-2);

document.querySelector("input").value = todaysDate;

function getFetch() {
  document.querySelector("span").textContent = "";
  let choice = document.querySelector("input").value;

  if (choice > todaysDate) {
    choice = todaysDate;
    document.querySelector("span").textContent =
      "Please select today's date or before";
  } else if (choice < "1995-06-20") {
    document.querySelector("span").textContent =
      "Please select 06/20/1995 or after";
    choice = "1995-06-20";
  }

  const key = "37xtVRoiW2VLjd3aE8UMcan0svzrKxkmlZWSXgDI";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${choice}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      document.getElementById("imageOfDay").src = "#";
      document.querySelector("iframe").src = "";
      console.log(data);

      data.media_type == "image"
        ? (document.getElementById("imageOfDay").src = data.hdurl) &&
          (document.querySelector("iframe").style.display = "none")
        : (document.querySelector("iframe").style.display = "block") &&
          (document.querySelector("iframe").src = data.url);

      document.querySelector("h2").innerText = data.title;
      document.querySelector("h3").innerText = data.explanation;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

getFetch();

//todo: buttons to scroll through dates
//changing date activates getFetch()
