import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  // the code is automatically stop when we speak reset and 
  const commands = [
    {
      command: "reset",
      callback: ({ resetTranscript }) => resetTranscript()
    },
    {
      command: 'open *',   // whatever website will we speak, that website will be open
      callback: (site) => {
        window.open('http://' + site);
      }
    },
    {
      // Change the background color of the browser whatever you speak
      command: 'change background color to *',
      callback: (color) => {
        document.body.style.backgroundColor = color;  // Fix: Corrected the property assignment
      }
    }
  ];

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='div1'>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default App;
