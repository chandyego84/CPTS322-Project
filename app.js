const express = require('express');
const connectDB = require('./config/db');
const routes = require("./routes/api/books");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

// use cors middleware w/ origin and creds options
app.use(cors({ origin: true, credentials:true }));

// use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use routes module as middleware
// for the /api/books path
app.use('/api/books', routes);

connectDB();

app.get('/', (req, res) => res.send('Hello noob!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));