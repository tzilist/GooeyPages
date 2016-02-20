const express = require('express'); 
const fs = require('fs');
const path = require('path'); 
const app = express(); 

app.get('/done', (req, res) => {
	res.sendFile(path.join(__dirname,'./../client/done.html'))
})

app.get('/index', (req, res) => {
	res.sendFile(path.join(__dirname,'./../client/index.html'))
})

app.get('/test', (req, res) => {
	res.sendFile(path.join(__dirname,'./../client/test.html'))
})

