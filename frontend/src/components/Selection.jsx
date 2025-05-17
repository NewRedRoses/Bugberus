import { Select } from "@headlessui/react";

export default function Selection({
  name = "selection",
  value,
  onChange,
  ariaLabel = "Selection of multiple items",
  options = [
    { value: "first", label: "First" },
    { value: "second", label: "Second" },
  ],
  selectionClasses = "bg-slate-500 text-slate-100 rounded-2xl w-fit px-3 select-none",
}) {
  return (
    <Select
      name={name}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      className={`${selectionClasses} `}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </Select>
  );
}
