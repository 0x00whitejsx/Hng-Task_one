const express  = require('express')
const app = express()
const axios = require('axios')


// https://api.ip2location.io/?key=D74C899063FA3AA7864A20CA0D5E189A&ip=197.210.70.127



const url = 'https://api.ip2location.io/';
const apiKey = 'D74C899063FA3AA7864A20CA0D5E189A';
const ip = '197.210.70.127';



const port = 8080;

app.get("/api/hello", (req, res) => {
    const visitor_name1 = req.query.visitor_name;

    axios.get(url, {
        params: {
            key: apiKey,
            ip: ip
        }
    })
    .then(response => {
        console.log(response.data);
        res.json({
            "client_ip": response.data.ip, // The IP address of the requester
            "location": response.data.city_name, // The city of the requester
            "greeting": `Hello, ${visitor_name1}, the temperature is 11 degrees Celcius in ${response.data.city_name}`
        });
    })
    .catch(error => {
        console.error('Error making the API request:', error);
    });
   
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
