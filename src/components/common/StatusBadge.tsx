import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    new: "bg-baby text-navy hover:bg-baby",
    contacted: "bg-navy2 text-white hover:bg-navy2",
    enrolled: "bg-teal text-white hover:bg-teal",
    lost: "bg-slate-400 text-white hover:bg-slate-400",
    active: "bg-teal text-white hover:bg-teal",
    upcoming: "bg-baby text-navy hover:bg-baby",
    completed: "bg-navy text-white hover:bg-navy",
  };

  return (
    <Badge className={styles[status] || ""}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
