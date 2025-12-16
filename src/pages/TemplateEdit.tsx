import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { TemplateForm } from "@/components/templates/TemplateForm";
import { mockTemplates } from "@/data/mockTemplates";
import { Template } from "@/types/template";
import { toast } from "sonner";

export default function TemplateEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const template = mockTemplates.find((t) => t.id === Number(id));

  if (!template) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Template tidak ditemukan</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = (data: Partial<Template>) => {
    // Simulate API call
    console.log("Updating template:", data);
    toast.success("Template berhasil diperbarui");
    navigate("/templates");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Template"
        subtitle={`Edit template: ${template.name}`}
      />
      <TemplateForm initialData={template} onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
