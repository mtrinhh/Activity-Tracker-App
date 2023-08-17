const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static('./../public'))

const uri = process.env.MONGO_DB_CONNECTION_STRING;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const activitiesRouter = require('./routes/activities')
const usersRouter = require('./routes/users')

app.use('/api/activities', activitiesRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
