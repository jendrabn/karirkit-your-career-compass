import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function JobSearchBar({ value, onChange, onSearch }: JobSearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2 bg-card rounded-lg border border-border p-1.5 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Cari posisi, perusahaan..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-11 border-0 shadow-none focus-visible:ring-0 bg-transparent text-base h-11"
        />
      </div>
      <Button onClick={onSearch} size="lg" className="px-6">
        Cari Lowongan
      </Button>
    </div>
  );
}
