const { generateGANImage } = require('../models/ganModel');

const generateImage = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const imagePath = await generateGANImage(prompt);
        res.json({ imageUrl: `http://localhost:5000/${imagePath}` });
    } catch (error) {
        res.status(500).json({ error: 'Image generation failed', details: error.message });
    }
};

module.exports = { generateImage };
