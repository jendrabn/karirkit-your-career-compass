import { useState } from "react";
import { Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocumentTemplate } from "@/data/documentTemplates";

interface TemplateGridModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: DocumentTemplate[];
  value: string;
  onSelect: (templateId: string) => void;
  title?: string;
  description?: string;
}

export function TemplateGridModal({
  open,
  onOpenChange,
  templates,
  value,
  onSelect,
  title = "Pilih Template",
  description = "Template yang dipilih akan secara otomatis dilengkapi dengan informasi yang tersedia pada profil Anda.",
}: TemplateGridModalProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelect = (templateId: string) => {
    onSelect(templateId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {/* Create New CV Card */}
          <div
            className="group relative aspect-[3/4] rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 bg-muted/20 hover:bg-muted/40"
            onClick={() => {
              // Could navigate to empty form or handle differently
              onOpenChange(false);
            }}
          >
            <Plus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              CV Baru
            </span>
          </div>

          {/* Template Cards */}
          {templates.map((template) => {
            const isSelected = value === template.id;
            const isHovered = hoveredId === template.id;

            return (
              <div
                key={template.id}
                className={cn(
                  "group relative aspect-[3/4] rounded-lg border-2 overflow-hidden cursor-pointer transition-all",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
                onMouseEnter={() => setHoveredId(template.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelect(template.id)}
              >
                {/* Template Preview Image */}
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
                    isHovered || isSelected ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Button
                    size="sm"
                    className={cn(
                      "transition-all",
                      isSelected && "bg-primary"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Terpilih
                      </>
                    ) : (
                      "Pilih template"
                    )}
                  </Button>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                {/* Template name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {template.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
