import { useLayoutEffect, useRef, useState } from "react";
import SideBarToggleBtn from "./SideBarToggleBtn";
import type { onClick } from "../App";
import type { JSX, ChangeEvent, SyntheticEvent } from "react";
import ChatMessage from "./ChatMessage";
import { getAIResponse } from "../request.js";
import { flushSync } from "react-dom";
import ModelList from "./ModelList.js";

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
  const [model, setModel] = useState(
    localStorage?.getItem("selected-model") || "",
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const textArea = e.currentTarget;
    setPromptText(textArea.value);
  }
  function handleSubmit(
    e: SyntheticEvent<HTMLButtonElement | HTMLTextAreaElement>,
  ) {
    e.preventDefault();
    if (!model) {
      return;
    }
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
    const res = await getAIResponse(arr, model);
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

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [promptText]);

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
        <div className="modelListContainer">
          <ModelList
            model={model}
            setModel={(value) => {
              setModel(value);
            }}
          />
        </div>
      </div>
      <div className="chatBox">
        <div className="chat">{chat}</div>
        <form className="chatInputContainer">
          <textarea
            onChange={handleChange}
            className="chatInput"
            rows={1}
            cols={1}
            value={promptText}
            ref={textAreaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSubmit(e);
              }
            }}
            placeholder="(Ctrl + Enter to send)"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="chatSubmitBtn"
            type="submit"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
