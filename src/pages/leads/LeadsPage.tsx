import { useState, useEffect } from "react";
import { PageHeader } from "@/src/components/common/PageHeader";
import { DataTable } from "@/src/components/common/DataTable";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { api } from "@/src/services/api";
import { Plus, MessageSquare, Phone, MoreVertical, UserPlus, CheckCircle2 } from "lucide-react";
import { buildLeadLink } from "@/src/utils/whatsapp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEnrolDialogOpen, setIsEnrolDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedCohortId, setSelectedCohortId] = useState("");

  useEffect(() => {
    async function load() {
      const [l, c] = await Promise.all([api.getLeads(), api.getCohorts()]);
      setLeads(l);
      setCohorts(c);
      setLoading(false);
    }
    load();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await api.updateLeadStatus(id, status);
    const l = await api.getLeads();
    setLeads([...l]);
  };

  const handleEnrolLead = async () => {
    if (!selectedLead || !selectedCohortId) return;
    try {
      await api.convertLeadToUser(selectedLead.id, selectedCohortId);
      const l = await api.getLeads();
      setLeads([...l]);
      setIsEnrolDialogOpen(false);
      setSelectedLead(null);
      setSelectedCohortId("");
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: "name", label: "Lead Name", render: (v: string, row: any) => (
      <div>
        <p className="font-bold text-navy">{v}</p>
        <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{row.email || 'No email'}</p>
      </div>
    )},
    { key: "country", label: "Country" },
    { key: "interestedTrack", label: "Interest" },
    { key: "childAge", label: "Age/Self" },
    { key: "status", label: "Status", render: (v: string) => <StatusBadge status={v} /> },
    { key: "createdAt", label: "Enquired On", render: (v: string) => new Date(v).toLocaleDateString() },
    { key: "actions", label: "", render: (_: any, row: any) => (
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-baby hover:bg-baby/10"
          onClick={() => window.open(buildLeadLink(row.phone, row.name), '_blank')}
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon" className="outline-none">
              <MoreVertical className="w-4 h-4" />
            </Button>
          } />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                setSelectedLead(row);
                setIsEnrolDialogOpen(true);
              }} className="text-baby font-bold">
                <UserPlus className="w-4 h-4 mr-2" />
                Enrol as Student
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'contacted')}>Mark as Contacted</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'lost')}>Mark as Lost</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  if (loading) return <div>Loading leads...</div>;

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Inbound Leads" 
        subtitle="Manage new enquiries from the landing page and social channels."
        actions={
          <Button className="bg-baby text-navy hover:bg-baby-dark font-bold rounded-xl px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Manual Lead
          </Button>
        }
      />

      <DataTable columns={columns} data={leads} />

      {/* Enrol Lead Dialog */}
      <Dialog open={isEnrolDialogOpen} onOpenChange={setIsEnrolDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden rounded-[2rem]">
          <DialogHeader className="p-8 bg-surface-2 border-b border-surface-3">
            <div className="w-12 h-12 bg-baby/20 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-baby" />
            </div>
            <DialogTitle className="text-2xl font-display font-bold text-navy">Confirm Enrollment</DialogTitle>
            <DialogDescription className="text-text-secondary font-medium">
              You are about to enrol <span className="text-navy font-bold">{selectedLead?.name}</span>. This will create their user account and enrolment record.
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Assign to Cohort</label>
              <Select onValueChange={setSelectedCohortId}>
                <SelectTrigger className="h-14 rounded-2xl bg-surface-2 border-surface-3 transition-all focus:bg-white outline-none">
                  <SelectValue placeholder="Select an active cohort" />
                </SelectTrigger>
                <SelectContent className="bg-white border-surface-3">
                  {cohorts.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name} ({c.schedule})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-navy/5 rounded-2xl">
              <p className="text-[11px] text-navy/70 font-medium leading-relaxed">
                <span className="font-bold">Pro Tip:</span> Ensure the lead has completed their Passion Test and paid their tuition before confirming.
              </p>
            </div>
          </div>

          <DialogFooter className="p-8 bg-surface-2 border-t border-surface-3 mt-0">
            <Button 
              onClick={handleEnrolLead}
              disabled={!selectedCohortId}
              className="w-full h-14 bg-baby hover:bg-baby-dark text-navy font-bold rounded-2xl shadow-xl shadow-baby/20 disabled:opacity-50"
            >
              Confirm Enrollment & Generate Credentials
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
