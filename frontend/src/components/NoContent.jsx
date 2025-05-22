import { SquareDashed } from "lucide-react";
export default function NoContent({ message, Icon, title, iconSize = 50 }) {
  return (
    <div className="mt-15 flex items-center justify-center gap-2 font-bold opacity-60 select-none">
      <div className="flex items-center">
        {Icon ? <Icon size={iconSize} /> : <SquareDashed size={iconSize} />}
      </div>
      <div className="flex flex-col items-start">
        {title && <h1 className="text-3xl">{title}</h1>}
        <p className="text-lg">
          {message || "This page currently has no content!"}
        </p>
      </div>
    </div>
  );
}
