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
}
