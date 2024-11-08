import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IoIosSearch } from "react-icons/io";
import useDebounce from "../utils/useDebounce";
import { useSearchParams } from "react-router-dom";

interface ISearchInputProps {
  wrapperClassName?: string;
  className?: string;
  focusOnMounting?: boolean;
}

const ISearchInput = React.forwardRef<HTMLInputElement, ISearchInputProps>(
  ({ wrapperClassName, className, focusOnMounting }, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>(
      (searchParams.get("name") as string) || ""
    );

    const inputRef = ref as React.MutableRefObject<HTMLInputElement | null>;

    const debouncedSearchValue = useDebounce(searchValue, 1500);

    useEffect(() => {
      if (searchParams.get("name")) {
        setSearchValue(searchParams.get("name") as string);
      } else {
        setSearchValue("");
      }

      if (focusOnMounting && inputRef?.current) {
        inputRef.current.focus();
      }
    }, [focusOnMounting, searchParams, inputRef]);

    useEffect(() => {
      if (debouncedSearchValue === "" || debouncedSearchValue == null) {
        setSearchValue("");
        searchParams.delete("name");
        setSearchParams(searchParams);
      } else {
        setSearchValue(debouncedSearchValue);
        searchParams.set("name", debouncedSearchValue.toLowerCase().trim());
        setSearchParams(searchParams);
      }
    }, [debouncedSearchValue, searchParams, setSearchParams]);

    return (
      <div
        className={clsx(
          "relative flex justify-center items-center",
          wrapperClassName
        )}
      >
        <div
          className={clsx(
            "md:w-40 lg:w-64 h-8 rounded-md shadow-sm bg-white dark:bg-[#2B3743] dark:hover:bg-[#303b45] border border-transparent focus-within:border-[#7caff6]/60 flex justify-center items-center gap-x-1 focus:outline-none focus:border focus:shadow-white focus:shadow-2xl px-6 py-1.5",
            className
          )}
        >
          <IoIosSearch
            size={22}
            className="text-secondary-600 dark:text-secondary-700"
          />
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for a country..."
            className="text-sm md:text-base bg-transparent text-secondary-600 placeholder-secondary-400 dark:text-secondary-600/80 dark:placeholder-secondary-600/80 focus:outline-none ml-2 w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    );
  }
);

ISearchInput.displayName = "ISearchInput";

export default ISearchInput;
