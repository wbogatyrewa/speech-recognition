import React, { useState, useEffect } from "react";
import MicrophoneButton from "./components/MicrophoneButton/MicrophoneButton";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App(): JSX.Element {
  const [turnOn, setTurnOn] = useState<boolean>(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [resultText, setResultText] = useState<string>("");

  const handleMicrophoneClick = () => {
    setTurnOn(!turnOn);
  };

  const reset = () => {
    resetTranscript();
    setResultText("");
  };

  useEffect(() => {
    // start and stop listening
    if (turnOn) {
      SpeechRecognition.startListening({
        continuous: true,
      });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [turnOn]);

  useEffect(() => {
    // parse and add random number (from 0 to 100) to every word
    if (transcript) {
      const randomNumberString = transcript
        .split(" ")
        .map((word) => (word += Math.floor(Math.random() * 100)))
        .join(" ");

      setResultText(randomNumberString);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <MicrophoneButton turnOn={turnOn} handleClick={handleMicrophoneClick} />
      <p>{`Result: ${resultText}`}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
