import React, { useState } from 'react';
import './App.css';
import Chat from './Chat';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: query })
    // };

  //   const response = await fetch('http://127.0.0.1:5000/', requestOptions);
  //   const data = await response.json();

  //   setResponse(data.response);
  // };

  return (
      <>
      <div className="App">
        <header className="App-header">
          <h1>Chatbot GPT-3.5</h1>
          <Chat />
        </header>
      </div>
      </>
      
  );
}

export default App;
