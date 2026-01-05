import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  Search,
  Filter,
  Plus,
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
  Building2,
  Calendar,
  MapPin,
  GraduationCap,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApplicationLetterFilterModal, FilterValues } from "@/components/application-letters/ApplicationLetterFilterModal";
import { mockApplicationLetters } from "@/data/mockApplicationLetters";
import {
  ApplicationLetter,
  Language,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from "@/types/applicationLetter";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SortField = "application_date" | "company_name" | "subject";
type SortOrder = "asc" | "desc";

export default function ApplicationLetters() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortField, setSortField] = useState<SortField | null>("application_date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [letters, setLetters] = useState<ApplicationLetter[]>(mockApplicationLetters);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [letterToDelete, setLetterToDelete] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedLetters.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedLetters.map((letter) => letter.id));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const confirmBulkDelete = () => {
    setLetters((prev) => prev.filter((letter) => !selectedIds.includes(letter.id)));
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    toast.success(`${selectedIds.length} surat lamaran berhasil dihapus`);
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

  const handleDownload = (letter: ApplicationLetter, formatType: "docx" | "pdf") => {
    if (formatType === "pdf") {
      toast.info("Fitur export PDF akan segera hadir");
      return;
    }
    toast.success(`Mengunduh surat lamaran dalam format ${formatType.toUpperCase()}`);
  };

  const formatRelativeDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: localeId,
    });
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Surat Lamaran"
        subtitle="Kelola surat lamaran kerja Anda."
      >
        <Button size="sm" onClick={() => navigate("/application-letters/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Buat Surat Lamaran
        </Button>
      </PageHeader>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari subjek, perusahaan, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {selectedIds.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setBulkDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus ({selectedIds.length})
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => setFilterModalOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          {paginatedLetters.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox 
                id="selectAll"
                checked={paginatedLetters.length > 0 && selectedIds.length === paginatedLetters.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="selectAll" className="text-sm text-muted-foreground cursor-pointer">
                Pilih Semua
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Letter Cards */}
      <div className="space-y-4">
        {paginatedLetters.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tidak ada surat lamaran</h3>
              <p className="text-muted-foreground text-sm mb-4">Mulai buat surat lamaran pertama Anda</p>
              <Button onClick={() => navigate("/application-letters/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Buat Surat Lamaran
              </Button>
            </CardContent>
          </Card>
        ) : (
          paginatedLetters.map((letter) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              isSelected={selectedIds.includes(letter.id)}
              onSelect={() => handleSelectOne(letter.id)}
              onView={() => navigate(`/application-letters/${letter.id}`)}
              onEdit={() => navigate(`/application-letters/${letter.id}/edit`)}
              onDuplicate={() => handleDuplicate(letter)}
              onDownload={handleDownload}
              onDelete={() => handleDelete(letter.id)}
              formatRelativeDate={formatRelativeDate}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredAndSortedLetters.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-card border border-border/60 rounded-lg">
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

      {/* Filter Modal */}
      <ApplicationLetterFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Surat Lamaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus surat lamaran ini? Tindakan ini tidak dapat dibatalkan.
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

      {/* Bulk Delete Dialog */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus {selectedIds.length} Surat Lamaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus {selectedIds.length} surat lamaran yang dipilih? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus Semua
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}

// Letter Card Component
interface LetterCardProps {
  letter: ApplicationLetter;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDownload: (letter: ApplicationLetter, format: "docx" | "pdf") => void;
  onDelete: () => void;
  formatRelativeDate: (date: string) => string;
}

function LetterCard({
  letter,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDuplicate,
  onDownload,
  onDelete,
  formatRelativeDate,
}: LetterCardProps) {
  const getLabel = (value: string, options: { value: string; label: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <TooltipProvider>
      <Card className={cn(
        "transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary border-primary"
      )}>
        <CardContent className="p-4 md:p-5">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                {/* Subject */}
                <h3 className="font-semibold text-base md:text-lg line-clamp-1">
                  {letter.subject}
                </h3>
                
                {/* Company & Location */}
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {letter.company_name}
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {letter.company_city}
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={letter.language === "id" ? "default" : "secondary"} className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  {letter.language === "id" ? "Indonesia" : "English"}
                </Badge>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {/* Application Date */}
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-muted/50">
                <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Tanggal Lamaran</p>
                  <p className="text-sm font-medium truncate">
                    {format(new Date(letter.application_date), "d MMM yyyy", { locale: localeId })}
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-muted/50">
                <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Pendidikan</p>
                  <p className="text-sm font-medium truncate">{letter.education || "-"}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-muted/50">
                <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate">{letter.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 p-2.5 rounded-md bg-muted/50">
                <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Telepon</p>
                  <p className="text-sm font-medium truncate">{letter.phone}</p>
                </div>
              </div>
            </div>

            {/* Additional Info Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Badge variant="outline" className="text-xs">
                {getLabel(letter.gender, GENDER_OPTIONS)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {getLabel(letter.marital_status, MARITAL_STATUS_OPTIONS)}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {letter.applicant_city}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                Diperbarui {formatRelativeDate(letter.updated_at)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/60">
              <Button size="sm" onClick={onEdit} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Ubah
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    Unduh
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="z-50 bg-popover">
                  <DropdownMenuItem onClick={() => onDownload(letter, "docx")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download DOCX
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className="text-muted-foreground">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF (Segera Hadir)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" onClick={onView} className="gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Lihat</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Lihat Surat</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" onClick={onDuplicate} className="px-2">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplikasi Surat</TooltipContent>
              </Tooltip>
              <div className="flex-1" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={onDelete}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Hapus Surat</TooltipContent>
              </Tooltip>
              <Checkbox 
                checked={isSelected}
                onCheckedChange={onSelect}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}