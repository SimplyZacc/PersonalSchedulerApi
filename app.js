const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

const app = express();

//Import routes
const authRoute = require('./routes/auth');
const eventRoute = require('./routes/event');

//configure .env file
dotEnv.config();

//middleware
app.use(express.json());
app.use(cors());
app.options('*', cors());

//Routes middleware
app.use('/api/user', authRoute);
app.use('/api/event', eventRoute);

app.listen(3000, function() {
    console.log('Server is up and running!');
});