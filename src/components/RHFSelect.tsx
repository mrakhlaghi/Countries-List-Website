import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RHFSelectOptionType } from "../types";

type RHFSelectProps = {
  name: string;
  label?: string;
  searchParamsLabel?: string;
  register?: any;
  validationSchema?: any;
  options: RHFSelectOptionType[];
  wrapperClass?: string;
  labelClass?: string;
  selectClass?: string;
  required?: boolean;
};
function RHFSelect({
  name,
  label,
  searchParamsLabel,
  register,
  validationSchema,
  options,
  required = false,
  wrapperClass,
  labelClass,
  selectClass,
}: RHFSelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(options[0].value);

  useEffect(() => {
    if (searchParamsLabel) {
      if (
        searchParams.get(searchParamsLabel) == null ||
        searchParams.get(searchParamsLabel)?.includes("all")
      ) {
        searchParams.delete(searchParamsLabel);
        setSearchParams(searchParams);
        setValue("");
      } else {
        setValue(searchParams.get(searchParamsLabel) ?? "");
      }
    }
  }, []);

  // { value: string; label: string }
  const handleChange = (e: any) => {
    setValue(e.target.value);

    if (searchParamsLabel) {
      if (e.target.value == null || e.target.value.includes("all")) {
        searchParams.delete(searchParamsLabel);
        setSearchParams(searchParams);
        setValue("");
      } else {
        searchParams.set(searchParamsLabel, e.target.value);
        setSearchParams(searchParams);
      }
    }
    return e;
  };

  return (
    <div className={clsx("", wrapperClass)}>
      <label
        htmlFor={name}
        className={`block  text-xs sm:text-sm lg:text-base text-secondary-700 text-nowrap ${labelClass} `}
      >
        {label} {required && <span className="text-error">*</span>}
      </label>
      <select
        {...(register && { ...register(name, validationSchema) })}
        id={name}
        className={clsx(
          " w-full h-14 px-5 min-w-40 select shadow-sm border-transparent focus:border-[#7caff6]/60  focus:outline-offset-0 focus:outline-transparent  bg-white dark:bg-[#2B3743]  dark:hover:bg-[#303b45] text-xs  lg:text-sm  text-secondary-600  dark:text-secondary-700/80 ",
          selectClass
        )}
        value={value ?? ""}
        onChange={(e) => {
          handleChange(e);
          // register.onChange(e);
        }}
        // border-transparent   outline outline-offset-4  outline-neutral-700
      >
        {options.map((option: any) => (
          <option
            className="text-secondary-600/85"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default RHFSelect;
