const express = require('express');

const app = express();
app.use(express.static('Vue'));

app.listen(8899, '127.0.0.1');