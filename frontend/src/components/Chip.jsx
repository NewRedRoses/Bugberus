export default function Chip({ children, bgColorClass, textColorClass }) {
  return (
    <div
      className={`w-fit rounded-xl px-3 font-semibold ${bgColorClass} ${textColorClass}`}
    >
      {children}
    </div>
  );
}
