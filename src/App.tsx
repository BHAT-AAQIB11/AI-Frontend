import "./App.css";
export default function App() {
  return (
    <>
      <div className="chatContainer">
        <button className="sidebarBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="3"
              y1="12"
              x2="20"
              y2="12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="3"
              y1="18"
              x2="15"
              y2="18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div className="chatInputContainer">
          <input className="chatInput" type="text" name="chat" />
          <button className="chatSubmitBtn" type="submit">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
