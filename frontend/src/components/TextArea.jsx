import { Textarea, Field, Description, Label } from "@headlessui/react";

export default function TextArea({
  textareaClasses,
  defaultValue,
  label,
  description,
  labelClasses,
  descriptionClasses,
  onChange,
}) {
  return (
    <Field>
      {label && <Label className={labelClasses}>{label}</Label>}
      {description && (
        <Description className={descriptionClasses}>{description}</Description>
      )}
      <Textarea
        name={label}
        className={textareaClasses}
        defaultValue={defaultValue}
        onChange={onChange}
      ></Textarea>
    </Field>
  );
}
