var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch');
require('dotenv').config();
// Express 
const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:8081'];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.post('/sentiment', async (req, res) => {
    try {
        const formText = req.body.text; // Get the text from the request body
        const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${formText}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            // body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Could not get data: ${error}`);
        res.status(500).send('Server Error');
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, '0.0.0.0', function () {
    console.log('NLP app listening on port 8081!');
});
