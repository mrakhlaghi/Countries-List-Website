import { useState } from "react";
import clsx from "clsx";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  // const { isLoading } = useUser();
  const [isLoading] = useState(false);
  // const size = useResponsiveWidth();

  return (
    // <div className="  px-5 md:px-8 rounded-lg ">
    <div className="  px-2 sm:px-5 md:px-8   absolute w-full  bg-[#FAFAFA] dark:bg-[#2B3743] shadow-md  z-20 ">
      <div
        className={clsx(
          " flex justify-between items-center gap-x-8 container 2xl:max-w-6xl h-16  ",
          isLoading && "blur-sm opacity-50"
        )}
      >
        <div className=" flex justify-start items-center gap-x-6  text-black dark:text-white text-sm text-nowrap  lg:text-xl font-bold">
          Where in the world ?
        </div>

        <DarkModeToggle />
      </div>
    </div>
  );
}
export default Header;
