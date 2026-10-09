
const apiKey = "6db948ba63a06a06a65162f08112dfdc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const errorMessage = document.querySelector(".error");


// =========================
// Check Weather
// =========================

async function checkWeather(city) {

    city = city.trim();

    // Empty input
    if (city === "") {

        weather.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Please enter a city name.";

        return;
    }


    try {

        const response = await fetch(
            apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`
        );

        const data = await response.json();

        console.log(data);


        // =========================
        // City not found
        // =========================

        if (!response.ok) {

            weather.style.display = "none";

            errorMessage.style.display = "block";
            errorMessage.innerHTML = "City not found.";

            return;
        }


        // =========================
        // Successful search
        // =========================

        errorMessage.style.display = "none";


        cityName.innerHTML = data.name;

        temperature.innerHTML =
            Math.round(data.main.temp) + "°C";

        humidity.innerHTML =
            data.main.humidity + "%";

        wind.innerHTML =
            data.wind.speed + " km/h";


        // Weather icon
        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


        // Show weather
        weather.style.display = "block";

    }

    catch (error) {

        console.error("Error:", error);

        weather.style.display = "none";

        errorMessage.style.display = "block";
        errorMessage.innerHTML =
            "Unable to get weather information.";

    }
}


// =========================
// Search button
// =========================

searchBtn.addEventListener("click", () => {

    checkWeather(searchBox.value);

});


// =========================
// Enter key
// =========================

searchBox.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        checkWeather(searchBox.value);

    }

});

