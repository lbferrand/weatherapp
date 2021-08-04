let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let now = new Date();
let day = days[now.getDay()];
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let month = months[now.getMonth()];
let dateNumber = now.getDate();
let date = document.querySelector("#date");
date.innerHTML = `${month} ${day} ${dateNumber}, ${hours}:${minutes}`;

//Celsios to Farenheit

function clickForF(event) {
  event.preventDefault();
  let newFTemp = document.querySelector("#main-temp");
  newFTemp.innerHTML = `27°`;
}
let cToF = document.querySelector("#c");
cToF.addEventListener("click", clickForF);

function clickForC(event) {
  event.preventDefault();
  let newCTemp = document.querySelector("#main-temp");
  newCTemp.innerHTML = `81°`;
}
let fToC = document.querySelector("#f");
fToC.addEventListener("click", clickForC);

let apiKey = "111d251bac5a6929ec7b388bf51f6a63";

//Show the real temperature
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//Enter the city and replacing the name in h1 function
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&&appid=${apiKey}`).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#new-city").value;
  search(newCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

search("New York");

function getCurrentLocation(event) {
  event.preventDefault();

  function currentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&&appid=${apiKey}`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentLocation);
