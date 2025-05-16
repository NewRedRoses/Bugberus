export default function Input({
  label,
  name,
  type = "text",
  onChange,
  value,
  inputClassNames = "rounded border",
}) {
  return (
    <div className="flex flex-col gap-2">
      {label != undefined && (
        <label htmlFor={label} className="font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={label}
        value={value}
        className={inputClassNames}
        onChange={onChange}
      />
    </div>
  );
}
