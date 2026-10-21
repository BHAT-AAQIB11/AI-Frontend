import type { JSX } from "react/jsx-runtime";
export default function HistoryListItem({ text }: { text: string }):JSX.Element {
  return (
    <li>
      <p>{text}</p>
    </li>
  );
}
