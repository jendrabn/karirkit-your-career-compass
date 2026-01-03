import { useState } from "react";
import { X, SlidersHorizontal, ChevronDown, ChevronUp, Search, Briefcase, MapPin, TrendingUp, Banknote, GraduationCap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { JobRole, City, JOB_TYPE_LABELS, WORK_SYSTEM_LABELS, EDUCATION_LEVEL_LABELS, JobType, WorkSystem, EducationLevel, Company } from "@/types/job";

interface JobFilters {
  job_types?: JobType[];
  work_systems?: WorkSystem[];
  job_role_ids?: string[];
  city_ids?: string[];
  company_ids?: string[];
  experience_min?: number;
  salary_min?: number;
  education_levels?: EducationLevel[];
}

interface JobFilterSidebarProps {
  jobRoles: JobRole[];
  cities: City[];
  companies: Company[];
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
}

const experienceOptions = [
  { value: 0, label: "Kurang dari 1 tahun" },
  { value: 1, label: "1-3 tahun" },
  { value: 4, label: "4-5 tahun" },
  { value: 6, label: "6-10 tahun" },
  { value: 10, label: "Lebih dari 10 tahun" },
];

const salaryOptions = [
  { value: 3000000, label: "Min. Rp 3.000.000" },
  { value: 5000000, label: "Min. Rp 5.000.000" },
  { value: 8000000, label: "Min. Rp 8.000.000" },
  { value: 10000000, label: "Min. Rp 10.000.000" },
  { value: 20000000, label: "Min. Rp 20.000.000" },
];

function FilterSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border last:border-b-0">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-4 hover:text-primary transition-colors">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function FilterContent({
  jobRoles,
  cities,
  companies,
  filters,
  onFilterChange,
  onClearFilters,
}: JobFilterSidebarProps) {
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");

  const hasActiveFilters = 
    (filters.job_types?.length || 0) > 0 ||
    (filters.work_systems?.length || 0) > 0 ||
    (filters.job_role_ids?.length || 0) > 0 ||
    (filters.city_ids?.length || 0) > 0 ||
    (filters.company_ids?.length || 0) > 0 ||
    (filters.education_levels?.length || 0) > 0 ||
    filters.experience_min !== undefined ||
    filters.salary_min !== undefined;

  const handleJobTypeChange = (value: JobType, checked: boolean) => {
    const current = filters.job_types || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange({ ...filters, job_types: updated.length > 0 ? updated : undefined });
  };

  const handleWorkSystemChange = (value: WorkSystem, checked: boolean) => {
    const current = filters.work_systems || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange({ ...filters, work_systems: updated.length > 0 ? updated : undefined });
  };

  const handleJobRoleChange = (value: string, checked: boolean) => {
    const current = filters.job_role_ids || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange({ ...filters, job_role_ids: updated.length > 0 ? updated : undefined });
  };

  const handleCityChange = (value: string, checked: boolean) => {
    const current = filters.city_ids || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange({ ...filters, city_ids: updated.length > 0 ? updated : undefined });
  };

  const handleCompanyChange = (value: string, checked: boolean) => {
    const current = filters.company_ids || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange({ ...filters, company_ids: updated.length > 0 ? updated : undefined });
  };

  const handleExperienceChange = (value: number, checked: boolean) => {
    onFilterChange({
      ...filters,
      experience_min: checked ? value : undefined,
    });
  };

  const handleSalaryChange = (value: number, checked: boolean) => {
    onFilterChange({
      ...filters,
      salary_min: checked ? value : undefined,
    });
  };

  const handleEducationChange = (value: EducationLevel, checked: boolean) => {
    const current = filters.education_levels || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onFilterChange({ ...filters, education_levels: updated.length > 0 ? updated : undefined });
  };

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(companySearch.toLowerCase())
  );

  const displayedRoles = showAllRoles ? jobRoles : jobRoles.slice(0, 5);
  const displayedCities = showAllCities ? filteredCities : filteredCities.slice(0, 5);
  const displayedCompanies = showAllCompanies ? filteredCompanies : filteredCompanies.slice(0, 5);
  
  const educationEntries = Object.entries(EDUCATION_LEVEL_LABELS);
  const displayedEducation = showAllEducation ? educationEntries : educationEntries.slice(0, 5);

  return (
    <div className="space-y-0">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full justify-start text-destructive hover:text-destructive mb-2"
        >
          <X className="h-4 w-4 mr-2" />
          Hapus Semua Filter
        </Button>
      )}

      {/* Job Role Filter */}
      <FilterSection title="Role Pekerjaan" icon={Briefcase}>
        <div className="space-y-3">
          {displayedRoles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <Checkbox
                id={`role-${role.id}`}
                checked={filters.job_role_ids?.includes(role.id) || false}
                onCheckedChange={(checked) =>
                  handleJobRoleChange(role.id, checked as boolean)
                }
              />
              <Label htmlFor={`role-${role.id}`} className="text-sm cursor-pointer font-normal">
                {role.name}
              </Label>
            </div>
          ))}
          {jobRoles.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllRoles(!showAllRoles)}
              className="text-sm text-primary hover:underline"
            >
              {showAllRoles ? "Tampilkan lebih sedikit" : "Lihat lebih banyak"}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Job Type Filter */}
      <FilterSection title="Tipe Pekerjaan" icon={Briefcase}>
        <div className="space-y-3">
          {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`job-type-${value}`}
                checked={filters.job_types?.includes(value as JobType) || false}
                onCheckedChange={(checked) =>
                  handleJobTypeChange(value as JobType, checked as boolean)
                }
              />
              <Label htmlFor={`job-type-${value}`} className="text-sm cursor-pointer font-normal">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* City Filter */}
      <FilterSection title="Kota" icon={MapPin}>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tulis kota"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          {displayedCities.map((city) => (
            <div key={city.id} className="flex items-center space-x-2">
              <Checkbox
                id={`city-${city.id}`}
                checked={filters.city_ids?.includes(city.id) || false}
                onCheckedChange={(checked) =>
                  handleCityChange(city.id, checked as boolean)
                }
              />
              <Label htmlFor={`city-${city.id}`} className="text-sm cursor-pointer font-normal">
                {city.name}
              </Label>
            </div>
          ))}
          {filteredCities.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllCities(!showAllCities)}
              className="text-sm text-primary hover:underline"
            >
              {showAllCities ? "Tampilkan lebih sedikit" : "Lihat lebih banyak"}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Experience Filter */}
      <FilterSection title="Pengalaman Bekerja" icon={TrendingUp}>
        <div className="space-y-3">
          {experienceOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`exp-${option.value}`}
                checked={filters.experience_min === option.value}
                onCheckedChange={(checked) =>
                  handleExperienceChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`exp-${option.value}`} className="text-sm cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Salary Filter */}
      <FilterSection title="Gaji Minimum" icon={Banknote}>
        <div className="space-y-3">
          {salaryOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`salary-${option.value}`}
                checked={filters.salary_min === option.value}
                onCheckedChange={(checked) =>
                  handleSalaryChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`salary-${option.value}`} className="text-sm cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Education Level Filter */}
      <FilterSection title="Level Pendidikan" icon={GraduationCap}>
        <div className="space-y-3">
          {displayedEducation.map(([value, label]) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`edu-${value}`}
                checked={filters.education_levels?.includes(value as EducationLevel) || false}
                onCheckedChange={(checked) =>
                  handleEducationChange(value as EducationLevel, checked as boolean)
                }
              />
              <Label htmlFor={`edu-${value}`} className="text-sm cursor-pointer font-normal">
                {label}
              </Label>
            </div>
          ))}
          {educationEntries.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllEducation(!showAllEducation)}
              className="text-sm text-primary hover:underline"
            >
              {showAllEducation ? "Tampilkan lebih sedikit" : "Lihat lebih banyak"}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Company Filter */}
      <FilterSection title="Perusahaan" icon={Building2}>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari perusahaan"
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          {displayedCompanies.map((company) => (
            <div key={company.id} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${company.id}`}
                checked={filters.company_ids?.includes(company.id) || false}
                onCheckedChange={(checked) =>
                  handleCompanyChange(company.id, checked as boolean)
                }
              />
              <Label htmlFor={`company-${company.id}`} className="text-sm cursor-pointer font-normal">
                {company.name}
              </Label>
            </div>
          ))}
          {filteredCompanies.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllCompanies(!showAllCompanies)}
              className="text-sm text-primary hover:underline"
            >
              {showAllCompanies ? "Tampilkan lebih sedikit" : "Lihat lebih banyak"}
            </button>
          )}
        </div>
      </FilterSection>
    </div>
  );
}

export function JobFilterSidebar(props: JobFilterSidebarProps) {
  const filterCount = 
    (props.filters.job_types?.length || 0) +
    (props.filters.work_systems?.length || 0) +
    (props.filters.job_role_ids?.length || 0) +
    (props.filters.city_ids?.length || 0) +
    (props.filters.company_ids?.length || 0) +
    (props.filters.education_levels?.length || 0) +
    (props.filters.experience_min !== undefined ? 1 : 0) +
    (props.filters.salary_min !== undefined ? 1 : 0);

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className="hidden lg:block sticky top-6 border-border/50">
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-5">
              <FilterContent {...props} />
            </div>
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
          <SheetContent side="right" className="w-full sm:w-96 p-0">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filter Lowongan
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-4">
                <FilterContent {...props} />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export type { JobFilters };
