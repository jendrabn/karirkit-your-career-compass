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
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  User,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { CVFilterModal, FilterValues } from "@/components/cv/CVFilterModal";
import { CVColumnToggle, ColumnVisibility, defaultColumnVisibility } from "@/components/cv/CVColumnToggle";
import { mockCVs } from "@/data/mockCVs";
import { CV, DEGREE_OPTIONS, SKILL_LEVEL_OPTIONS } from "@/types/cv";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SortField = "created_at" | "updated_at" | "name";
type SortOrder = "asc" | "desc";

export default function CVs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [cvs, setCvs] = useState<CV[]>(mockCVs);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<string | null>(null);

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

  const filteredAndSortedCVs = useMemo(() => {
    let result = [...cvs];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (cv) =>
          cv.name.toLowerCase().includes(query) ||
          cv.headline.toLowerCase().includes(query) ||
          cv.email.toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.name) {
      result = result.filter((cv) =>
        cv.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }
    if (filters.dateFrom) {
      result = result.filter((cv) => new Date(cv.created_at) >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter((cv) => new Date(cv.created_at) <= filters.dateTo!);
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
  }, [cvs, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedCVs.length / perPage);
  const paginatedCVs = filteredAndSortedCVs.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = (id: string) => {
    setCvToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (cvToDelete) {
      setCvs((prev) => prev.filter((cv) => cv.id !== cvToDelete));
      setDeleteDialogOpen(false);
      setCvToDelete(null);
      toast.success("CV berhasil dihapus");
    }
  };

  const handleDuplicate = (cv: CV) => {
    const newCV: CV = {
      ...cv,
      id: `${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCvs((prev) => [newCV, ...prev]);
    toast.success("CV berhasil diduplikasi");
  };

  const handleDownload = (cv: CV, format: "docx" | "pdf") => {
    if (format === "pdf") {
      toast.info("Fitur export PDF akan segera hadir");
      return;
    }
    toast.success(`Mengunduh CV dalam format ${format.toUpperCase()}`);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent uppercase text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-50" />
    </Button>
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="CV"
        subtitle="Kelola daftar riwayat hidup (CV) Anda."
      />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama, headline, email..."
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
          <CVColumnToggle visibility={columnVisibility} onVisibilityChange={setColumnVisibility} />
          <Button size="sm" onClick={() => navigate("/cvs/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Buat CV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columnVisibility.name && (
                  <TableHead><SortableHeader field="name">Nama</SortableHeader></TableHead>
                )}
                {columnVisibility.headline && <TableHead>Headline</TableHead>}
                {columnVisibility.email && <TableHead>Email</TableHead>}
                {columnVisibility.phone && <TableHead>Telepon</TableHead>}
                {columnVisibility.address && <TableHead>Alamat</TableHead>}
                {columnVisibility.educations && <TableHead>Pendidikan</TableHead>}
                {columnVisibility.experiences && <TableHead>Pengalaman</TableHead>}
                {columnVisibility.skills && <TableHead>Keahlian</TableHead>}
                {columnVisibility.created_at && (
                  <TableHead><SortableHeader field="created_at">Dibuat</SortableHeader></TableHead>
                )}
                {columnVisibility.updated_at && (
                  <TableHead><SortableHeader field="updated_at">Diperbarui</SortableHeader></TableHead>
                )}
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCVs.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={11} className="text-center py-16 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-10 w-10 text-muted-foreground/50" />
                      <p className="text-base font-medium">Tidak ada CV</p>
                      <p className="text-sm">Mulai buat CV pertama Anda</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCVs.map((cv, index) => (
                  <TableRow
                    key={cv.id}
                    className={cn(
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    )}
                  >
                    {columnVisibility.name && (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={cv.photo} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {cv.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{cv.name}</span>
                        </div>
                      </TableCell>
                    )}
                    {columnVisibility.headline && (
                      <TableCell className="max-w-[200px] truncate">{cv.headline}</TableCell>
                    )}
                    {columnVisibility.email && (
                      <TableCell>{cv.email}</TableCell>
                    )}
                    {columnVisibility.phone && (
                      <TableCell>{cv.phone}</TableCell>
                    )}
                    {columnVisibility.address && (
                      <TableCell className="max-w-[150px] truncate">{cv.address}</TableCell>
                    )}
                    {columnVisibility.educations && (
                      <TableCell>
                        {cv.educations.length > 0 ? (
                          <Badge variant="secondary">{cv.educations.length} pendidikan</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    )}
                    {columnVisibility.experiences && (
                      <TableCell>
                        {cv.experiences.length > 0 ? (
                          <Badge variant="secondary">{cv.experiences.length} pengalaman</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    )}
                    {columnVisibility.skills && (
                      <TableCell>
                        {cv.skills.length > 0 ? (
                          <Badge variant="secondary">{cv.skills.length} keahlian</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    )}
                    {columnVisibility.created_at && (
                      <TableCell className="text-muted-foreground">
                        {format(new Date(cv.created_at), "dd MMM yyyy")}
                      </TableCell>
                    )}
                    {columnVisibility.updated_at && (
                      <TableCell className="text-muted-foreground">
                        {format(new Date(cv.updated_at), "dd MMM yyyy")}
                      </TableCell>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="sr-only">Menu</span>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-50 bg-popover">
                          <DropdownMenuItem onClick={() => navigate(`/cvs/${cv.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/cvs/${cv.id}/edit`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(cv)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplikasi
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="bg-popover">
                              <DropdownMenuItem onClick={() => handleDownload(cv, "docx")}>
                                <FileText className="h-4 w-4 mr-2" />
                                Word (.docx)
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDownload(cv, "pdf")}
                                className="text-muted-foreground"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                PDF (Segera Hadir)
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(cv.id)}
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

        {/* Pagination */}
        {filteredAndSortedCVs.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-border/60">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Tampilkan</span>
              <Select
                value={String(perPage)}
                onValueChange={(value) => {
                  setPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>dari {filteredAndSortedCVs.length} data</span>
            </div>

            <div className="flex items-center gap-1">
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
              <span className="px-3 text-sm">
                Halaman {currentPage} dari {totalPages || 1}
              </span>
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
        )}
      </div>

      {/* Filter Modal */}
      <CVFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus CV?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. CV akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
