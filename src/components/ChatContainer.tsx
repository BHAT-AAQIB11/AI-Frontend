import { useState, type SyntheticEvent } from "react";
import SideBarToggleBtn from "./SideBarToggleBtn";
import type { onClick } from "../App";
import type { JSX } from "react";
export default function ChatContainer({
  onClick,
}: {
  onClick: onClick;
}): JSX.Element {
  const [promptText, setPromptText] = useState("");
  function handleClick(e: SyntheticEvent) {
    e.preventDefault();
  }
  return (
    <div className="chatContainer">
      <SideBarToggleBtn onClick={onClick} style={{ left: "10px" }} />
      <div className="chatInputContainer">
        <input
          onChange={(e) => setPromptText(e.target.value)}
          value={promptText}
          className="chatInput"
          type="text"
          name="chat"
        />
        <button onClick={handleClick} className="chatSubmitBtn" type="submit">
          Send
        </button>
      </div>
    </div>
  );
}
