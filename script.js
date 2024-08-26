const temp = document.getElementById("temp");
const temp1 = document.getElementById("temp1");
const temp2 = document.getElementById("temp2");
const feels_like = document.getElementById("feels-like");
const feels_like1 = document.getElementById("feels-like1");
const uv = document.getElementById("uv");
const uv1 = document.getElementById("uv1");
const humidity = document.getElementById("humidity");
const humidity1 = document.getElementById("humidity1");
const humidity2 = document.getElementById("humidity2");
const condition = document.getElementById("condition");
const condition1 = document.getElementById("condition1");
const pressure = document.getElementById("pressure");
const pressure1 = document.getElementById("pressure1");
const wind = document.getElementById("wind");
const wind1 = document.getElementById("wind1");
const wind2 = document.getElementById("wind2");
const intensity = document.getElementById("intensity");
const intensity1 = document.getElementById("intensity1");
const visibility = document.getElementById("visibility");
const visibility1 = document.getElementById("visibility1");
const submit = document.getElementById("submit");
const city = document.getElementById("city");
const cityName = document.getElementById("cityName");

weatherCode = {
  0: "Unknown",
  1000: "Clear, Sunny",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm",
};

const options = { method: "GET", headers: { accept: "application/json" } };

const apiKey = "";

async function fetchWeather(city) {
  try {
    cityName.innerHTML = " of "+city;

    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apiKey}`,
      options
    );
    const result = await response.json();

    temp.innerHTML = Math.round(result.data.values.temperature);
    temp1.innerHTML = Math.round(result.data.values.temperature);
    temp2.innerHTML = Math.round(result.data.values.temperature);
    feels_like.innerHTML = Math.round(result.data.values.temperatureApparent);
    feels_like1.innerHTML = Math.round(result.data.values.temperatureApparent);

    let UV = result.data.values.uvIndex;
    if(UV>=0 && UV<=2) uv.innerHTML = "Weak";
    else if(UV>2 && UV<=5) uv.innerHTML = "Moderate";
    else if(UV>5 && UV<8) uv.innerHTML = "Strong";
    else if(UV>=8 && UV<= 10) uv.innerHTML = "Very Strong";
    else uv.innerHTML = "Extreme";
    
    uv1.innerHTML = uv.innerHTML;
    humidity.innerHTML = result.data.values.humidity;
    humidity1.innerHTML = result.data.values.humidity;
    humidity2.innerHTML = result.data.values.humidity;

    condition.innerHTML = weatherCode[result.data.values.weatherCode];
    condition1.innerHTML = weatherCode[result.data.values.weatherCode];
    pressure.innerHTML = result.data.values.pressureSurfaceLevel;
    pressure1.innerHTML = result.data.values.pressureSurfaceLevel;
    wind.innerHTML = result.data.values.windSpeed;
    wind1.innerHTML = result.data.values.windSpeed;
    wind2.innerHTML = result.data.values.windSpeed;
    intensity.innerHTML = result.data.values.rainIntensity;
    intensity1.innerHTML = result.data.values.rainIntensity;
    visibility.innerHTML = result.data.values.visibility;
    visibility1.innerHTML = result.data.values.visibility;
  } catch (error) {
    console.error(error);
  }
}
submit.addEventListener("click", (e) => {
  e.preventDefault();
  fetchWeather(city.value);
});

fetchWeather("Haridwar");

// Code for Other Cities below

async function exCities(city, i) {
    try {
        const response = await fetch(
          `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apiKey}`,
          options
        );
        const result = await response.json();
        console.log(result);
        
        let city1 = document.getElementById("city"+i).firstElementChild;
        const temperature = city1.nextElementSibling;
        temperature.innerHTML = Math.round(result.data.values.temperature);
        const humid = temperature.nextElementSibling;
        humid.innerHTML = result.data.values.humidity;
        const Wind = humid.nextElementSibling;
        Wind.innerHTML = result.data.values.windSpeed;
        const feels = Wind.nextElementSibling;
        feels.innerHTML = Math.round(result.data.values.temperatureApparent);
        const code = feels.nextElementSibling;
        code.innerHTML = weatherCode[result.data.values.weatherCode];
        const visi = code.nextElementSibling;
        visi.innerHTML = result.data.values.visibility;
        const UV1 = visi.nextElementSibling;

        let UV = result.data.values.uvIndex;
    if(UV>=0 && UV<=2) UV1.innerHTML = "Weak";
    else if(UV>2 && UV<=5) UV1.innerHTML = "Moderate";
    else if(UV>5 && UV<8) UV1.innerHTML = "Strong";
    else if(UV>=8 && UV<= 10) UV1.innerHTML = "Very Strong";
    else UV1.innerHTML = "Extreme";

        const press = UV1.nextElementSibling;
        press.innerHTML = result.data.values.pressureSurfaceLevel;
        const rain = press.nextElementSibling;
        rain.innerHTML = result.data.values.rainIntensity;
    }catch(error){
        console.error(error);
    }
}

for (let i = 1; i < 5; i++) {
    let city2 = document.getElementById("city"+i).firstElementChild;
    exCities(city2.innerHTML,i);
    // console.log(city2.innerHTML);
}
