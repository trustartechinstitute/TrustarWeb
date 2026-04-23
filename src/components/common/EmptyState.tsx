import * as React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, icon: Icon, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-2 border border-dashed border-surface-3 rounded-2xl">
      <div className="p-4 bg-white rounded-full shadow-sm mb-4 border border-surface-3">
        <Icon className="w-8 h-8 text-text-muted" />
      </div>
      <h3 className="text-xl font-display font-bold text-navy mb-2">{title}</h3>
      <p className="text-text-secondary max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
};
