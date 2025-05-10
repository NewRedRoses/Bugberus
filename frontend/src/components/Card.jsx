export default function Card({ children, classes }) {
  return <div className={`p-4  py-1 rounded-md ${classes}`}>{children}</div>;
}
