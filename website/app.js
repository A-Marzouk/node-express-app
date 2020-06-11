/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// URL parts
const apiKey = '63051696b741ea5504c120b377927c37';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// user inputs:
let zipCode = '';
let enteredFeelings = '';

// UI elements:
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

// helper functions:
const createWeatherURL = () => {
    let url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
    return url;
};

// listen to user  button click:
document.getElementById('generate').addEventListener('click', () => {
    zipCode = document.getElementById('zip').value;
    enteredFeelings = document.getElementById('feelings').value;

    getWeatherDataByZipCode(createWeatherURL())
        .then((weatherData) => {
            let temp = weatherData.main.temp;
            postWeatherData('/add-weather-data',{
                temperature : temp,
                date : newDate,
                feelings: enteredFeelings
            }).then( () => {
                getLastEntry()
                    .then( (projectData) => {
                        updateUI(projectData);
                });
            });
        });
})


// Fetch data from the API
const getWeatherDataByZipCode = async (url = '') => {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        if (weatherData.message) {
            throw {message: weatherData.message};
        }
        return weatherData;
    } catch (e) {
        console.log('getWeatherDataByZipCode: ' + e);
        document.getElementById('error-feedback').innerHTML = 'Error: ' + e.message;
    }
};

// post data to the server:
const postWeatherData = async (url = '', data = {}) => {
    // use Fetch API to Post data:

    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // read the response of this request:
    try {
        const response = await request.json();
        console.log(response);
    } catch (e) {
        console.log('postWeatherData: ' + e);
        document.getElementById('error-feedback').innerHTML = 'Error: ' + e.message;
    }
};

// get entry:
const getLastEntry = async () => {
    const response = await fetch('/get-project-data');

    try {
        const projectData = await response.json();
        return projectData ;
    } catch (e) {
        console.log('getLastEntery: ' + e);
        document.getElementById('error-feedback').innerHTML = 'Error: ' + e.message;
    }
};

// Update the UI with the entered data + data from the API:
const updateUI = (data = {}) => {
    dateDiv.innerHTML = data.date;
    tempDiv.innerHTML = data.temperature;
    contentDiv.innerHTML = data.feelings;
};




