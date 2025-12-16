import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { TemplateForm } from "@/components/templates/TemplateForm";
import { Template } from "@/types/template";
import { toast } from "sonner";

export default function TemplateCreate() {
  const navigate = useNavigate();

  const handleSubmit = (data: Partial<Template>) => {
    // Simulate API call
    console.log("Creating template:", data);
    toast.success("Template berhasil dibuat");
    navigate("/templates");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Buat Template"
        subtitle="Buat template CV atau Surat Lamaran baru."
      />
      <TemplateForm onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
