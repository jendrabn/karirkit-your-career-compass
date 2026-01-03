import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TemplateGridModal } from "./template-grid-modal";
import { DocumentTemplate } from "@/data/documentTemplates";

interface TemplateSelectorProps {
  label: string;
  templates: DocumentTemplate[];
  value: string;
  onChange: (value: string) => void;
}

export function TemplateSelector({
  label,
  templates,
  value,
  onChange,
}: TemplateSelectorProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedTemplate = templates.find((t) => t.id === value);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* Selected Template Preview */}
      {selectedTemplate ? (
        <div 
          className="relative aspect-[3/4] max-w-[200px] rounded-lg border-2 border-primary overflow-hidden cursor-pointer group"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={selectedTemplate.previewImage}
            alt={selectedTemplate.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium">Ganti Template</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <p className="text-white text-xs font-medium truncate">{selectedTemplate.name}</p>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-24 border-dashed"
          onClick={() => setModalOpen(true)}
        >
          <FileText className="h-6 w-6 mr-2" />
          Pilih Template
        </Button>
      )}

      <Button
        type="button"
        variant="link"
        className="p-0 h-auto text-sm"
        onClick={() => setModalOpen(true)}
      >
        {selectedTemplate ? "Lihat semua template" : ""}
      </Button>

      <TemplateGridModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        templates={templates}
        value={value}
        onSelect={onChange}
      />
    </div>
  );
}
