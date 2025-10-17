async function fetch_info(city_name) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a01e5fa546a24dfaa27164614251710&q=${city_name}&aqi=no`);
    return await response.json();
}

const button = document.getElementById("button");
button.addEventListener("click", get_weather);

async function get_weather() {
    const city = document.getElementById("i");
    const data = await fetch_info(city.value);

    const container = document.getElementById("main");
    container.innerHTML = "";
    const item = document.createElement("div");
    item.className = "data";

    const temp = document.createElement("p");
    temp.textContent = `Temperature: ${data.current.temp_c}°C`;
    item.appendChild(temp);

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    item.appendChild(humidity);

    const windspeed = document.createElement("p");
    windspeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    item.appendChild(windspeed);

    container.appendChild(item);
    city.value = "";
}
