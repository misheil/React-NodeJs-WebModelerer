// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const ServerPortRouter = require('./routes/ServerPortRoutes');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('./../static'))

app.use('/serverport', ServerPortRouter);

app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});