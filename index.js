const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Root Express Route
app.get('/', (req, res) => {
    res.send('Hola, Job Porter Server is Boiling!!!');
})

app.listen(PORT);