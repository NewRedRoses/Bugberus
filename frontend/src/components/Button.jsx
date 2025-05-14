export default function Button({ children, classNames, onClick }) {
  return (
    <button
      type=""
      className="h-fit rounded-md bg-slate-200 px-2 font-bold text-slate-700 hover:cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
