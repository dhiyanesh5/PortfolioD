const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// SheetDB API URL
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/e65luyeri7g5n';

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service like Outlook, Yahoo, etc.
    auth: {
        user: '<your-email>@gmail.com', // Replace with your email
        pass: '<your-email-password>', // Replace with your email password or app password
    },
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Send data to SheetDB
        const sheetResponse = await axios.post(SHEETDB_API_URL, {
            data: [{ name, email, message }],
        });

        console.log('Data saved to SheetDB:', sheetResponse.data);

        // Send email notification
        const mailOptions = {
            from: '<your-email>@gmail.com', // Sender address
            to: '<your-email>@gmail.com', // Your email to receive notifications
            subject: 'New Form Submission',
            text: `You have a new form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully.');

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
