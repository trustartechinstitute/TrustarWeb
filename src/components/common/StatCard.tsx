import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
}

export const StatCard = ({ label, value, icon: Icon, description, trend }: StatCardProps) => {
  return (
    <Card className="card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-secondary">{label}</p>
            <h3 className="text-2xl font-display font-bold mt-1 text-navy">{value}</h3>
            {description && (
              <p className="text-xs text-text-muted mt-1">{description}</p>
            )}
            {trend && (
              <p className="text-xs text-teal mt-1 font-medium">{trend}</p>
            )}
          </div>
          <div className="p-3 bg-baby/10 rounded-lg">
            <Icon className="w-6 h-6 text-baby" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
