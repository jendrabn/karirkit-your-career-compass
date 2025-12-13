import { useState } from "react";
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
  company_name: boolean;
  company_url: boolean;
  position: boolean;
  job_source: boolean;
  job_type: boolean;
  work_system: boolean;
  salary_min: boolean;
  salary_max: boolean;
  location: boolean;
  date: boolean;
  status: boolean;
  result_status: boolean;
  contact_name: boolean;
  contact_email: boolean;
  contact_phone: boolean;
  follow_up_date: boolean;
  follow_up_note: boolean;
  job_url: boolean;
  notes: boolean;
  created_at: boolean;
  updated_at: boolean;
}

export const defaultColumnVisibility: ColumnVisibility = {
  company_name: true,
  company_url: false,
  position: true,
  job_source: true,
  job_type: true,
  work_system: true,
  salary_min: false,
  salary_max: false,
  location: true,
  date: true,
  status: true,
  result_status: true,
  contact_name: false,
  contact_email: false,
  contact_phone: false,
  follow_up_date: false,
  follow_up_note: false,
  job_url: false,
  notes: false,
  created_at: false,
  updated_at: false,
};

const columnLabels: Record<keyof ColumnVisibility, string> = {
  company_name: "Nama Perusahaan",
  company_url: "URL Perusahaan",
  position: "Posisi",
  job_source: "Sumber Lowongan",
  job_type: "Tipe Pekerjaan",
  work_system: "Sistem Kerja",
  salary_min: "Gaji Min",
  salary_max: "Gaji Max",
  location: "Lokasi",
  date: "Tanggal",
  status: "Status",
  result_status: "Hasil",
  contact_name: "Nama Kontak",
  contact_email: "Email Kontak",
  contact_phone: "Telepon Kontak",
  follow_up_date: "Tanggal Follow Up",
  follow_up_note: "Catatan Follow Up",
  job_url: "URL Lowongan",
  notes: "Catatan",
  created_at: "Dibuat",
  updated_at: "Diperbarui",
};

interface ColumnToggleProps {
  visibility: ColumnVisibility;
  onVisibilityChange: (visibility: ColumnVisibility) => void;
}

export function ColumnToggle({ visibility, onVisibilityChange }: ColumnToggleProps) {
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
