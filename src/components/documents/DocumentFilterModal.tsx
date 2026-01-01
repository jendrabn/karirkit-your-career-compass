import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { documentTypes, documentTypeLabels, DocumentType } from "@/types/document";

export interface DocumentFilterValues {
  q?: string;
  type?: DocumentType;
}

interface DocumentFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: DocumentFilterValues;
  onApply: (filters: DocumentFilterValues) => void;
}

export function DocumentFilterModal({
  open,
  onOpenChange,
  filters,
  onApply,
}: DocumentFilterModalProps) {
  const [localFilters, setLocalFilters] = useState<DocumentFilterValues>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, open]);

  const handleApply = () => {
    onApply(localFilters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setLocalFilters({});
    onApply({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Dokumen</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="q">Cari</Label>
            <Input
              id="q"
              placeholder="Cari nama file..."
              value={localFilters.q || ""}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, q: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Tipe Dokumen</Label>
            <Select
              value={localFilters.type || "all"}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  type: value === "all" ? undefined : (value as DocumentType),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">Semua Tipe</SelectItem>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {documentTypeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>Terapkan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
