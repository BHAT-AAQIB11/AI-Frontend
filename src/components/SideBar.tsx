import SideBarToggleBtn from "./SideBarToggleBtn";
import type { onClick } from "../App";
type SideBarProps = {
  onClick: onClick;
  showSidebar: boolean;
};

export default function SideBar({ onClick, showSidebar }: SideBarProps) {
  return (
    <aside
      className="menu"
      style={{ translate: showSidebar ? "0% 0" : "-100% 0" }}
    >
      <SideBarToggleBtn onClick={onClick} style={{ right: "10px" }} />
      <div className="topContainer">
        <h1 className="menuHeading">AI Frontend</h1>
        <div className="newChatBtnContainer">
          <button className="newChatBtn">
            Chat
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M55.3 31.5a17.6 17.6 0 0 0 .7-4.9C56 14.7 43.9 5 29 5S2 14.7 2 26.6c0 6.1 3.1 11.5 8.2 15.5L4 54l17.6-6.6a33.3 33.3 0 0 0 7.4.8l3.5-.2" />
              <path d="M47 37v14m7-7H40" />
              <circle cx="47" cy="44" r="15" fill="none" />
            </svg>
          </button>
        </div>
      </div>
      <div className="chatHistory">
        <h2 className="historyTitle">History</h2>
        <ul className="historyList">
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
          <li>Hello AI</li>
        </ul>
      </div>
      {/*  <div className="bottomContainer">
          <button className="settingBtn">
            <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
        </div> */}
    </aside>
  );
}
