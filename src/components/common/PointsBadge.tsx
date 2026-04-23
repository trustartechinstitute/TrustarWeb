import { Zap } from "lucide-react";
import { formatPoints } from "@/src/utils/formatters";

export const PointsBadge = ({ points, className = "" }: { points: number; className?: string }) => {
  return (
    <div className={`flex items-center gap-1.5 text-baby font-semibold ${className}`}>
      <Zap className="w-4 h-4 fill-current" />
      <span>{formatPoints(points)}</span>
    </div>
  );
};
