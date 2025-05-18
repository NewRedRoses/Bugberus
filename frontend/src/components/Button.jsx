export default function Button({ children, uiType, classNames, onClick }) {
  switch (uiType) {
    default:
      return (
        <button
          className={`h-fit rounded-md border-2 border-slate-300 bg-slate-200 px-2 font-bold text-slate-700 hover:cursor-pointer ${classNames}`}
          onClick={onClick}
        >
          {children}
        </button>
      );
    case "custom":
      return (
        <button className={classNames} onClick={onClick}>
          {children}
        </button>
      );
  }
}
