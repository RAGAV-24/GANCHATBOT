const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route: Generate Image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Simulate image generation (Replace with GAN integration)
    const fakeImageUrl = `https://via.placeholder.com/500x500.png?text=${encodeURIComponent(prompt)}`;

    console.log("Prompt received:", prompt);

    res.status(200).json({ imageUrl: fakeImageUrl });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
