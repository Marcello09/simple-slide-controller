const express = require('express');
const app = express();
var robot = require("robotjs");
const { networkInterfaces } = require('os');

// configura porta
const port = 3000;
// captura ip do host
const getNet = () => {
    const nets = networkInterfaces();
    const results = []// Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                results.push(net.address);
            }
        }
    }
    return results;
}
const ips = getNet();

// configura serving static files
app.use(express.static('public'))

// Envia comando de passar para proxima pagina
app.get('/api/next', (req,res) => {
    console.log("Clicking Right")
    robot.keyTap("right");
    res.sendStatus(200);
})

// Envia comando de voltar pagina
app.get('/api/prev', (req,res) => {
    console.log("clicking Left")
    robot.keyTap("left");
    res.sendStatus(200);
})

app.listen(port, () => {
    ips.forEach((ip) => {
        console.log(`Serving at  http://${ip}:${port}`)
    })
})
