import { Input as InputHeadless } from "@headlessui/react";

export default function Input({
  label,
  name,
  type = "text",
  onChange,
  value,
  className = "rounded border-2 border-slate-200 p-1",
}) {
  return (
    <InputHeadless
      name={name}
      type={type}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
}

{
  /* <div className="flex flex-col gap-2"> */
}
{
  /*   {label != undefined && ( */
}
{
  /*     <label htmlFor={label} className="font-medium"> */
}
{
  /*       {label} */
}
{
  /*     </label> */
}
{
  /*   )} */
}
{
  /*   <input */
}
{
  /*     type={type} */
}
{
  /*     name={name} */
}
{
  /*     id={label} */
}
{
  /*     value={value} */
}
{
  /*     className={inputClassNames} */
}
{
  /*     onChange={onChange} */
}
{
  /*   /> */
}
{
  /* </div> */
}
