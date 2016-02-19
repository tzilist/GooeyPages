const express = require('express'); 
 const fs = require('fs');
 const path = require('path'); 
const app = express(); 

app.use('/download',  bundler.bundle); 
app.get('/download', (req, res) => { });
app.listen(3000, () => { });