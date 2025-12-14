import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ColumnVisibility {
  name: boolean;
  subject: boolean;
  company_name: boolean;
  application_date: boolean;
  language: boolean;
  email: boolean;
  phone: boolean;
  applicant_city: boolean;
  company_city: boolean;
  gender: boolean;
  marital_status: boolean;
  education: boolean;
  created_at: boolean;
  updated_at: boolean;
}

export const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  subject: true,
  company_name: true,
  application_date: true,
  language: true,
  email: false,
  phone: false,
  applicant_city: false,
  company_city: false,
  gender: false,
  marital_status: false,
  education: false,
  created_at: false,
  updated_at: false,
};

const columnLabels: Record<keyof ColumnVisibility, string> = {
  name: "Nama",
  subject: "Subjek",
  company_name: "Perusahaan",
  application_date: "Tanggal Lamaran",
  language: "Bahasa",
  email: "Email",
  phone: "Telepon",
  applicant_city: "Kota Pelamar",
  company_city: "Kota Perusahaan",
  gender: "Jenis Kelamin",
  marital_status: "Status Pernikahan",
  education: "Pendidikan",
  created_at: "Dibuat",
  updated_at: "Diperbarui",
};

interface ColumnToggleProps {
  visibility: ColumnVisibility;
  onVisibilityChange: (visibility: ColumnVisibility) => void;
}

export function ApplicationLetterColumnToggle({ visibility, onVisibilityChange }: ColumnToggleProps) {
  const toggleColumn = (column: keyof ColumnVisibility) => {
    onVisibilityChange({
      ...visibility,
      [column]: !visibility[column],
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-50 bg-popover max-h-80 overflow-y-auto">
        <DropdownMenuLabel>Tampilkan Kolom</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(visibility) as Array<keyof ColumnVisibility>).map((column) => (
          <DropdownMenuCheckboxItem
            key={column}
            checked={visibility[column]}
            onCheckedChange={() => toggleColumn(column)}
          >
            {columnLabels[column]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
