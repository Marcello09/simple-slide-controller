const express = require('express');
const app = express();
var robot = require("robotjs");

// configura porta
const port = 3000;
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
    console.log(`Serving at port ${port}`)
})
