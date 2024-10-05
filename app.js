const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const { authenticateToken, limiter, requestLogger } = require('./middleware/authMiddleware'); // Adjust the path

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Apply the request logger
app.use(requestLogger);

// Apply rate limiter to all requests
app.use(limiter);

// Use authentication middleware on user routes
app.use('/api/users', authenticateToken, userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});