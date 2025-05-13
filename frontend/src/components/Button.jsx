export default function Button({ children, classNames, onClick }) {
  return (
    <button
      type=""
      className="px-2 border hover:cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
