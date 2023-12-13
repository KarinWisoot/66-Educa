const express = require('express');
const app = express();
const path = require('path');


let dir = path.join(__dirname, '../../laab02_css')
let url = path.resoleve(__dirname, '../../laab02_css/index3.html')


app.use(express.static(dir));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running and listening on Port ${PORT}`);
});

app.get('/main', (req, res) => {
    res.sendFile(url);
});

app.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Test Page</h1>')
});

app.get('*', (req, res) => {
    res.status(404).send('<center><h1>404 Page Not Found</h1></center>');
});

// Update

app.get('*', (req, res) => {
    res.redirect('/main')
});