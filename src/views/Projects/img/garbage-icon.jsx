import React from "react";
import { ThemeContext } from "../../../Contexts/ThemeContext";
import { useContext } from "react";

export default function GarbageIcon() {
  const { theme } = useContext(ThemeContext);
  return (
    <svg
      fill={theme.textColor}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 4 48 48">
      <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z" />
    </svg>
  );
}
