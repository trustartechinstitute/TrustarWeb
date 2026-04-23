import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { DataTable } from "@/src/components/common/DataTable";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Mail, Phone, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/src/components/common/StatusBadge";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const o = await api.getOrganizations();
      setOrgs(o);
      setLoading(false);
    }
    load();
  }, []);

  const columns = [
    { key: "name", label: "Organization", render: (v: string) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-navy2/5 flex items-center justify-center text-navy font-bold">
          <Building2 className="w-5 h-5 opacity-20" />
        </div>
        <p className="font-bold text-navy">{v}</p>
      </div>
    )},
    { key: "contactPerson", label: "Contact Person" },
    { key: "country", label: "Region", render: (_: any, row: any) => `${row.city}, ${row.country}` },
    { key: "status", label: "Status", render: (v: string) => <StatusBadge status={v} /> },
    { key: "enrolledStudentCount", label: "Students", render: (v: number) => <span className="font-bold">{v}</span> },
    { key: "actions", label: "", render: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><Mail className="w-4 h-4 text-text-secondary" /></Button>
        <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4 text-text-secondary" /></Button>
      </div>
    )}
  ];

  if (loading) return <div>Loading organizations...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Institutional Partners" 
        subtitle="Manage B2B relationships with schools and educational organizations."
        actions={
          <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
          </Button>
        }
      />

      <DataTable columns={columns} data={orgs} />
    </div>
  );
}
