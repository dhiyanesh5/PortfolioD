const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(bodyParser.json()); // For JSON payloads
app.use(express.static('public')); // Serve your frontend from the 'public' folder

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Log or save data
    const formData = `Name: ${name}, Email: ${email}, Message: ${message}\n`;
    fs.appendFileSync('submissions.txt', formData); // Save submissions to a file

    console.log('Received submission:', formData);
    res.status(200).send('Your details have been received. Thank you!');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
