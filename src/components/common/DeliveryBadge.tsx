import { Badge } from "@/components/ui/badge";
import { Globe, House, Repeat } from "lucide-react";

export const DeliveryBadge = ({ mode }: { mode: string }) => {
  const config: any = {
    online: { icon: Globe, label: "Online", className: "bg-baby/20 text-baby border-baby/30" },
    physical: { icon: House, label: "Physical", className: "bg-teal/20 text-teal border-teal/30" },
    hybrid: { icon: Repeat, label: "Hybrid", className: "bg-navy/20 text-navy border-navy/30" },
  };

  const { icon: Icon, label, className } = config[mode] || config.online;

  return (
    <Badge variant="outline" className={`flex items-center gap-1 font-medium ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};
