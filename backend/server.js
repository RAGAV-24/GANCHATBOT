const express = require('express');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use('/api/images', imageRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
