// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const PORT = 3000;

app.listen(PORT, listening);

function listening() {
    console.log('Server is listening on port: ' + PORT);
}

// routes:

app.get('/get-project-data', function(req,res){
    res.send(projectData);
});

app.post('/add-weather-data', function (req, res) {
    // add a new entry to projectData object.
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;

    res.send({message: 'Post has been received..'});
});
