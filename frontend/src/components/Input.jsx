export default function Input({ label, name, type, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {label != undefined && (
        <label htmlFor={label} className="font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={label}
        className="w-1/3 rounded border"
        onChange={onChange}
      />
    </div>
  );
}
