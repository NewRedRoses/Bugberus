import { Textarea, Field, Description, Label } from "@headlessui/react";

export default function TextArea({
  className,
  defaultValue,
  title,
  description,
}) {
  return (
    <Field>
      {title && <Label>{title}</Label>}
      {description && <Description>{Description}</Description>}
      <Textarea
        name={title}
        className={className}
        defaultValue={defaultValue}
      ></Textarea>
    </Field>
  );
}
