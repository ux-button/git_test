const buttonFind = document.getElementById('find');
const searchInput = document.getElementById('search');
const temperatureCelcius = document.querySelector('#weather h1');
const currentCondition = document.querySelector('#weather .text-bold');
const locationName = document.querySelector('#weather .text-regular');

const getWeather = async () => {
    const location = searchInput.value;
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=adae81d255dd4ec6a2a91652241005&q=${location}`);
    return await response.json();
}   

const showWeather = async () => {
    try {
        const currentWeather = await getWeather();
        locationName.textContent = currentWeather['location']['region'];
        temperatureCelcius.textContent = `${Math.round(currentWeather['current']['temp_c'])}°`;
        currentCondition.textContent = currentWeather['current']['condition']['text'];
    } catch {
        locationName.textContent = 'No such location';
        temperatureCelcius.textContent = '';
        currentCondition.textContent = '';
    }
}

buttonFind.addEventListener('click', showWeather)