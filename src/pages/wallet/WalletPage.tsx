import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { DataTable } from "@/src/components/common/DataTable";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownRight, Coins, Plus } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { formatDate, formatCoins } from "@/src/utils/formatters";

export default function WalletPage() {
  const { user } = useAuth();
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const t = await api.getTransactionsByUserId(user.id);
      setTxs(t);
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) return <div>Loading wallet...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Family Wallet" 
        subtitle="Manage your Trustar coin balance and digital asset purchases."
      />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 card p-8 bg-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-baby/10 rounded-full translate-x-12 -translate-y-12"></div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-baby mb-4">Total Balance</p>
          <div className="flex items-center gap-3 mb-8">
            <Coins className="w-10 h-10 text-gold" />
            <h3 className="text-5xl font-display font-bold text-white">{user?.coinBalance || 0}</h3>
          </div>
          <Button className="w-full bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl h-14">
            <Plus className="w-4 h-4 mr-2" /> Top Up Coins
          </Button>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-display font-bold text-navy flex items-center gap-2">
            <Wallet className="w-5 h-5 text-baby" />
            Transaction History
          </h3>
          <DataTable 
            columns={[
              { key: "type", label: "Type", render: (v) => (
                v === 'credit' ? <div className="p-2 bg-teal/10 rounded-lg w-fit"><ArrowUpRight className="w-4 h-4 text-teal" /></div> : <div className="p-2 bg-red-50 rounded-lg w-fit"><ArrowDownRight className="w-4 h-4 text-red-500" /></div>
              )},
              { key: "description", label: "Description", render: (v) => <span className="font-bold text-navy">{v}</span> },
              { key: "createdAt", label: "Date", render: (v) => formatDate(v) },
              { key: "amount", label: "Amount", render: (v, row) => (
                <span className={`font-bold ${row.type === 'credit' ? 'text-teal' : 'text-red-500'}`}>
                  {row.type === 'credit' ? '+' : '-'}{formatCoins(v)}
                </span>
              )}
            ]}
            data={txs}
          />
        </div>
      </div>
    </div>
  );
}
