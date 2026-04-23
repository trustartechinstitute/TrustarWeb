import { useState } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/src/hooks/useAuth";
import { User, Bell, Shield, Globe, HardDrive } from "lucide-react";
import { api } from "@/src/services/api";

export default function SettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    country: user?.country || "",
  });

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account preferences and platform configuration."
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 h-12 bg-white text-navy font-bold rounded-xl shadow-sm border border-surface-3">
            <User className="w-5 h-5 text-baby" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-text-secondary hover:bg-white rounded-xl">
            <Bell className="w-5 h-5" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-text-secondary hover:bg-white rounded-xl">
            <Shield className="w-5 h-5" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-text-secondary hover:bg-white rounded-xl">
            <Globe className="w-5 h-5" /> Language
          </Button>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <Card className="card bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-display font-bold text-navy">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Full Name</label>
                  <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="rounded-xl h-12 bg-surface-2 border-surface-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                  <Input value={profile.email} disabled className="rounded-xl h-12 bg-surface-2 border-surface-3 opacity-60" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Country</label>
                  <Input value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} className="rounded-xl h-12 bg-surface-2 border-surface-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Timezone</label>
                  <Input value={user?.timezone || "UTC"} disabled className="rounded-xl h-12 bg-surface-2 border-surface-3 opacity-60" />
                </div>
              </div>
              <Button className="bg-navy text-white hover:bg-navy2 font-bold px-8 h-12 rounded-xl">Save Changes</Button>
            </CardContent>
          </Card>

          {user?.role === 'admin' && (
             <Card className="card border-baby/20 bg-baby/5 overflow-hidden">
                <CardHeader className="bg-baby/10">
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-6 h-6 text-baby" />
                    <CardTitle className="text-xl font-display font-bold text-navy">Physical Delivery Overrides</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="p-6 bg-white/50 border border-baby/20 rounded-2xl">
                    <p className="text-sm font-medium text-navy mb-4">
                      Physical and hybrid delivery unlocks when you reach <span className="font-bold text-baby">20 enrolled students</span>.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Current Students: {user.coinBalance > 0 ? 6 : 0} / 20</span>
                      <Button disabled className="opacity-50">Enable Hybrid Features</Button>
                    </div>
                  </div>
                </CardContent>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
}
