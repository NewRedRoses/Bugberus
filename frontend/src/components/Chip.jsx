export default function Chip({
  children,
  bgColorClass,
  textColorClass,
  classNames,
  onClick,
}) {
  return (
    <div
      className={`flex w-fit items-center rounded-xl px-3 font-semibold ${bgColorClass} ${textColorClass} ${classNames}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
