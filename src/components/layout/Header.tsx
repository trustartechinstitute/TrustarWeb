import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, Menu, User, LogOut, Settings, LayoutDashboard } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-surface-3 flex items-center justify-between px-6 sticky top-0 z-30 w-full min-w-0">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden text-navy">
            <Menu className="w-6 h-6" />
          </Button>
        )}
        <div className="hidden md:flex items-center relative group">
          <Search className="absolute left-3 w-4 h-4 text-text-muted group-focus-within:text-baby transition-colors" />
          <Input 
            placeholder="Search lessons, tracks..." 
            className="w-64 pl-10 h-10 bg-surface-2 border-surface-3 rounded-xl focus:bg-white focus:ring-baby transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-text-secondary hover:text-navy">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-baby rounded-full border-2 border-white"></span>
        </Button>
        
        <div className="w-[1px] h-6 bg-surface-3 mx-2"></div>
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="flex items-center gap-3 pl-2 pr-1 h-12 rounded-full hover:bg-surface-2 group outline-none">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-navy leading-none mb-1 group-hover:text-baby transition-colors">{user?.name}</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-display font-bold border-2 border-white shadow-sm ring-1 ring-surface-3 overflow-hidden">
                {user?.name?.charAt(0) || <User className="w-5 h-5" />}
              </div>
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-2xl shadow-xl border-surface-3 bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-display font-bold text-navy px-3 py-2">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-surface-3 mx-1" />
              <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer focus:bg-baby/10 focus:text-navy gap-3" onClick={() => navigate("/app/dashboard")}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl px-3 py-2 cursor-pointer focus:bg-baby/10 focus:text-navy gap-3" onClick={() => navigate("/app/settings")}>
                <Settings className="w-4 h-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-surface-3 mx-1" />
              <DropdownMenuItem 
                onClick={logout}
                className="rounded-xl px-3 py-2 cursor-pointer focus:bg-red-50 focus:text-red-500 gap-3 text-red-600"
              >
                <LogOut className="w-4 h-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
