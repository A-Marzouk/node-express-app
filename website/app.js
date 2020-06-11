/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


let zipCode = '90001'; // los angeless - to be read from user input
const apiKey = '63051696b741ea5504c120b377927c37';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// helper function:

const createWeatherURL = () => {
    let url =  `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
    return url;
};

// Fetch data from the API
const getweatherDataByZipCode = async (url = '') => {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        if(weatherData.message){
            throw {message: weatherData.message} ;
        }
        console.log(weatherData);
    }catch (e) {
        document.getElementById('error-feedback').innerHTML = 'Error: ' + e.message ;
    }
};
getweatherDataByZipCode(createWeatherURL());


// post data to the server:

const postweatherData = async (url= '', data ={}) => {
    // use Fetch API to Post data:

    const request = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    });

    // read the response of this request:
    try {
        const response = await request.json();
        console.log(response);
    }catch (e) {
        document.getElementById('error-feedback').innerHTML = 'Error: ' + e.message ;
    }

};

// post data to the server:
postweatherData('/add-weather-data',{
    temperature : 37,
    date : newDate,
    feelings: 'I feel good'
});


