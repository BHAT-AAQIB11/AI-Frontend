import { useState } from "react";
import SideBarToggleBtn from "./SideBarToggleBtn";
import type { onClick } from "../App";
import type { MouseEvent, JSX } from "react";
import ChatMessage from "./ChatMessage";
import { getAIResponse } from "../request.js";
import { flushSync } from "react-dom";

export type chat = {
  role: "assistant" | "user";
  content: string;
  loading?: boolean;
};

export default function ChatContainer({
  onClick,
}: {
  onClick: onClick;
}): JSX.Element {
  const [chatArr, setChatArr] = useState<chat[]>([]);
  const [promptText, setPromptText] = useState("");

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!promptText) {
      return;
    }
    const nextArr: chat[] = [...chatArr, { role: "user", content: promptText }];
    const newChat: chat[] = [
      ...nextArr,
      { role: "assistant", content: " ", loading: true },
    ];
    flushSync(() => {
      setChatArr(newChat);
    });
    setPromptText("");
    append(nextArr);
  }

  async function append(arr: chat[]) {
    const res = await getAIResponse(arr);
    setChatArr([...arr, { ...res.message, loading: false }]);
  }

  const chat = chatArr.map(({ role, content, loading }, i) => {
    const isLastIndex = i === chatArr.length - 1;
    return (
      <ChatMessage
        key={i}
        role={role}
        loading={loading}
        last={isLastIndex}
        content={content}
      />
    );
  });

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
