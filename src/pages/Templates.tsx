import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,
  Copy,
  Crown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { mockTemplates } from "@/data/mockTemplates";
import { Template, getTemplateTypeLabel } from "@/types/template";
import { TemplateFilterModal } from "@/components/templates/TemplateFilterModal";
import { TemplateColumnToggle } from "@/components/templates/TemplateColumnToggle";
import { toast } from "sonner";

type SortField = 'created_at' | 'updated_at' | 'name' | 'type';
type SortOrder = 'asc' | 'desc';

export default function Templates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<{
    type?: string;
    is_premium?: string;
    is_active?: string;
  }>({});
  const [visibleColumns, setVisibleColumns] = useState({
    preview_image: true,
    type: true,
    name: true,
    is_premium: true,
    is_active: true,
    created_at: true,
  });

  const itemsPerPage = 10;

  const filteredAndSortedTemplates = useMemo(() => {
    let result = [...templates];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.slug.toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }
    if (filters.is_premium !== undefined && filters.is_premium !== '') {
      result = result.filter((t) => t.is_premium === (filters.is_premium === 'true'));
    }
    if (filters.is_active !== undefined && filters.is_active !== '') {
      result = result.filter((t) => t.is_active === (filters.is_active === 'true'));
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'created_at':
        case 'updated_at':
          comparison = new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [templates, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredAndSortedTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (id: number) => {
    setTemplateToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      setTemplates(templates.filter((t) => t.id !== templateToDelete));
      toast.success("Template berhasil dihapus");
    }
    setDeleteDialogOpen(false);
    setTemplateToDelete(null);
  };

  const handleDuplicate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Math.max(...templates.map((t) => t.id)) + 1,
      name: `${template.name} (Copy)`,
      slug: `${template.slug}-copy`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTemplates([newTemplate, ...templates]);
    toast.success("Template berhasil diduplikasi");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedTemplates.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const confirmBulkDelete = () => {
    setTemplates(templates.filter((t) => !selectedIds.includes(t.id)));
    setSelectedIds([]);
    setBulkDeleteDialogOpen(false);
    toast.success(`${selectedIds.length} template berhasil dihapus`);
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Template"
        subtitle="Kelola template CV dan Surat Lamaran."
      />

      <div className="space-y-4">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={() => setFilterModalOpen(true)}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <TemplateColumnToggle
              visibleColumns={visibleColumns}
              onToggle={(column) =>
                setVisibleColumns((prev) => ({
                  ...prev,
                  [column]: !prev[column],
                }))
              }
            />
          </div>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setBulkDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus ({selectedIds.length})
              </Button>
            )}
            <Button onClick={() => navigate("/templates/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Template
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      paginatedTemplates.length > 0 &&
                      paginatedTemplates.every((t) => selectedIds.includes(t.id))
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {visibleColumns.preview_image && (
                  <TableHead className="uppercase text-xs font-medium tracking-wider">
                    Preview
                  </TableHead>
                )}
                {visibleColumns.name && (
                  <TableHead
                    className="uppercase text-xs font-medium tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Nama
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                )}
                {visibleColumns.type && (
                  <TableHead
                    className="uppercase text-xs font-medium tracking-wider cursor-pointer"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center gap-1">
                      Tipe
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                )}
                {visibleColumns.is_premium && (
                  <TableHead className="uppercase text-xs font-medium tracking-wider">
                    Premium
                  </TableHead>
                )}
                {visibleColumns.is_active && (
                  <TableHead className="uppercase text-xs font-medium tracking-wider">
                    Status
                  </TableHead>
                )}
                {visibleColumns.created_at && (
                  <TableHead
                    className="uppercase text-xs font-medium tracking-wider cursor-pointer"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center gap-1">
                      Dibuat
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                )}
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTemplates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={Object.values(visibleColumns).filter(Boolean).length + 2}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Tidak ada template ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(template.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(template.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    {visibleColumns.preview_image && (
                      <TableCell>
                        {template.preview_image ? (
                          <img
                            src={template.preview_image}
                            alt={template.name}
                            className="w-16 h-20 object-cover rounded border"
                          />
                        ) : (
                          <div className="w-16 h-20 bg-muted rounded border flex items-center justify-center text-xs text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.name && (
                      <TableCell className="font-medium whitespace-nowrap">
                        {template.name}
                      </TableCell>
                    )}
                    {visibleColumns.type && (
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline">
                          {getTemplateTypeLabel(template.type)}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.is_premium && (
                      <TableCell>
                        {template.is_premium ? (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Gratis</Badge>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.is_active && (
                      <TableCell>
                        {template.is_active ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Aktif
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Nonaktif
                          </Badge>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.created_at && (
                      <TableCell className="whitespace-nowrap">
                        {new Date(template.created_at).toLocaleDateString("id-ID")}
                      </TableCell>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/templates/${template.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/templates/${template.id}/edit`)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplikasi
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(template.id)}
                            className="text-destructive"
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Filter Modal */}
      <TemplateFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        filters={filters}
        onApply={handleApplyFilters}
      />

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Template?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Template akan dihapus secara permanen.
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
            <AlertDialogTitle>Hapus {selectedIds.length} Template?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Semua template yang dipilih akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
