export default function Card({ children, classes }) {
  return <div className={`rounded-md p-4 ${classes}`}>{children}</div>;
}
