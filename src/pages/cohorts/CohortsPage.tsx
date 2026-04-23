import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { DataTable } from "@/src/components/common/DataTable";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { DeliveryBadge } from "@/src/components/common/DeliveryBadge";
import { api } from "@/src/services/api";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { ROLES } from "@/src/utils/constants";
import { formatSeats } from "@/src/utils/formatters";

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      const c = await api.getCohorts();
      setCohorts(c);
      setLoading(false);
    }
    load();
  }, []);

  const columns = [
    { key: "name", label: "Cohort Name", render: (v: string) => <p className="font-bold text-navy">{v}</p> },
    { key: "deliveryMode", label: "Delivery", render: (v: string) => <DeliveryBadge mode={v} /> },
    { key: "startDate", label: "Start Date", render: (v: string) => new Date(v).toLocaleDateString() },
    { key: "studentsCount", label: "Enrollment", render: (v: number, row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-surface-3 rounded-full overflow-hidden">
          <div className="h-full bg-teal" style={{ width: `${(v / row.capacity) * 100}%` }}></div>
        </div>
        <span className="text-[10px] font-bold text-text-muted">{v}/{row.capacity}</span>
      </div>
    )},
    { key: "status", label: "Status", render: (v: string) => <StatusBadge status={v} /> },
    { key: "id", label: "", render: (id: string) => (
      <Button variant="ghost" size="sm" onClick={() => navigate(`/app/cohorts/${id}`)}>
        Details <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    )}
  ];

  if (loading) return <div>Loading cohorts...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title={user?.role === ROLES.ADMIN ? "Cohorts Explorer" : "My Active Cohorts"}
        subtitle="Manage live sessions, track enrollments, and coordinate with instructors."
        actions={user?.role === ROLES.ADMIN && (
          <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6">
            <Plus className="w-4 h-4 mr-2" />
            Create Cohort
          </Button>
        )}
      />

      <DataTable columns={columns} data={cohorts} />
    </div>
  );
}
