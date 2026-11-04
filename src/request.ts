import type { chat } from "./components/ChatContainer";

export interface ModelDetails {
  parent_model: string;
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;
  context_length: number;
  embedding_length: number;
  runner: string;
}

export interface ModelItem {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: ModelDetails;
  capabilities: string[];
}

export type ModelItemArray = ModelItem[];

export async function getAIResponse(chatArr: chat[], modelName: string) {
  const postData = {
    model: modelName,
    messages: chatArr,
    stream: false,
  };

  try {
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    return await data;
  } catch (error) {
    console.error(error);
  }
  console.log(chatArr);
}

export async function streamAIResponse(
  chatArr: chat[],
  modelName: string,
  chunk: (content: string) => void,
  signal: AbortSignal,
) {
  const postData = {
    model: modelName,
    messages: chatArr,
    stream: true,
  };
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      signal: signal,
    });
    if (!response.ok || !response.body) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      if (signal?.aborted) {
        throw new DOMException("The user aborted a request.", "AbortError");
      }
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");

      const lastLine = lines.pop();
      buffer = lastLine ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          const parsed = JSON.parse(trimmed);
          const content = parsed?.message?.content;
          if (content && !signal.aborted) {
            chunk(content);
          }
        } catch (error: any) {
          if (error?.name === "AbortError") {
            console.log("Fetch successfully aborted.");
            throw error;
          } else {
            console.error("Streaming error:", error);
            throw error;
          }
        }
      }
    }
  } catch (error: any) {
    console.error(error);
  }
}

/* streamAIResponse(
  [
    { role: "user", content: "hello ai" },
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
      loading: false,
    },
    { role: "user", content: "whats breadth first search" },
  ],
  "qwen3b",
); */

/*
[{"role":"user","content":"hello ai"},{"role":"assistant","content":"Hello! How can I assist you today?","loading":false},{"role":"user","content":"whats breadth first search"}] */
