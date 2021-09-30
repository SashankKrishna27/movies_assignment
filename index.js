const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const moviesRoute = require('./routes/MoviesRoute');

const port = process.env.PORT || 9000

app.use(cors())
app.use(express.json());
app.use('/', moviesRoute);

app.listen(port, () => {
  console.log("Server is running at port:", port)
})
