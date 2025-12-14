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
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { ApplicationLetterFilterModal, FilterValues } from "@/components/application-letters/ApplicationLetterFilterModal";
import { ApplicationLetterColumnToggle, ColumnVisibility, defaultColumnVisibility } from "@/components/application-letters/ApplicationLetterColumnToggle";
import { mockApplicationLetters } from "@/data/mockApplicationLetters";
import {
  ApplicationLetter,
  Language,
  LANGUAGE_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from "@/types/applicationLetter";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const getLanguageBadgeVariant = (language: Language) => {
  return language === "id" ? "default" : "secondary";
};

type SortField = "created_at" | "updated_at" | "application_date" | "company_name" | "subject";
type SortOrder = "asc" | "desc";

export default function ApplicationLetters() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(defaultColumnVisibility);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [letters, setLetters] = useState<ApplicationLetter[]>(mockApplicationLetters);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [letterToDelete, setLetterToDelete] = useState<string | null>(null);

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

  const filteredAndSortedLetters = useMemo(() => {
    let result = [...letters];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (letter) =>
          letter.name.toLowerCase().includes(query) ||
          letter.company_name.toLowerCase().includes(query) ||
          letter.subject.toLowerCase().includes(query) ||
          letter.email.toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.language) {
      result = result.filter((letter) => letter.language === filters.language);
    }
    if (filters.company_name) {
      result = result.filter((letter) => 
        letter.company_name.toLowerCase().includes(filters.company_name!.toLowerCase())
      );
    }
    if (filters.dateFrom) {
      result = result.filter((letter) => new Date(letter.application_date) >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter((letter) => new Date(letter.application_date) <= filters.dateTo!);
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
  }, [letters, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedLetters.length / perPage);
  const paginatedLetters = filteredAndSortedLetters.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = (id: string) => {
    setLetterToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (letterToDelete) {
      setLetters((prev) => prev.filter((letter) => letter.id !== letterToDelete));
      setDeleteDialogOpen(false);
      setLetterToDelete(null);
      toast.success("Surat lamaran berhasil dihapus");
    }
  };

  const handleDuplicate = (letter: ApplicationLetter) => {
    const newLetter: ApplicationLetter = {
      ...letter,
      id: `${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setLetters((prev) => [newLetter, ...prev]);
    toast.success("Surat lamaran berhasil diduplikasi");
  };

  const handleDownload = (letter: ApplicationLetter, format: "docx" | "pdf") => {
    if (format === "pdf") {
      toast.info("Fitur export PDF akan segera hadir");
      return;
    }
    // In real implementation, call API to generate and download file
    toast.success(`Mengunduh surat lamaran dalam format ${format.toUpperCase()}`);
  };

  const getLabel = (value: string, options: { value: string; label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value;
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
        title="Surat Lamaran"
        subtitle="Kelola surat lamaran kerja Anda."
      />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama, perusahaan, subjek, email..."
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
          <ApplicationLetterColumnToggle visibility={columnVisibility} onVisibilityChange={setColumnVisibility} />
          <Button size="sm" onClick={() => navigate("/application-letters/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Buat Surat Lamaran
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columnVisibility.name && <TableHead>Nama</TableHead>}
                {columnVisibility.subject && (
                  <TableHead><SortableHeader field="subject">Subjek</SortableHeader></TableHead>
                )}
                {columnVisibility.company_name && (
                  <TableHead><SortableHeader field="company_name">Perusahaan</SortableHeader></TableHead>
                )}
                {columnVisibility.application_date && (
                  <TableHead><SortableHeader field="application_date">Tanggal</SortableHeader></TableHead>
                )}
                {columnVisibility.language && <TableHead>Bahasa</TableHead>}
                {columnVisibility.email && <TableHead>Email</TableHead>}
                {columnVisibility.phone && <TableHead>Telepon</TableHead>}
                {columnVisibility.applicant_city && <TableHead>Kota Pelamar</TableHead>}
                {columnVisibility.company_city && <TableHead>Kota Perusahaan</TableHead>}
                {columnVisibility.gender && <TableHead>Jenis Kelamin</TableHead>}
                {columnVisibility.marital_status && <TableHead>Status Pernikahan</TableHead>}
                {columnVisibility.education && <TableHead>Pendidikan</TableHead>}
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
              {paginatedLetters.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={15} className="text-center py-16 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-10 w-10 text-muted-foreground/50" />
                      <p className="text-base font-medium">Tidak ada surat lamaran</p>
                      <p className="text-sm">Mulai buat surat lamaran pertama Anda</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLetters.map((letter, index) => (
                  <TableRow 
                    key={letter.id}
                    className={cn(
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    )}
                  >
                    {columnVisibility.name && (
                      <TableCell className="font-medium">{letter.name}</TableCell>
                    )}
                    {columnVisibility.subject && (
                      <TableCell className="max-w-[200px] truncate">{letter.subject}</TableCell>
                    )}
                    {columnVisibility.company_name && (
                      <TableCell>{letter.company_name}</TableCell>
                    )}
                    {columnVisibility.application_date && (
                      <TableCell className="text-muted-foreground">
                        {format(new Date(letter.application_date), "dd MMM yyyy")}
                      </TableCell>
                    )}
                    {columnVisibility.language && (
                      <TableCell>
                        <Badge variant={getLanguageBadgeVariant(letter.language)}>
                          {getLabel(letter.language, LANGUAGE_OPTIONS)}
                        </Badge>
                      </TableCell>
                    )}
                    {columnVisibility.email && (
                      <TableCell>{letter.email}</TableCell>
                    )}
                    {columnVisibility.phone && (
                      <TableCell>{letter.phone}</TableCell>
                    )}
                    {columnVisibility.applicant_city && (
                      <TableCell>{letter.applicant_city}</TableCell>
                    )}
                    {columnVisibility.company_city && (
                      <TableCell>{letter.company_city}</TableCell>
                    )}
                    {columnVisibility.gender && (
                      <TableCell>{getLabel(letter.gender, GENDER_OPTIONS)}</TableCell>
                    )}
                    {columnVisibility.marital_status && (
                      <TableCell>{getLabel(letter.marital_status, MARITAL_STATUS_OPTIONS)}</TableCell>
                    )}
                    {columnVisibility.education && (
                      <TableCell>{letter.education}</TableCell>
                    )}
                    {columnVisibility.created_at && (
                      <TableCell className="text-muted-foreground">
                        {format(new Date(letter.created_at), "dd MMM yyyy")}
                      </TableCell>
                    )}
                    {columnVisibility.updated_at && (
                      <TableCell className="text-muted-foreground">
                        {format(new Date(letter.updated_at), "dd MMM yyyy")}
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
                          <DropdownMenuItem onClick={() => navigate(`/application-letters/${letter.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/application-letters/${letter.id}/edit`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(letter)}>
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
                              <DropdownMenuItem onClick={() => handleDownload(letter, "docx")}>
                                <FileText className="h-4 w-4 mr-2" />
                                Word (.docx)
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDownload(letter, "pdf")}
                                className="text-muted-foreground"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                PDF (Segera Hadir)
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(letter.id)}
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
        {filteredAndSortedLetters.length > 0 && (
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
              <span>dari {filteredAndSortedLetters.length} data</span>
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
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1 mx-2">
                <span className="text-sm">Halaman</span>
                <Input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  className="w-12 h-8 text-center"
                />
                <span className="text-sm">dari {totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <ApplicationLetterFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Surat Lamaran?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Surat lamaran ini akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
