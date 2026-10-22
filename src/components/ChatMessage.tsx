import Markdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import type { chat } from "./ChatContainer";

export default function ChatMessage({ role, content }: chat) {
  return (
    <section className="messageBlock">
      {role === 'user' ? (
        <div className="userPrompt">{content}</div>
      ) : (
        <div className="response markdown-body">
          {content ? (
            <Markdown>{content}</Markdown>
          ) : (
            <div className="fetchingResponse">Fetching...</div>
          )}
        </div>
      )}
    </section>
  );
}
