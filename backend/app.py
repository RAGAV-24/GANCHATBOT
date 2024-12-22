
import os
import torch
import base64
from io import BytesIO
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
from transformers import pipeline
from PIL import Image
import ngrok
import uvicorn
import nest_asyncio

# To handle async issues in Colab
nest_asyncio.apply()

# Configuration Class
class CFG:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    seed = 42
    generator = torch.Generator(device).manual_seed(seed)
    image_gen_steps = 35
    image_gen_model_id = "stabilityai/stable-diffusion-2"
    image_gen_size = (400, 400)
    image_gen_guidance_scale = 9
    prompt_gen_model_id = "gpt2"
    prompt_max_length = 12

# Initialize FastAPI
app = FastAPI()

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
image_gen_model = StableDiffusionPipeline.from_pretrained(
    CFG.image_gen_model_id, torch_dtype=torch.float16, variant='fp16'
).to(CFG.device)

description_model = pipeline("text-generation", model=CFG.prompt_gen_model_id)

# Setup ngrok
ngrok.set_auth_token("2jNrP5c8Akn7FDtT0djxzDfOoPR_41QrMxDiouUoygiH8V5up")  # Replace with your ngrok auth token
listener = ngrok.forward("127.0.0.1:5000", authtoken_from_env=True, domain="falcon-inspired-especially.ngrok-free.app")

# Pydantic model for the request body
class ImageRequest(BaseModel):
    prompt: str

# Route to generate image and description
@app.post("/generate_image_and_description")
async def generate_image_and_description(request: ImageRequest):
    prompt = request.prompt

    # Generate the image
    image = image_gen_model(prompt, num_inference_steps=CFG.image_gen_steps, guidance_scale=CFG.image_gen_guidance_scale).images[0]

    # Resize image
    image = image.resize(CFG.image_gen_size, Image.LANCZOS)

    # Convert image to base64 string
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    # Generate description
    description_prompt = f"Describe the following image: {prompt}"
    description = description_model(description_prompt, max_length=50, num_return_sequences=1)[0]['generated_text']

    # Return the image as base64 string and the description
    return {"image": img_str, "description": description}

if __name__ == "__main__":
    # Start ngrok to expose the FastAPI app to the web
    public_url = ngrok.connect(5000)
    print(f"Public URL: {public_url}")

    # Run the FastAPI app with uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
