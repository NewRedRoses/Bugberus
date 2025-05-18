import {
  Input as InputHeadless,
  Label,
  Field,
  Description,
} from "@headlessui/react";

export default function Input({
  label,
  name,
  type = "text",
  description,
  onChange,
  value,
  className = "rounded border-2 border-slate-200 p-1",
}) {
  return (
    <Field>
      <div className="pb-1 pl-1.5">
        <Label className="text-lg font-semibold">{label}</Label>
        {description && (
          <Description className="text-md font-medium opacity-70">
            {description}
          </Description>
        )}
      </div>
      <InputHeadless
        name={name}
        type={type}
        className={className}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}
