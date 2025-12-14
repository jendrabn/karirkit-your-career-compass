import { Button } from "@/components/ui/button";
import { Columns } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ColumnVisibility {
  name: boolean;
  headline: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  educations: boolean;
  experiences: boolean;
  skills: boolean;
  created_at: boolean;
  updated_at: boolean;
}

export const defaultColumnVisibility: ColumnVisibility = {
  name: true,
  headline: true,
  email: true,
  phone: false,
  address: false,
  educations: true,
  experiences: true,
  skills: true,
  created_at: true,
  updated_at: false,
};

interface CVColumnToggleProps {
  visibility: ColumnVisibility;
  onVisibilityChange: (visibility: ColumnVisibility) => void;
}

const columnLabels: Record<keyof ColumnVisibility, string> = {
  name: "Nama",
  headline: "Headline",
  email: "Email",
  phone: "Telepon",
  address: "Alamat",
  educations: "Pendidikan",
  experiences: "Pengalaman",
  skills: "Keahlian",
  created_at: "Dibuat",
  updated_at: "Diperbarui",
};

export function CVColumnToggle({ visibility, onVisibilityChange }: CVColumnToggleProps) {
  const handleToggle = (column: keyof ColumnVisibility) => {
    onVisibilityChange({ ...visibility, [column]: !visibility[column] });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Columns className="h-4 w-4 mr-2" />
          Kolom
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
        {Object.keys(visibility).map((column) => (
          <DropdownMenuCheckboxItem
            key={column}
            checked={visibility[column as keyof ColumnVisibility]}
            onCheckedChange={() => handleToggle(column as keyof ColumnVisibility)}
          >
            {columnLabels[column as keyof ColumnVisibility]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
