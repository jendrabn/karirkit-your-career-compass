import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  FileText,
  Image,
  File,
  MoreVertical,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { DocumentFilterModal, DocumentFilterValues } from "@/components/documents/DocumentFilterModal";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { mockDocuments } from "@/data/mockDocuments";
import { Document, documentTypeLabels, DocumentType } from "@/types/document";
import { toast } from "@/components/ui/sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type SortField = "original_name" | "type" | "size" | "created_at" | "updated_at";
type SortOrder = "asc" | "desc";

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) {
    return <Image className="h-5 w-5 text-primary" />;
  }
  if (mimeType === "application/pdf") {
    return <FileText className="h-5 w-5 text-destructive" />;
  }
  return <File className="h-5 w-5 text-muted-foreground" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filters, setFilters] = useState<DocumentFilterValues>({});
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [massDeleteDialogOpen, setMassDeleteDialogOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedDocuments = useMemo(() => {
    let result = [...documents];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((doc) =>
        doc.original_name.toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.q) {
      const query = filters.q.toLowerCase();
      result = result.filter((doc) =>
        doc.original_name.toLowerCase().includes(query)
      );
    }
    if (filters.type) {
      result = result.filter((doc) => doc.type === filters.type);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      if (sortField === "created_at" || sortField === "updated_at") {
        aVal = new Date(a[sortField]).getTime();
        bVal = new Date(b[sortField]).getTime();
      } else if (sortField === "size") {
        aVal = a.size;
        bVal = b.size;
      } else {
        aVal = a[sortField];
        bVal = b[sortField];
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [documents, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedDocuments.length / perPage);
  const paginatedDocuments = filteredAndSortedDocuments.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedDocuments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedDocuments.map((doc) => doc.id));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentToDelete));
      setSelectedIds((prev) => prev.filter((id) => id !== documentToDelete));
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
      toast.success("Dokumen berhasil dihapus");
    }
  };

  const handleMassDelete = () => {
    if (selectedIds.length === 0) {
      toast.error("Pilih dokumen yang akan dihapus");
      return;
    }
    setMassDeleteDialogOpen(true);
  };

  const confirmMassDelete = () => {
    setDocuments((prev) => prev.filter((doc) => !selectedIds.includes(doc.id)));
    toast.success(`${selectedIds.length} dokumen berhasil dihapus`);
    setSelectedIds([]);
    setMassDeleteDialogOpen(false);
  };

  const handleUpload = (file: File, type: DocumentType) => {
    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      user_id: "user-1",
      type,
      original_name: file.name,
      path: `/documents/${type}/${file.name}`,
      mime_type: file.type,
      size: file.size,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDocuments((prev) => [newDocument, ...prev]);
  };

  const handleDownload = (doc: Document) => {
    toast.success(`Mengunduh ${doc.original_name}...`);
  };

  const handlePreview = (doc: Document) => {
    window.open(doc.path, "_blank");
    toast.info(`Membuka preview ${doc.original_name}`);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Dokumen"
        subtitle="Kelola dan simpan dokumen penting Anda dengan aman."
      />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleMassDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus ({selectedIds.length})
            </Button>
          )}

          <Select
            value={`${sortField}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split("-") as [SortField, SortOrder];
              setSortField(field);
              setSortOrder(order);
            }}
          >
            <SelectTrigger className="w-auto min-w-[180px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-desc">Terbaru Diupload</SelectItem>
              <SelectItem value="created_at-asc">Terlama Diupload</SelectItem>
              <SelectItem value="original_name-asc">Nama (A-Z)</SelectItem>
              <SelectItem value="original_name-desc">Nama (Z-A)</SelectItem>
              <SelectItem value="size-desc">Ukuran (Terbesar)</SelectItem>
              <SelectItem value="size-asc">Ukuran (Terkecil)</SelectItem>
              <SelectItem value="type-asc">Tipe (A-Z)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => setFilterModalOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button size="sm" onClick={() => setUploadModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Dokumen
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginatedDocuments.length > 0 &&
                    selectedIds.length === paginatedDocuments.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[250px]">Nama File</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Ukuran</TableHead>
              <TableHead>Tanggal Upload</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Tidak ada dokumen</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Dokumen Pertama
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedDocuments.map((doc) => (
                <TableRow key={doc.id} className="group">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(doc.id)}
                      onCheckedChange={() => handleSelectOne(doc.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {getFileIcon(doc.mime_type)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate max-w-[200px]">
                          {doc.original_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.mime_type}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {documentTypeLabels[doc.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatFileSize(doc.size)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(doc.created_at), "dd MMM yyyy, HH:mm", {
                      locale: id,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => handlePreview(doc)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(doc)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(doc.id)}
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
      {filteredAndSortedDocuments.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Tampilkan</span>
            <Select
              value={perPage.toString()}
              onValueChange={(value) => {
                setPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              dari {filteredAndSortedDocuments.length} dokumen
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-3">
              Halaman {currentPage} dari {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <DocumentFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onApply={setFilters}
      />

      <DocumentUploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUpload={handleUpload}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Dokumen</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak
              dapat dibatalkan.
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

      {/* Mass Delete Confirmation */}
      <AlertDialog open={massDeleteDialogOpen} onOpenChange={setMassDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus {selectedIds.length} Dokumen</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus {selectedIds.length} dokumen yang
              dipilih? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmMassDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus Semua
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
