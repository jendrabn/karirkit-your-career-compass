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
  Sparkles,
  Calendar,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { CVFilterModal, FilterValues } from "@/components/cv/CVFilterModal";
import { mockCVs } from "@/data/mockCVs";
import { CV } from "@/types/cv";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SortField = "updated_at" | "name";
type SortOrder = "asc" | "desc";

export default function CVs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortField, setSortField] = useState<SortField | null>("updated_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [cvs, setCvs] = useState<CV[]>(mockCVs);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedCVs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedCVs.map((cv) => cv.id));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const confirmBulkDelete = () => {
    setCvs((prev) => prev.filter((cv) => !selectedIds.includes(cv.id)));
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    toast.success(`${selectedIds.length} CV berhasil dihapus`);
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

  const handleDownload = (cv: CV, formatType: "docx" | "pdf") => {
    if (formatType === "pdf") {
      toast.info("Fitur export PDF akan segera hadir");
      return;
    }
    toast.success(`Mengunduh CV dalam format ${formatType.toUpperCase()}`);
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
        title="CV Saya"
        subtitle="Kelola daftar riwayat hidup (CV) Anda."
      >
        <Button variant="outline" size="sm" disabled>
          <FileText className="h-4 w-4 mr-2" />
          Buat dari Profil
        </Button>
        <Button size="sm" onClick={() => navigate("/cvs/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Buat CV
        </Button>
      </PageHeader>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground">
            Lengkapi profil Anda minimal 75% untuk membuat CV dari profil.{" "}
            <button className="text-primary font-medium hover:underline">
              Edit profil saya
            </button>
          </p>
        </div>
      </div>

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
          {paginatedCVs.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox 
                id="selectAll"
                checked={paginatedCVs.length > 0 && selectedIds.length === paginatedCVs.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="selectAll" className="text-sm text-muted-foreground cursor-pointer">
                Pilih Semua
              </label>
            </div>
          )}
        </div>
      </div>

      {/* CV Cards */}
      <div className="space-y-4">
        {paginatedCVs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tidak ada CV</h3>
              <p className="text-muted-foreground text-sm mb-4">Mulai buat CV pertama Anda</p>
              <Button onClick={() => navigate("/cvs/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Buat CV
              </Button>
            </CardContent>
          </Card>
        ) : (
          paginatedCVs.map((cv) => (
            <CVCard
              key={cv.id}
              cv={cv}
              isSelected={selectedIds.includes(cv.id)}
              onSelect={() => handleSelectOne(cv.id)}
              onView={() => navigate(`/cvs/${cv.id}`)}
              onEdit={() => navigate(`/cvs/${cv.id}/edit`)}
              onDuplicate={() => handleDuplicate(cv)}
              onDownload={handleDownload}
              onDelete={() => handleDelete(cv.id)}
              formatRelativeDate={formatRelativeDate}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredAndSortedCVs.length > 0 && (
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

      {/* AI CV Checker Promo */}
      <Card className="mt-6 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center gap-4 p-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold mb-1">Perbaiki CV dengan AI</h3>
              <p className="text-muted-foreground text-sm">
                Pastikan CV sudah ATS-friendly dan dapatkan saran agar CV lebih menarik di mata HRD
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button variant="link" className="text-primary" disabled>
                Cek CV
                <Badge variant="secondary" className="ml-2 text-xs">Segera Hadir</Badge>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <AlertDialogTitle>Hapus CV</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus CV ini? Tindakan ini tidak dapat dibatalkan.
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
            <AlertDialogTitle>Hapus {selectedIds.length} CV</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus {selectedIds.length} CV yang dipilih? Tindakan ini tidak dapat dibatalkan.
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

// CV Card Component
interface CVCardProps {
  cv: CV;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDownload: (cv: CV, format: "docx" | "pdf") => void;
  onDelete: () => void;
  formatRelativeDate: (date: string) => string;
}

function CVCard({
  cv,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDuplicate,
  onDownload,
  onDelete,
  formatRelativeDate,
}: CVCardProps) {
  const latestExperience = cv.experiences?.[0];
  const latestEducation = cv.educations?.[0];
  const skillsCount = cv.skills?.length || 0;
  const certificatesCount = cv.certificates?.length || 0;
  const organizationsCount = cv.organizations?.length || 0;

  return (
    <TooltipProvider>
      <Card className={cn(
        "transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary border-primary"
      )}>
        <CardContent className="p-4 md:p-5">
          <div className="flex gap-3">
            {/* Checkbox */}
            <div className="flex-shrink-0 pt-1">
              <Checkbox 
                checked={isSelected}
                onCheckedChange={onSelect}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  {/* Headline */}
                  <h3 className="font-semibold text-base md:text-lg truncate">
                    {cv.headline || "Belum ada headline"}
                  </h3>
                  
                  {/* Template & Language */}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {cv.template_id && (
                      <Badge variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        {cv.template?.name || "Template"}
                      </Badge>
                    )}
                    {cv.language && (
                      <Badge variant="secondary" className="text-xs">
                        {cv.language === "id" ? "Indonesia" : cv.language === "en" ? "English" : cv.language}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
                  <Calendar className="h-3 w-3" />
                  {formatRelativeDate(cv.updated_at)}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {/* Latest Experience */}
                <div className="flex items-start gap-2 p-2.5 rounded-md bg-muted/50">
                  <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Pengalaman Terakhir</p>
                    {latestExperience ? (
                      <p className="text-sm font-medium truncate">{latestExperience.job_title}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Belum ada</p>
                    )}
                    {latestExperience?.company_name && (
                      <p className="text-xs text-muted-foreground truncate">{latestExperience.company_name}</p>
                    )}
                  </div>
                </div>

                {/* Latest Education */}
                <div className="flex items-start gap-2 p-2.5 rounded-md bg-muted/50">
                  <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Pendidikan Terakhir</p>
                    {latestEducation ? (
                      <p className="text-sm font-medium truncate">{latestEducation.school_name}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Belum ada</p>
                    )}
                    {latestEducation?.degree && (
                      <p className="text-xs text-muted-foreground truncate capitalize">{latestEducation.degree}</p>
                    )}
                  </div>
                </div>

                {/* Skills Count */}
                <div className="flex items-start gap-2 p-2.5 rounded-md bg-muted/50">
                  <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Keahlian</p>
                    <p className="text-sm font-medium">{skillsCount} skill</p>
                    {certificatesCount > 0 && (
                      <p className="text-xs text-muted-foreground">{certificatesCount} sertifikat</p>
                    )}
                  </div>
                </div>
              </div>

              {/* About Preview */}
              {cv.about && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {cv.about}
                </p>
              )}

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
                    <DropdownMenuItem onClick={() => onDownload(cv, "docx")}>
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
                  <TooltipContent>Lihat CV</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={onDuplicate} className="px-2">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Duplikasi CV</TooltipContent>
                </Tooltip>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5 border-primary/50 text-primary hover:bg-primary/5"
                  disabled
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Cek CV dengan AI</span>
                  <span className="sm:hidden">AI</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Soon</Badge>
                </Button>
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
                  <TooltipContent>Hapus CV</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
