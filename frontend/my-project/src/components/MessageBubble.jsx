import React from 'react';

const MessageBubble = ({ sender, text, imageUrl }) => {
    const isUser = sender === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className="text-white h-100">This is a Image Generation Chatbot</div>
            <div className={`p-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                {text && <p>{text}</p>}
                {imageUrl && <img src={imageUrl} alt="Generated" className="mt-2 rounded-lg" />}
            </div>
        </div>
    );
};

export default MessageBubble;
