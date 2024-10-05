const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/users', userRoutes);

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});

