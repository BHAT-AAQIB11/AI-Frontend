import { useState, type SyntheticEvent, useRef } from "react";
import SideBarToggleBtn from "./SideBarToggleBtn";
import type { onClick } from "../App";
import type { JSX } from "react";
import ChatMessage from "./ChatMessage";
import { exampleMk, getAIResponse } from "../request.js";

let chatId = 0;

export default function ChatContainer({
  onClick,
}: {
  onClick: onClick;
}): JSX.Element {
  const [chatGroup, setChatGroup] = useState([
    { id: chatId++, prompt: "Hello", response: exampleMk },
    { id: chatId++, prompt: "Hello", response: exampleMk },
  ]);
  const [promptText, setPromptText] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    getAIResponse(promptText);
  }

  const chat = chatGroup.map(({ id, prompt, response }) => (
    <ChatMessage key={id} userPrompt={prompt} response={response} />
  ));
  return (
    <div className="chatContainer">
      <div className="sidebarBtnContainer">
        <SideBarToggleBtn
          onClick={onClick}
          style={{
            width: "40px",
            aspectRatio: "1",
            borderRadius: "50%",
            border: "1px solid",
            background: "var(--BG-COLOR)",
            color: "var(--TEXT-COLOR)",
            display: "grid",
            placeItems: "center",
          }}
        />
      </div>
      <div className="chatBox">
        <div className="chat">{chat}</div>
        <form className="chatInputContainer">
          <input
            onChange={(e) => setPromptText(e.target.value)}
            value={promptText}
            className="chatInput"
            type="text"
            name="chat"
            ref={inputRef}
          />
          <button
            onClick={handleSubmit}
            className="chatSubmitBtn"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
