const config = require('./config').config;
const express = require('express');
const users = require('./users.json');
const ejs = require('ejs');

const app = express();

const dataChart = {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [{
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
    }, {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false
    }, {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false
    }, {
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false
    }, {
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: "North America",
        borderColor: "#c45850",
        fill: false
    }]
 };

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/api/users', (request, response) => {
    response.send(users);
})

app.get('/api/user/:id', (request, response) => {
    const id = request.params.id;
    if(!users[id]) {
        response.send('Nie znaleziono')
    } else {
        response.send(users[id])
    }
    
})

app.get('/', (request, response) => {
    response.render(__dirname + '/index.html');
})

app.get('/continents', (request, response) => {
    response.render(__dirname + '/continents.html', { chartData: JSON.stringify(dataChart) });
})

app.listen(config.port, function() {
    console.info('Server is running on port ' + config.port);
})