/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


let zipCode = '90001'; // los angeless.
const apiKey = '63051696b741ea5504c120b377927c37';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Fetch data from the API
const getweatherDataByZipCode = async (url = '') => {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        console.log(weatherData);
    }catch (e) {
        console.log('Errors: ' + e);
    }

};



const createWeatherURL = () => {
    let url =  `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
    return url;
};

getweatherDataByZipCode(createWeatherURL());


