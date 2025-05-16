export default function Button({
  children,
  classNames = "h-fit rounded-md bg-slate-200 px-2 font-bold text-slate-700 hover:cursor-pointer",
  onClick,
}) {
  return (
    <button type="" className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
