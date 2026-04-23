import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, backUrl, onBack, actions }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      navigate(backUrl);
    }
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        {(backUrl || onBack) && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mt-1 border border-surface-3 transition-colors hover:bg-surface-2"
            onClick={handleBack}
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">{title}</h1>
          {subtitle && (
            <p className="text-text-secondary font-medium mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
