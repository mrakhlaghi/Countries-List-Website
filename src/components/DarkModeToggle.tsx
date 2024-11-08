import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";
import clsx from "clsx";
import { useState } from "react";

function DarkModeToggle({ className }: { className?: string }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "flex items-center gap-x-1  text-secondary-900",
        className
      )}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <HiOutlineSun className={clsx("w-5 h-5 " , isHovered ? "text-primary-800":"text-secondary-900 ")} />
      ) : (
        <HiOutlineMoon className={clsx("w-5 h-5 " , isHovered  ? "text-primary-800":"text-secondary-900 ")} />
      )}
      <span className={clsx("text-xs  sm:text-sm " , isHovered  ? "text-primary-800":"text-secondary-900 " )}>Dark Mode</span>
    </button>
  );
}
export default DarkModeToggle;
