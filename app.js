const express = require('express');
const axios = require('axios');

const app = express();
const port = 8081;
const url = 'https://api.ip2location.io/';
const apiKey = 'D74C899063FA3AA7864A20CA0D5E189A';

app.get("/api/hello", async (req, res) => {
    const ip = req.headers['cf-connecting-ip'] ||
               req.headers['x-real-ip'] ||
               req.headers['x-forwarded-for'] ||
               req.socket.remoteAddress || '';

    const visitor_name = req.query.visitor_name ? req.query.visitor_name.replace(/["']/g, '') : 'Guest'; // Remove quotes and slashes from visitor_name

    try {
        // Fetch location data
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                ip: ip
            }
        });
        const city = response.data.city_name;
        const lat = response.data.latitude;
        const lon = response.data.longitude;

        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = weatherResponse.data.current_weather.temperature;

        // Format greeting
        const greeting = `Hello, ${visitor_name}, the temperature is ${weatherData} degrees Celsius in ${city}`;

        res.json({
            client_ip: response.data.ip,
            location: city,
            greeting: greeting
        });
    } catch (error) {
        console.error('Error making the API request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
