import { SquareDashed } from "lucide-react";
export default function NoContent({ message, Icon, iconSize = 40 }) {
  return (
    <div className="mt-15 flex justify-center gap-2 text-2xl font-bold opacity-70 select-none">
      {Icon ? <Icon size={iconSize} /> : <SquareDashed size={iconSize} />}
      <div className="flex items-center">
        {message || "This page currently has no content!"}
      </div>
    </div>
  );
}
