const express = require('express');
const app = express();
const axios = require('axios');

const port = 8080


app.get("/api/hello", async (req, res) => {
   const ip = req.headers['cf-connecting-ip'] ||
              req.headers['x-real-ip'] ||
              req.headers['x-forwarded-for'] ||
              req.socket.remoteAddress || '';
              
        res.json({
            ip:ip
        })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
