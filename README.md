# CHATBOT
 

# Chatbot with Image Generation (Frontend and Backend)

This project is a chatbot application with an image generation feature. The user can input a message, and the bot will respond with either text or a generated image based on the input. The backend uses the **Hugging Face API** for image generation and the **Flask** framework for handling API requests. The frontend is built using **React** and deployed on **Vercel**, while the backend is deployed on **Render**.

## Features

- User can interact with the chatbot via a simple chat interface.
- The chatbot can generate images based on user input using the **Stable Diffusion** model from **Hugging Face**.
- The backend is built using **Flask** and communicates with the Hugging Face API to generate images.
- The frontend is built using **React** and deployed on **Vercel**.
- The app provides a user-friendly interface for chatting and downloading the generated image.

## Technologies Used

### Frontend
- **React** (with hooks)
- **Tailwind CSS** (for styling)
- **Axios** (for making HTTP requests to the backend)
- **Vercel** (for deployment)

### Backend
- **Flask** (Python web framework)
- **Hugging Face API** (for image generation using the Stable Diffusion model)
- **Render** (for backend deployment)
- **CORS** (to handle cross-origin requests)

## Deployment

### Frontend Deployment (Vercel)

1. Clone this repository.
2. Push your code to a GitHub repository (if not already done).
3. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
4. Create a new project by importing the repository from GitHub.
5. Vercel automatically detects the project framework (React) and configures the build settings.
6. Deploy the project.
7. After successful deployment, your frontend app will be live on a URL provided by Vercel.

### Backend Deployment (Render)

1. Clone this repository.
2. Push the backend folder to a GitHub repository.
3. Sign up or log in to [Render](https://render.com/).
4. Create a new Web Service and connect it to your GitHub repository.
5. Set up the environment variables, such as the Hugging Face API key.
6. Configure the build and start commands for your backend (e.g., `pip install -r requirements.txt` and `python app.py`).
7. Deploy the backend.
8. Your backend will be live, and you can access it via the Render-provided URL.

## Setting up Environment Variables

### Frontend
- Add the backend API URL (e.g., `REACT_APP_API_URL=http://localhost:5000`) to your `.env` file for the frontend, or set it directly in Vercel's dashboard.

### Backend
- In Render, set the following environment variables:
  - **HF_API_KEY**: Your Hugging Face API key (for image generation).
  - **API_URL**: The Hugging Face API URL for the model you are using.

## Running Locally

### Backend
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
5. Your backend will be available at `http://localhost:5000`.

### Frontend
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Your frontend will be available at `http://localhost:3000`.

## API Documentation

### Chat Endpoint
- **URL**: `/chat`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "message": "Your message here"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Generated image or text response",
    "image_url": "URL to the generated image (if applicable)"
  }
  ```

### Image Endpoint
- **URL**: `/image/<image_path>`
- **Method**: `GET`
- **Response**: Returns the generated image file.

## Troubleshooting

- **CORS Issues**: Make sure your backend is correctly configured to allow cross-origin requests from your frontend domain (if deployed).
- **API Errors**: If the Hugging Face API gives an error, ensure your API key is correct and that you have access to the model.
- **Deployment Errors**: Ensure that your environment variables are correctly set in both the frontend and backend deployments.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
