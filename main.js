const apiKey = 'e9a155139b33c0fe6f352522d508dc5b'; // Replace with your OpenWeatherMap API key
const searchBox = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const weatherIcon = document.querySelector('.weather-icon');
const weatherBox = document.querySelector('.weather-box');
const notFound = document.querySelector('.not-found');
const cityName = document.querySelector('.city-name');

async function checkWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        // Update city name
        cityName.innerHTML = `${data.name}, ${data.sys.country}`;
        
        // Update weather information
        document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.description').innerHTML = data.weather[0].description;
        document.querySelector('.humidity span').innerHTML = `${data.main.humidity}%`;
        document.querySelector('.wind span').innerHTML = `${data.wind.speed} km/h`;

        // Set weather icon based on weather condition
        const weatherCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;

        // Show weather box with animation
        weatherBox.style.display = 'block';
        weatherBox.style.animation = 'fadeIn 0.5s ease-in-out';
        notFound.style.display = 'none';
    } catch (error) {
        weatherBox.style.display = 'none';
        notFound.style.display = 'block';
    }
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

searchBtn.addEventListener('click', () => {
    if (searchBox.value.trim() !== '') {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && searchBox.value.trim() !== '') {
        checkWeather(searchBox.value);
    }
}); 