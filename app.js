const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(port, () =>{
    console.log('Server listening on port ${port}');
});

