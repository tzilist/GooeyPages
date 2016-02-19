const express = require('express'); 
const fs = require('fs');
const path = require('path'); 
const app = express(); 

app.get('/html1', (req, res) => {
	res.sendFile(path.join(__dirname,'./../html/html1.html'))
})

app.get('/html2', (req, res) => {
	res.sendFile(path.join(__dirname,'./../html/html2.html'))
})

