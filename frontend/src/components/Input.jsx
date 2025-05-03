export default function Input(props) {
  const { label } = props;
  return (
    <div className="p-2 flex flex-col gap-2">
      <label htmlFor={label} className="font-medium">
        {label}
      </label>
      <input type="text" id={label} className="border rounded" />
    </div>
  );
}
