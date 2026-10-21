import type { JSX } from "react/jsx-runtime";
import type { onClick } from "../App";
import type { CSSProperties } from "react";
type SideBarToggleBtnProps = {
  style: CSSProperties;
  onClick: onClick
};

export default function SideBarToggleBtn({
  style,
  onClick,
}: SideBarToggleBtnProps): JSX.Element {
  function handleClick() {
    onClick();
  }
  return (
    <button onClick={handleClick} style={style} className="sidebarBtn">
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
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="12"
          x2="20"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="18"
          x2="15"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
