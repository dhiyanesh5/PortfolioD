const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// SheetDB API URL
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/e65luyeri7g5n';


// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Send data to SheetDB
        const sheetResponse = await axios.post(SHEETDB_API_URL, {
            data: [{ name, email, message }],
        });

        console.log('Data saved to SheetDB:', sheetResponse.data);

        
        res.status(200).send('Your details have been successfully recorded. Thank you!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('There was an error recording your details. Please try again.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});