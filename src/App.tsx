import ChatContainer from "./components/ChatContainer";
import SideBar from "./components/SideBar";
import "./App.css";
import { useState } from "react";
import type { JSX } from "react";

export type onClick = () => void;

export type chat = {
  role: "assistant" | "user";
  content: string;
  loading?: boolean;
};

export type chatObj = {
  id: string;
  chatArr: chat[];
};

export default function App(): JSX.Element {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string>("0");

  const chatHistory = getChatHistory();

  function getChatHistory() {
    const stored = localStorage.getItem("chatHistory");
    if (!stored) {
      console.log("added history");
      localStorage.setItem(
        "chatHistory",
        JSON.stringify([{ id: `0`, chatArr: [] }]),
      );
      return [];
    }
    const history = JSON.parse(stored);
    return history;
  }
  return (
    <>
      <SideBar
        onClick={() => setShowSidebar(false)}
        showSidebar={showSidebar}
        setSelectedChatId={setSelectedChatId}
        chatHistory={chatHistory}
      />
      <ChatContainer
        onClick={() => setShowSidebar(true)}
        selectedChatId={selectedChatId}
        chatHistory={chatHistory}
      />
    </>
  );
}
