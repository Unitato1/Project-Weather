const tempe = document.querySelector("#temp");
const loc = document.querySelector("#loca");
const input_loc = document.querySelector("#loc_input");
const submit = document.querySelector("#submit");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const condition_con = document.querySelector("#condition");
const gif_img = document.querySelector("#gif_weather");

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
    humidity.textContent = response.current.humidity;
    wind.textContent = response.current.wind_kph;
    condition_con.textContent = response.current.condition.text;
    let condition = response.current.condition.text;
    return condition;
  });

  weather.catch(function () {
    loc.textContent = "Wrong location";
    tempe.textContent = "";
  });
}
async function get_gif(condition) {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=pH6XfW22KImvJ6BVmimwN1Uv3NXaJuBw&s=${condition}`,
    { mode: "cors" }
  );
  const gif_data = res.json();
  gif_data.then(function (gif) {
    gif_img.src = gif.data.images.original.url;
  });
}

submit.addEventListener("click", async function (event) {
  event.preventDefault();
  condition = get_weather(input_loc.value);
  condition.then(function (res) {
    console.log(res, "Here");
  });
  get_gif(condition);
});
