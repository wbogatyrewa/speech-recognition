import React from "react";
import MicrophoneIcon from "../Icons/MicrophoneIcon";

interface Props {
  turnOn: boolean;
  handleClick: () => void;
}

function MicrophoneButton({
  turnOn = false,
  handleClick = () => {},
}: Props): JSX.Element {
  return (
    <span
      style={{
        display: "block",
        width: "fit-content",
        cursor: "pointer",
        border: turnOn ? "1px solid blue" : "none",
      }}
      onClick={handleClick}
    >
      <MicrophoneIcon />
    </span>
  );
}

export default MicrophoneButton;
