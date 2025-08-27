const express = require('express');
const router = require('./routes');
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json());    //plugging in the json parsing middleware
app.use('/', router);

app.listen(8080, () => console.log('server running on port 8080'));

