import ChatContainer from "./components/ChatContainer";
import SideBar from "./components/SideBar";
import "./App.css";
import { useState } from "react";
import type { JSX } from "react";

export type onClick = () => void;

export default function App(): JSX.Element {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <>
      <SideBar
        onClick={() => setShowSidebar(false)}
        showSidebar={showSidebar}
      />
      <ChatContainer onClick={() => setShowSidebar(true)} />
    </>
  );
}
