const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

// Load a pre-trained GAN model (example: saved_model directory)
const MODEL_PATH = path.resolve(__dirname, '../../gan_model/saved_model');

let model;

const loadModel = async () => {
    if (!model) {
        model = await tf.loadGraphModel(`file://${MODEL_PATH}`);
        console.log('GAN model loaded successfully');
    }
};

// Function to generate an image using the GAN
const generateGANImage = async (prompt) => {
    await loadModel();

    // Generate random noise as input for the GAN
    const noise = tf.randomNormal([1, 100]); // Assuming input size for the GAN is 100

    // Run the noise through the GAN model
    const generatedImageTensor = model.predict(noise);

    // Convert tensor to image data
    const imageBuffer = await tf.node.encodeJpeg(generatedImageTensor.squeeze(), 'rgb');

    // Save the image to the output folder
    const outputImagePath = `output/${Date.now()}_image.jpg`;
    const fullPath = path.resolve(__dirname, '../../public', outputImagePath);

    fs.writeFileSync(fullPath, imageBuffer);

    return outputImagePath;
};

module.exports = { generateGANImage };
