import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Eye,
  Pencil,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ApplicationFilterModal, FilterValues } from "@/components/applications/ApplicationFilterModal";
import { ColumnToggle, ColumnVisibility, defaultColumnVisibility } from "@/components/applications/ColumnToggle";
import { mockApplications } from "@/data/mockApplications";
import {
  Application,
  JOB_TYPE_OPTIONS,
  WORK_SYSTEM_OPTIONS,
  STATUS_OPTIONS,
  RESULT_STATUS_OPTIONS,
} from "@/types/application";
import { cn } from "@/lib/utils";

type SortField = "date" | "created_at" | "updated_at" | "company_name" | "position" | "status" | "result_status";
type SortOrder = "asc" | "desc";

export default function Applications() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          app.company_name.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.job_source.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.job_type) {
      result = result.filter((app) => app.job_type === filters.job_type);
    }
    if (filters.work_system) {
      result = result.filter((app) => app.work_system === filters.work_system);
    }
    if (filters.status) {
      result = result.filter((app) => app.status === filters.status);
    }
    if (filters.result_status) {
      result = result.filter((app) => app.result_status === filters.result_status);
    }
    if (filters.dateFrom) {
      result = result.filter((app) => new Date(app.date) >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter((app) => new Date(app.date) <= filters.dateTo!);
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return 0;
      });
    }

    return result;
  }, [applications, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedApplications.length / perPage);
  const paginatedApplications = filteredAndSortedApplications.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const updateApplication = (id: string, field: keyof Application, value: any) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, [field]: value, updated_at: new Date().toISOString() } : app
      )
    );
  };

  const handleDelete = (id: string) => {
    setApplicationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (applicationToDelete) {
      setApplications((prev) => prev.filter((app) => app.id !== applicationToDelete));
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  const EditableCell = ({
    app,
    field,
    type = "text",
  }: {
    app: Application;
    field: keyof Application;
    type?: "text" | "number" | "select";
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(app[field]);

    const handleBlur = () => {
      setIsEditing(false);
      if (value !== app[field]) {
        updateApplication(app.id, field, value);
      }
    };

    if (type === "select" && (field === "job_type" || field === "work_system" || field === "status" || field === "result_status")) {
      const options = 
        field === "job_type" ? JOB_TYPE_OPTIONS :
        field === "work_system" ? WORK_SYSTEM_OPTIONS :
        field === "status" ? STATUS_OPTIONS :
        RESULT_STATUS_OPTIONS;

      return (
        <Select
          value={app[field] as string}
          onValueChange={(val) => updateApplication(app.id, field, val)}
        >
          <SelectTrigger className="h-8 w-auto min-w-[100px] text-[14px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-50 bg-popover">
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (isEditing) {
      return (
        <Input
          type={type}
          value={value as string}
          onChange={(e) => setValue(type === "number" ? Number(e.target.value) : e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
          className="h-8 w-auto min-w-[100px] text-[14px]"
        />
      );
    }

    return (
      <span
        className="cursor-pointer hover:bg-muted px-2 py-1 rounded text-[14px]"
        onClick={() => setIsEditing(true)}
      >
        {String(app[field]) || "-"}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Lamaran Kerja"
        subtitle="Kelola dan pantau semua lamaran kerja Anda."
      />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari perusahaan, posisi, sumber, lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setFilterModalOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <ColumnToggle visibility={columnVisibility} onVisibilityChange={setColumnVisibility} />
          <Button size="sm" onClick={() => navigate("/applications/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Lamaran
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columnVisibility.company_name && (
                  <TableHead>
                    <SortableHeader field="company_name">PERUSAHAAN</SortableHeader>
                  </TableHead>
                )}
                {columnVisibility.date && (
                  <TableHead>
                    <SortableHeader field="date">TANGGAL</SortableHeader>
                  </TableHead>
                )}
                {columnVisibility.position && (
                  <TableHead>
                    <SortableHeader field="position">POSISI</SortableHeader>
                  </TableHead>
                )}
                {columnVisibility.job_source && <TableHead>SUMBER</TableHead>}
                {columnVisibility.job_type && <TableHead>TIPE</TableHead>}
                {columnVisibility.work_system && <TableHead>SISTEM</TableHead>}
                {columnVisibility.salary_min && <TableHead>GAJI MIN</TableHead>}
                {columnVisibility.salary_max && <TableHead>GAJI MAX</TableHead>}
                {columnVisibility.location && <TableHead>LOKASI</TableHead>}
                {columnVisibility.status && (
                  <TableHead>
                    <SortableHeader field="status">STATUS</SortableHeader>
                  </TableHead>
                )}
                {columnVisibility.result_status && (
                  <TableHead>
                    <SortableHeader field="result_status">HASIL</SortableHeader>
                  </TableHead>
                )}
                {columnVisibility.company_url && <TableHead>URL PERUSAHAAN</TableHead>}
                {columnVisibility.contact_name && <TableHead>NAMA KONTAK</TableHead>}
                {columnVisibility.contact_email && <TableHead>EMAIL KONTAK</TableHead>}
                {columnVisibility.contact_phone && <TableHead>TELP KONTAK</TableHead>}
                {columnVisibility.follow_up_date && <TableHead>FOLLOW UP</TableHead>}
                {columnVisibility.follow_up_note && <TableHead>CATATAN FU</TableHead>}
                {columnVisibility.job_url && <TableHead>URL LOWONGAN</TableHead>}
                {columnVisibility.notes && <TableHead>CATATAN</TableHead>}
                {columnVisibility.created_at && (
                  <TableHead>
                    <SortableHeader field="created_at">DIBUAT</SortableHeader>
                  </TableHead>
                )}
                {columnVisibility.updated_at && (
                  <TableHead>
                    <SortableHeader field="updated_at">DIPERBARUI</SortableHeader>
                  </TableHead>
                )}
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedApplications.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={20} className="text-center py-16 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-10 w-10 text-muted-foreground/50" />
                      <p className="text-base font-medium">Tidak ada data lamaran</p>
                      <p className="text-sm">Mulai tambahkan lamaran pertama Anda</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedApplications.map((app, index) => (
                  <TableRow 
                    key={app.id}
                    className={cn(
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    )}
                  >
                    {columnVisibility.company_name && (
                      <TableCell className="font-medium">
                        <EditableCell app={app} field="company_name" />
                      </TableCell>
                    )}
                    {columnVisibility.date && (
                      <TableCell className="text-muted-foreground">
                        {format(new Date(app.date), "dd MMM yyyy")}
                      </TableCell>
                    )}
                    {columnVisibility.position && (
                      <TableCell><EditableCell app={app} field="position" /></TableCell>
                    )}
                    {columnVisibility.job_source && (
                      <TableCell><EditableCell app={app} field="job_source" /></TableCell>
                    )}
                    {columnVisibility.job_type && (
                      <TableCell><EditableCell app={app} field="job_type" type="select" /></TableCell>
                    )}
                    {columnVisibility.work_system && (
                      <TableCell><EditableCell app={app} field="work_system" type="select" /></TableCell>
                    )}
                    {columnVisibility.salary_min && (
                      <TableCell><EditableCell app={app} field="salary_min" type="number" /></TableCell>
                    )}
                    {columnVisibility.salary_max && (
                      <TableCell><EditableCell app={app} field="salary_max" type="number" /></TableCell>
                    )}
                    {columnVisibility.location && (
                      <TableCell><EditableCell app={app} field="location" /></TableCell>
                    )}
                    {columnVisibility.status && (
                      <TableCell><EditableCell app={app} field="status" type="select" /></TableCell>
                    )}
                    {columnVisibility.result_status && (
                      <TableCell><EditableCell app={app} field="result_status" type="select" /></TableCell>
                    )}
                    {columnVisibility.company_url && (
                      <TableCell><EditableCell app={app} field="company_url" /></TableCell>
                    )}
                    {columnVisibility.contact_name && (
                      <TableCell><EditableCell app={app} field="contact_name" /></TableCell>
                    )}
                    {columnVisibility.contact_email && (
                      <TableCell><EditableCell app={app} field="contact_email" /></TableCell>
                    )}
                    {columnVisibility.contact_phone && (
                      <TableCell><EditableCell app={app} field="contact_phone" /></TableCell>
                    )}
                    {columnVisibility.follow_up_date && (
                      <TableCell className="text-muted-foreground">
                        {app.follow_up_date ? format(new Date(app.follow_up_date), "dd MMM yyyy") : "-"}
                      </TableCell>
                    )}
                    {columnVisibility.follow_up_note && (
                      <TableCell><EditableCell app={app} field="follow_up_note" /></TableCell>
                    )}
                    {columnVisibility.job_url && (
                      <TableCell><EditableCell app={app} field="job_url" /></TableCell>
                    )}
                    {columnVisibility.notes && (
                      <TableCell><EditableCell app={app} field="notes" /></TableCell>
                    )}
                    {columnVisibility.created_at && (
                      <TableCell className="text-muted-foreground">{format(new Date(app.created_at), "dd MMM yyyy")}</TableCell>
                    )}
                    {columnVisibility.updated_at && (
                      <TableCell className="text-muted-foreground">{format(new Date(app.updated_at), "dd MMM yyyy")}</TableCell>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            •••
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-50 bg-popover w-40">
                          <DropdownMenuItem onClick={() => navigate(`/applications/${app.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/applications/${app.id}/edit`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplikat
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(app.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedApplications.length} data
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Baris per halaman</span>
          <Select value={String(perPage)} onValueChange={(val) => setPerPage(Number(val))}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-50 bg-popover">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground mx-2">
            Halaman {currentPage} dari {totalPages || 1}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ApplicationFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onApplyFilters={setFilters}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Lamaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus lamaran ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
