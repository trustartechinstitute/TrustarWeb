import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show on root dashboard or auth pages
  if (pathnames.length <= 2 || pathnames.includes("login")) return null;

  return (
    <nav className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
      <Link 
        to="/app/dashboard"
        className="flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-baby transition-colors uppercase tracking-widest whitespace-nowrap"
      >
        <Home className="w-3.5 h-3.5" />
        Dashboard
      </Link>

      {pathnames.slice(1).map((value, index) => {
        const last = index === pathnames.length - 2;
        const to = `/${pathnames.slice(0, index + 2).join("/")}`;

        // Standardize labels
        let label = value.replace(/-/g, " ");
        if (label.length > 20) label = label.substring(0, 17) + "...";

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
            {last ? (
              <span className="text-xs font-bold text-navy uppercase tracking-widest whitespace-nowrap bg-baby/10 text-navy px-2 py-1 rounded-lg">
                {label}
              </span>
            ) : (
              <Link
                to={to}
                className="text-xs font-bold text-text-muted hover:text-baby transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
