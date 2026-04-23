import { Coins } from "lucide-react";
import { formatCoins } from "@/src/utils/formatters";

export const CoinBadge = ({ amount, className = "" }: { amount: number; className?: string }) => {
  return (
    <div className={`flex items-center gap-1.5 text-gold font-semibold ${className}`}>
      <Coins className="w-4 h-4" />
      <span>{formatCoins(amount)}</span>
    </div>
  );
};
