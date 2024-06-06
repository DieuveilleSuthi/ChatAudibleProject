import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/completions',
        { prompt: question }
      );

      const answer = res.data.choices[0].text.trim();
      setResponse(answer);
      //await synthesizeSpeech(answer);
    } catch (error) {
      console.error(error);
    }
  };

  // const synthesizeSpeech = async (text) => {
  //   try {
  //     const res = await axios.post('http://localhost:5000/synthesize', { text }, {
  //       responseType: 'blob',
  //     });

  //     const audioUrl = URL.createObjectURL(new Blob([res.data], { type: 'audio/mp3' }));
  //     const audio = new Audio(audioUrl);
  //     audio.play();
  //   } catch (error) {
  //     console.error('Error synthesizing speech:', error);
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatGPT Audible</h1>
      </header>
      <main>
        <div className="response-container">
          <p>{response}</p>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Posez votre question"
          />
          <button onClick={handleSend}>Envoyer</button>
        </div>
      </main>
    </div>
  );
}

export default App;
