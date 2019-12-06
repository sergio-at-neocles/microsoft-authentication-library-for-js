const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
app.use("/dist", express.static(path.join(__dirname, "../../lib/msal-core/dist")));

// Set up our one route to the index.html file.
app.get('*', function (req, res) {
    const reqPath = req.path === "/" ? "/index.html" : req.path;
    res.sendFile(path.join(__dirname + reqPath));
});

module.exports = app;
