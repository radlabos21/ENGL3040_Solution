const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// ✅ Serve all files directly from the root folder
app.use(express.static(__dirname));
app.use(express.json());

// ✅ GET users.json
app.get('/users.json', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading user data.');
        res.header('Content-Type', 'application/json');
        res.send(data);
    });
});

// ✅ POST users.json
app.post('/users.json', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    const newData = JSON.stringify(req.body, null, 2);
    fs.writeFile(filePath, newData, (err) => {
        if (err) return res.status(500).send('Error saving user data.');
        res.send({ status: 'success' });
    });
});

// ✅ Launch the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
