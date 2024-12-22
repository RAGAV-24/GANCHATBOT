import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('https://ganchatbot.onrender.com/chat', { message: input });
      const botMessage = response.data.image_data
        ? {
            role: 'bot',
            content: (
              <div>
                <img
                  src={`data:image/png;base64,${response.data.image_data}`}
                  alt="Generated"
                  className="max-w-full rounded-lg"
                />
              </div>
            ),
          }
        : { role: 'bot', content: response.data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'bot', content: 'An error occurred while processing your request.' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-black text-white text-center py-4 shadow-md">
        <h1 className="text-xl bg-black font-bold">ROG CHATBOT</h1>
      </header>
      <div className="bg-gray-900 flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-md ${
              msg.role === 'user' ? 'bg-black text-white ml-auto' : 'bg-gray-300 text-black'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex p-4 bg-black border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 text-white text-bold bg-gray-500 px-4 py-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-white hover:text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
