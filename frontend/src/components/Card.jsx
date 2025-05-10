export default function Card({ children, classes }) {
  return (
    <div className={`w-fit p-4  py-1 rounded-md ${classes}`}>{children}</div>
  );
}
