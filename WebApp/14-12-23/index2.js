const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running and listening on Port ${PORT}`);
});

app.get('/', (req, res) => {    
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Wellcome Everyone</h1>');
});

