import clsx from "clsx";

function IButton({
  className = "",
  children = "",
  title,
  type,
  onclick,
}: {
  className?: string;
  children?: any;
  title: any;
  type?: any;
  onclick?: any;
}) {
  return (
    <button
      className={clsx("w-full md:w-fit flex justify-center items-center px-2 py-1 border border-transparent text-xs md:text-sm transition-all duration-300 rounded-md light-surround-shadow text-center    focus:outline-none" , className)}
      type={type}
      onClick={onclick}
     
      // style={{boxShadow:" 12px 0 15px -4px rgba(31, 73, 125, 0.8), -12px 0 8px -4px rgba(31, 73, 125, 0.8)"}}
    >
      {children}
      {title}
    </button>
  );
}

export default IButton;
