import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (text) => {
        setMessages([...messages, { sender: 'user', text }]);

        // API call to generate image
        const response = await fetch('http://localhost:5000/api/images/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: text }),
        });
        const data = await response.json();

        if (data.imageUrl) {
            setMessages([...messages, { sender: 'user', text }, { sender: 'bot', imageUrl: data.imageUrl }]);
        } else {
            setMessages([...messages, { sender: 'user', text }, { sender: 'bot', text: 'Error generating image.' }]);
        }
    };

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} sender={msg.sender} text={msg.text} imageUrl={msg.imageUrl} />
                ))}
            </div>
            <InputBox onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatInterface;
