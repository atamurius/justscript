'use strict';

var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('target'));
app.listen(process.env.PORT || 8080, () => console.log('Server started'));
