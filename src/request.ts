import type { chat } from "./components/ChatContainer";

export async function getAIResponse(chatArr: chat[]) {
  const postData = {
    model: "qwen3b",
    messages: chatArr,
    stream: false,
  };
  try {
    const res = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
