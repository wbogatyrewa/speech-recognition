import React, { useState, useEffect } from "react";
import MicrophoneButton from "./components/MicrophoneButton/MicrophoneButton";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App(): JSX.Element {
  const [turnOn, setTurnOn] = useState<boolean>(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [interimText, setInterimText] = useState<string>("");
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
    // add random number (from 0 to 100) to every word
    if (transcript) {
      setInterimText(transcript);
      const newString = transcript.slice(interimText.length + 1);
      const randomNumberString = (newString || transcript)
        .split(" ")
        .map((word) => (word += Math.floor(Math.random() * 100)))
        .join(" ");

      setResultText(`${resultText} ${randomNumberString}`);
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
