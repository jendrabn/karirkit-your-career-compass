import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { JobRole, City, JOB_TYPE_LABELS, WORK_SYSTEM_LABELS, JobType, WorkSystem } from "@/types/job";

interface JobFilters {
  job_type?: JobType;
  work_system?: WorkSystem;
  job_role_id?: string;
  city_id?: string;
  experience_min?: number;
}

interface JobFilterSidebarProps {
  jobRoles: JobRole[];
  cities: City[];
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
}

const experienceOptions = [
  { value: 0, label: "Fresh Graduate" },
  { value: 1, label: "1+ tahun" },
  { value: 2, label: "2+ tahun" },
  { value: 3, label: "3+ tahun" },
  { value: 5, label: "5+ tahun" },
];

function FilterContent({
  jobRoles,
  cities,
  filters,
  onFilterChange,
  onClearFilters,
}: JobFilterSidebarProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <X className="h-4 w-4 mr-2" />
          Hapus Semua Filter
        </Button>
      )}

      {/* Job Type Filter */}
      <div>
        <h4 className="font-medium mb-3">Tipe Pekerjaan</h4>
        <div className="space-y-2">
          {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`job-type-${value}`}
                checked={filters.job_type === value}
                onCheckedChange={(checked) =>
                  onFilterChange({
                    ...filters,
                    job_type: checked ? (value as JobType) : undefined,
                  })
                }
              />
              <Label htmlFor={`job-type-${value}`} className="text-sm cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Work System Filter */}
      <div>
        <h4 className="font-medium mb-3">Sistem Kerja</h4>
        <div className="space-y-2">
          {Object.entries(WORK_SYSTEM_LABELS).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`work-system-${value}`}
                checked={filters.work_system === value}
                onCheckedChange={(checked) =>
                  onFilterChange({
                    ...filters,
                    work_system: checked ? (value as WorkSystem) : undefined,
                  })
                }
              />
              <Label htmlFor={`work-system-${value}`} className="text-sm cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Experience Filter */}
      <div>
        <h4 className="font-medium mb-3">Pengalaman Minimal</h4>
        <RadioGroup
          value={filters.experience_min?.toString() ?? ""}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              experience_min: value ? parseInt(value) : undefined,
            })
          }
        >
          {experienceOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`exp-${option.value}`} />
              <Label htmlFor={`exp-${option.value}`} className="text-sm cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Job Role Filter */}
      <div>
        <h4 className="font-medium mb-3">Role Pekerjaan</h4>
        <ScrollArea className="h-[180px]">
          <div className="space-y-2 pr-4">
            {jobRoles.map((role) => (
              <div key={role.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role.id}`}
                  checked={filters.job_role_id === role.id}
                  onCheckedChange={(checked) =>
                    onFilterChange({
                      ...filters,
                      job_role_id: checked ? role.id : undefined,
                    })
                  }
                />
                <Label htmlFor={`role-${role.id}`} className="text-sm cursor-pointer">
                  {role.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* City Filter */}
      <div>
        <h4 className="font-medium mb-3">Kota</h4>
        <ScrollArea className="h-[180px]">
          <div className="space-y-2 pr-4">
            {cities.map((city) => (
              <div key={city.id} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`city-${city.id}`}
                    checked={filters.city_id === city.id}
                    onCheckedChange={(checked) =>
                      onFilterChange({
                        ...filters,
                        city_id: checked ? city.id : undefined,
                      })
                    }
                  />
                  <Label htmlFor={`city-${city.id}`} className="text-sm cursor-pointer">
                    {city.name}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">({city.job_count})</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export function JobFilterSidebar(props: JobFilterSidebarProps) {
  const hasActiveFilters = Object.values(props.filters).some((v) => v !== undefined);
  const filterCount = Object.values(props.filters).filter((v) => v !== undefined).length;

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className="hidden lg:block sticky top-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <FilterContent {...props} />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
              {filterCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {filterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filter Lowongan
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-100px)] mt-4">
              <FilterContent {...props} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
