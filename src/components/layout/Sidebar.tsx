import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  UserSquare2, 
  ClipboardList, 
  Library, 
  Trophy, 
  Wallet, 
  Building2, 
  Settings,
  X,
  LogOut,
  FileCheck
} from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { ROLES } from "@/src/utils/constants";

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

export default function Sidebar({ onClose, className = "" }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: any = {
    [ROLES.ADMIN]: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
      { label: "Tracks", icon: Map, path: "/app/tracks" },
      { label: "Cohorts", icon: Users, path: "/app/cohorts" },
      { label: "Submissions", icon: FileCheck, path: "/app/submissions" },
      { label: "Students", icon: UserSquare2, path: "/app/students" },
      { label: "Leads", icon: ClipboardList, path: "/app/leads" },
      { label: "Resources", icon: Library, path: "/app/resources" },
      { label: "Leaderboard", icon: Trophy, path: "/app/leaderboard" },
      { label: "Organizations", icon: Building2, path: "/app/organizations" },
      { label: "Wallet", icon: Wallet, path: "/app/wallet" },
      { label: "Settings", icon: Settings, path: "/app/settings" },
    ],
    [ROLES.STUDENT]: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
      { label: "My Tracks", icon: Map, path: "/app/tracks" },
      { label: "My Cohorts", icon: Users, path: "/app/cohorts" },
      { label: "Resources", icon: Library, path: "/app/resources" },
      { label: "Leaderboard", icon: Trophy, path: "/app/leaderboard" },
      ...(user?.studentType === 'independent' ? [{ label: "Wallet", icon: Wallet, path: "/app/wallet" }] : []),
      { label: "Settings", icon: Settings, path: "/app/settings" },
    ],
    [ROLES.PARENT]: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
      { label: "My Children", icon: UserSquare2, path: "/app/dashboard" },
      { label: "Wallet", icon: Wallet, path: "/app/wallet" },
      { label: "Settings", icon: Settings, path: "/app/settings" },
    ]
  };

  const navItems = menuItems[user?.role || ""] || [];

  return (
    <div className={`h-full bg-navy text-white p-6 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/app/dashboard")}>
          <div className="w-8 h-8 rounded-full bg-baby flex items-center justify-center font-display font-bold text-navy">T</div>
          <span className="font-display font-bold text-xl tracking-tighter capitalize">TRUSTAR</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-white hover:bg-white/10">
            <X className="w-6 h-6" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item: any) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 h-12 rounded-xl transition-all ${
                isActive ? "bg-baby text-navy hover:bg-baby shadow-lg shadow-baby/20 font-bold" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => {
                navigate(item.path);
                if (onClose) onClose();
              }}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-navy" : "text-white/40 group-hover:text-baby"}`} />
              <span className="text-sm">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10 mt-auto flex flex-col gap-4">
        <Button 
          variant="ghost" 
          onClick={logout}
          className="w-full justify-start gap-3 h-12 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-bold"
        >
          <LogOut className="w-5 h-5 opacity-70" />
          <span className="text-sm">Log out</span>
        </Button>
        <p className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-bold text-center">Trustar v1.0.4</p>
      </div>
    </div>
  );
}
