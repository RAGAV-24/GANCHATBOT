import React, { useState } from 'react';

const InputBox = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    return (
        <div className="flex items-center gap-2 p-2 border-t bg-white">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Type a message..."
            />
            <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded">
                Send
            </button>
        </div>
    );
};

export default InputBox;
