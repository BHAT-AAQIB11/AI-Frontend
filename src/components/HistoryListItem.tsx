import type { JSX } from "react/jsx-runtime";
export default function HistoryListItem({
  text,
  onClick,
  id
}: {
  text: string;
  onClick: (id: string) => void;
  id: string;
}): JSX.Element {
  return (
    <li onClick={() => onClick(id)}>
      <p>{text}</p>
    </li>
  );
}
