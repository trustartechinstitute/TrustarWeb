import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { FileText, Play, Link as LinkIcon, Download, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { CoinBadge } from "@/src/components/common/CoinBadge";
import { useAuth } from "@/src/hooks/useAuth";
import { ROLES } from "@/src/utils/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, refreshUser } = useAuth();
  
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isUnlockDialogOpen, setIsUnlockDialogOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const r = await api.getResources();
      setResources(r);
      setLoading(false);
    }
    load();
  }, []);

  const handleUnlock = async () => {
    if (!selectedResource || !user) return;
    if ((user.coinBalance || 0) < selectedResource.coinCost) {
      alert("Insufficient Trustar Coins. Please contact your parent or admin to top up.");
      return;
    }

    try {
      // Mock unlock transaction
      // In a real app, this calls api.spendCoins(selectedResource.id)
      await refreshUser();
      alert(`Success! You have unlocked ${selectedResource.title}.`);
      setIsUnlockDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading resources...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Resource Library" 
        subtitle="Exclusive worksheets, guides, and templates for Trustar students."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(res => (
          <div key={res.id} className="card p-6 flex flex-col group hover:border-baby transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-surface-3 group-hover:bg-baby/10 transition-colors`}>
                {res.type === 'pdf' ? <FileText className="w-6 h-6 text-text-secondary group-hover:text-baby" /> : res.type === 'video' ? <Play className="w-6 h-6 text-text-secondary group-hover:text-baby" /> : <LinkIcon className="w-6 h-6 text-text-secondary group-hover:text-baby" />}
              </div>
              {res.tier === 'premium' && (
                <div className="px-2 py-1 bg-gold/10 text-gold rounded-lg border border-gold/20 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Premium</span>
                </div>
              )}
            </div>
            
            <h4 className="text-xl font-display font-bold text-navy mb-2">{res.title}</h4>
            <p className="text-sm text-text-secondary font-medium mb-8 flex-1">{res.description}</p>
            
            <div className="pt-6 border-t border-surface-3 flex items-center justify-between">
              {res.coinCost > 0 ? (
                <CoinBadge amount={res.coinCost} className="text-xs" />
              ) : (
                <span className="text-xs font-bold text-teal uppercase tracking-widest">Free</span>
              )}
              
              <Button 
                size="sm" 
                variant={res.tier === 'premium' && user?.role !== ROLES.ADMIN ? "outline" : "default"} 
                className="rounded-xl font-bold h-9 bg-baby text-navy hover:bg-baby-dark"
                onClick={() => {
                  if (res.tier === 'premium' && user?.role !== ROLES.ADMIN) {
                    setSelectedResource(res);
                    setIsUnlockDialogOpen(true);
                  } else {
                    window.open(res.url, '_blank text-navy hover:text-navy2');
                  }
                }}
              >
                {res.tier === 'premium' && user?.role !== ROLES.ADMIN ? "Unlock" : <><Download className="w-4 h-4 mr-2" /> Access</>}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isUnlockDialogOpen} onOpenChange={setIsUnlockDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden rounded-[2rem]">
          <DialogHeader className="p-8 bg-gold/5 border-b border-gold/10 text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-gold-dark" />
            </div>
            <DialogTitle className="text-2xl font-display font-bold text-navy uppercase tracking-tight">Unlock Premium Resource</DialogTitle>
            <DialogDescription className="text-navy/70 font-medium italic mt-2">
              "Invest in your craft. Own this tool permanently."
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 text-center space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Item to Unlock</p>
              <h3 className="text-xl font-display font-bold text-navy">{selectedResource?.title}</h3>
            </div>

            <div className="flex flex-col items-center gap-2 p-6 bg-surface-2 rounded-3xl border border-surface-3">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Price</p>
              <CoinBadge amount={selectedResource?.coinCost} className="text-xl !px-6 !py-3" />
              <p className="text-[10px] text-text-muted font-medium mt-2">Your current balance: <span className="text-navy font-bold">{user?.coinBalance || 0} Coins</span></p>
            </div>

            <div className="flex items-start gap-3 bg-teal/5 p-4 rounded-2xl text-left border border-teal/10">
              <ShieldCheck className="w-5 h-5 text-teal mt-0.5" />
              <p className="text-[11px] text-teal-700 font-medium leading-relaxed">
                By unlocking, this resource will be added to your permanent vault. You will retain access even after your cohort ends.
              </p>
            </div>
          </div>

          <DialogFooter className="p-8 bg-surface-2 border-t border-surface-3 mt-0">
            <div className="flex flex-col gap-3 w-full">
              <Button 
                onClick={handleUnlock}
                className="w-full h-14 bg-navy hover:bg-navy2 text-white font-bold rounded-2xl shadow-xl shadow-navy/20"
              >
                Confirm & Pay {selectedResource?.coinCost} Coins
              </Button>
              <Button variant="ghost" onClick={() => setIsUnlockDialogOpen(false)} className="text-text-muted font-bold h-10">
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
