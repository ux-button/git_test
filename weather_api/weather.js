const buttonFind = document.getElementById('find');
const searchInput = document.getElementById('search');
const temperatureCelcius = document.querySelector('#weather h1');
const currentCondition = document.querySelector('#weather .text-bold');
const locationName = document.querySelector('#weather .text-regular');
const weatherContainer = document.getElementById('weather');


const getWeather = async () => {
    const location = searchInput.value;
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=adae81d255dd4ec6a2a91652241005&q=${location}`);
    return await response.json();
}   

const showWeather = async () => {
    try {
        const currentWeather = await getWeather();
        const temperature = Math.round(currentWeather['current']['temp_c']);
        colorTemp(temperature, weatherContainer)
        locationName.textContent = currentWeather['location']['region'];
        temperatureCelcius.textContent = `${Math.round(currentWeather['current']['temp_c'])}°`;
        currentCondition.textContent = currentWeather['current']['condition']['text'];
    } catch {
        locationName.textContent = 'No such location';
        temperatureCelcius.textContent = '';
        currentCondition.textContent = '';
    }
}

const colorTemp = (temperature, containerName) => {
    if (temperature < -20) {
        containerName.className = 'color-01';
    } else if (temperature < -10) {
        containerName.className = 'color-02';
    } else if (temperature < 0) {
        containerName.className = 'color-03';
    } else if (temperature < 5) {
        containerName.className = 'color-04';
    } else if (temperature < 10) {
        containerName.className = 'color-05';
    } else if (temperature < 15) {
        containerName.className = 'color-06';
    } else if (temperature < 20) {
        containerName.className = 'color-07';
    } else if (temperature < 25) {
        containerName.className = 'color-08';
    } else if (temperature < 30) {
        containerName.className = 'color-09';
    } else {
        containerName.className = 'color-10';
    }
}

buttonFind.addEventListener('click', showWeather)