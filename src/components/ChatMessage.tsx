import Markdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
type ChatMessageProps = {
  userPrompt: string;
  response: string;
};

export default function ChatMessage({
  userPrompt,
  response,
}: ChatMessageProps) {
  return (
    <section className="messageBlock">
      <div className="userPrompt">{userPrompt}</div>
      <div className="response markdown-body">
        {response ? <Markdown>{response}</Markdown> : <div className="fetchingResponse">Fetching...</div>}
      </div>
    </section>
  );
}
