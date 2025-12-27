import { useState } from "react";
import { Search, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { JobRole, City, JOB_TYPE_LABELS, JobType, WorkSystem } from "@/types/job";
import { cn } from "@/lib/utils";

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
  { value: 0, label: "Kurang dari 1 tahun" },
  { value: 1, label: "1-3 tahun" },
  { value: 3, label: "3-5 tahun" },
  { value: 5, label: "5+ tahun" },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  showMore?: boolean;
  onShowMore?: () => void;
}

function FilterSection({ title, children, defaultOpen = true, showMore, onShowMore }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border last:border-b-0">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-4 hover:bg-muted/50 px-1 -mx-1 rounded transition-colors">
        <span className="font-medium text-foreground">{title}</span>
        <ChevronUp className={cn("h-4 w-4 text-muted-foreground transition-transform", !isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4">
        {children}
        {showMore && (
          <button
            onClick={onShowMore}
            className="text-sm text-muted-foreground hover:text-foreground mt-2 flex items-center justify-end w-full"
          >
            Selengkapnya →
          </button>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

function FilterContent({
  jobRoles,
  cities,
  filters,
  onFilterChange,
}: Omit<JobFilterSidebarProps, "onClearFilters">) {
  const [citySearch, setCitySearch] = useState("");
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const displayedRoles = showAllRoles ? jobRoles : jobRoles.slice(0, 6);
  const displayedCities = showAllCities ? filteredCities : filteredCities.slice(0, 5);

  return (
    <div className="space-y-0">
      {/* Role Pekerjaan */}
      <FilterSection 
        title="Role pekerjaan" 
        showMore={!showAllRoles && jobRoles.length > 6}
        onShowMore={() => setShowAllRoles(true)}
      >
        <div className="space-y-2.5">
          {displayedRoles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2.5">
              <Checkbox
                id={`role-${role.id}`}
                checked={filters.job_role_id === role.id}
                onCheckedChange={(checked) =>
                  onFilterChange({
                    ...filters,
                    job_role_id: checked ? role.id : undefined,
                  })
                }
                className="border-muted-foreground/50"
              />
              <Label htmlFor={`role-${role.id}`} className="text-sm cursor-pointer font-normal text-foreground">
                {role.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Tipe Pekerjaan */}
      <FilterSection title="Tipe pekerjaan">
        <div className="space-y-2.5">
          {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2.5">
              <Checkbox
                id={`job-type-${value}`}
                checked={filters.job_type === value}
                onCheckedChange={(checked) =>
                  onFilterChange({
                    ...filters,
                    job_type: checked ? (value as JobType) : undefined,
                  })
                }
                className="border-muted-foreground/50"
              />
              <Label htmlFor={`job-type-${value}`} className="text-sm cursor-pointer font-normal text-foreground">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Kota */}
      <FilterSection 
        title="Kota"
        showMore={!showAllCities && filteredCities.length > 5}
        onShowMore={() => setShowAllCities(true)}
      >
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tulis kota"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="space-y-2.5">
            {displayedCities.map((city) => (
              <div key={city.id} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`city-${city.id}`}
                  checked={filters.city_id === city.id}
                  onCheckedChange={(checked) =>
                    onFilterChange({
                      ...filters,
                      city_id: checked ? city.id : undefined,
                    })
                  }
                  className="border-muted-foreground/50"
                />
                <Label htmlFor={`city-${city.id}`} className="text-sm cursor-pointer font-normal text-foreground">
                  {city.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Pengalaman Bekerja */}
      <FilterSection title="Pengalaman bekerja">
        <div className="space-y-2.5">
          {experienceOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2.5">
              <Checkbox
                id={`exp-${option.value}`}
                checked={filters.experience_min === option.value}
                onCheckedChange={(checked) =>
                  onFilterChange({
                    ...filters,
                    experience_min: checked ? option.value : undefined,
                  })
                }
                className="border-muted-foreground/50"
              />
              <Label htmlFor={`exp-${option.value}`} className="text-sm cursor-pointer font-normal text-foreground">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

export function JobFilterSidebar(props: JobFilterSidebarProps) {
  const filterCount = Object.values(props.filters).filter((v) => v !== undefined).length;

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className="hidden lg:block bg-card">
        <CardContent className="p-5">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <FilterContent {...props} />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
              {filterCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {filterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96 bg-card">
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
