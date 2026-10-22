import { useState, useRef } from "react";
import SideBarToggleBtn from "./SideBarToggleBtn";
import type { onClick } from "../App";
import type { MouseEvent, JSX } from "react";
import ChatMessage from "./ChatMessage";
import { getAIResponse } from "../request.js";
import { flushSync } from "react-dom";

export type chat = {
  role: "assistant" | "user";
  content: string;
};

export default function ChatContainer({
  onClick,
}: {
  onClick: onClick;
}): JSX.Element {
  const [chatArr, setChatArr] = useState<chat[]>([
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);

  const [promptText, setPromptText] = useState("");

  const chatRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!promptText) {
      return;
    }
    const nextArr: chat[] = [...chatArr, { role: "user", content: promptText }];
    flushSync(() => {
      setChatArr(nextArr);
    });
    if (chatRef.current?.lastElementChild) {
      chatRef.current.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
    setPromptText("");
    async function append() {
    const res = await getAIResponse(nextArr);
    const arr = [...nextArr, res.message];
    setChatArr(arr);
  }
    append();
  }

  const chat = chatArr.map(({ role, content }, i) => (
    <ChatMessage key={i} role={role} content={content} />
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
        <div className="chat" ref={chatRef}>
          {chat}
        </div>
        <form className="chatInputContainer">
          <input
            onChange={(e) => setPromptText(e.target.value)}
            value={promptText}
            className="chatInput"
            type="text"
            name="chat"
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
