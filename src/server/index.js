var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch'); // 
dotenv.config(); 

const app = express();
const cors = require('cors'); 
app.use(cors());
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, 'dist'))); 

console.log(__dirname);

const apiKey = process.env.API_KEY; // Access the API key from the .env file
const meaning_cloud = process.env.M_API_KEY; // Access a second API key (if needed)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html')); // Serve the index.html from 'dist' folder
});

app.post('/api', async (req, res) => {
    const userURL = req.body.url; // Extract the URL submitted by the user from the request body
    try {
        const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${userURL}&lang=en`; // Construct the API request URL
        const response = await fetch(apiURL); // Make the request to the MeaningCloud API
        
        if (!response.ok) { // Check if the response is successful
            throw new Error('Failed to fetch sentiment analysis');
        }

        const data = await response.json(); // Parse the response data into JSON
        res.send(data); // Send the data back to the client
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        res.status(500).json({ error: 'Internal server error' }); // Send an error response to the client
    }
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!'); // Log a message when the server is running
});
