import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');


  useEffect(() => {
    // Fetch the opening message when the component mounts
    const fetchOpeningMessage = async () => {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start: true })
      });

      const data = await response.json();
      const botMessage = { sender: 'Bot', text: data.response };
      setMessages([botMessage]);
    };

    fetchOpeningMessage();
  }, []);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { sender: 'User', text: userInput };
    setMessages([...messages, userMessage]);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      };

    const response = await fetch('http://127.0.0.1:5000/chat', requestOptions);

    const data = await response.json();
    const botMessage = { sender: 'Bot', text: data.response };
    setMessages([...messages, botMessage]);

    setUserInput('');
  };

  const endConversation = async () => {
    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ end: true, message: "Thank you" })
    });

    const data = await response.json();
    const botMessage = { sender: 'Bot', text: data.response };
    setMessages([...messages, botMessage]);
  };

  return (
    <div>
      <div id="messages">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter message..."
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={endConversation}>End Conversation</button>
    </div>
  );
};

export default Chat;
