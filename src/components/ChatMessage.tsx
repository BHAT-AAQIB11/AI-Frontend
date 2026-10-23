import Markdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import type { chat } from "./ChatContainer";
import { useEffect, useRef } from "react";

type chatMessageProps = chat & {
  last: boolean;
};

export default function ChatMessage({
  role,
  content,
  loading,
  last,
}: chatMessageProps) {
  const elem = useRef<HTMLElement>(null);
  useEffect(() => {
    if (elem.current) {
      elem.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
  return (
    <section
      ref={elem}
      style={{ minHeight: last ? "75%" : "max-content" }}
      className="messageBlock"
    >
      {role === "user" ? (
        <div className="userPrompt">{content}</div>
      ) : (
        <div
          style={{ paddingBottom: last ? "3rem" : "0" }}
          className="response markdown-body"
        >
          {!loading ? (
            <Markdown>{content}</Markdown>
          ) : (
            last && (
              <div>
                <div className="fetchingResponse">Fetching...</div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
