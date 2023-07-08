const tempe = document.querySelector("#temp");
const loc = document.querySelector("#loca");
const input_loc = document.querySelector("#loc_input");
const submit = document.querySelector("#submit");

async function get_weather(location = "London") {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=e18cc4ba8959484f8eb93443232406&q=${location}&aqi=no`,
    { mode: "cors" }
  );
  const weather = response.json();
  console.log(weather);
  weather.then(function (response) {
    tempe.textContent = response.current.temp_c;
    loc.textContent = location;
  });
  weather.catch(function () {
    loc.textContent = "Wrong location";
    tempe.textContent = "";
  });
}

submit.addEventListener("click", function (event) {
  event.preventDefault();
  get_weather(input_loc.value);
});
