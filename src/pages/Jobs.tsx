import { useState, useEffect } from "react";
import { Briefcase, Loader2, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilterSidebar } from "@/components/jobs/JobFilterSidebar";
import { JobPagination } from "@/components/jobs/JobPagination";
import { getMockJobsResponse, mockJobRoles, mockCities } from "@/data/mockJobs";
import { Job, JobType, WorkSystem } from "@/types/job";

interface JobFilters {
  job_type?: JobType;
  work_system?: WorkSystem;
  job_role_id?: string;
  city_id?: string;
  experience_min?: number;
}

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filters, setFilters] = useState<JobFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const perPage = 10;

  useEffect(() => {
    fetchJobs();
  }, [appliedSearch, filters, currentPage]);

  const fetchJobs = () => {
    setIsLoading(true);

    setTimeout(() => {
      const response = getMockJobsResponse({
        page: currentPage,
        per_page: perPage,
        q: appliedSearch || undefined,
        job_type: filters.job_type,
        work_system: filters.work_system,
        job_role_id: filters.job_role_id,
        city_id: filters.city_id,
        experience_min: filters.experience_min,
      });

      setJobs(response.data.items);
      setTotalPages(response.data.pagination.total_pages);
      setTotalItems(response.data.pagination.total_items);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    setAppliedSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Job List */}
            <div className="flex-1 order-2 lg:order-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  Daftar Pekerjaan Terbaru
                </h1>
                <div className="lg:hidden">
                  <JobFilterSidebar
                    jobRoles={mockJobRoles}
                    cities={mockCities}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>

              {/* Results Info */}
              {!isLoading && (
                <p className="text-sm text-muted-foreground mb-4">
                  Menampilkan <strong className="text-foreground">{jobs.length}</strong> dari{" "}
                  <strong className="text-foreground">{totalItems}</strong> lowongan
                </p>
              )}

              {/* Job Cards */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-lg border">
                  <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tidak ada lowongan ditemukan</h3>
                  <p className="text-muted-foreground">
                    Coba ubah filter atau kata kunci pencarian Anda
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && jobs.length > 0 && (
                <div className="mt-8">
                  <JobPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            {/* Right Side - Search & Filter */}
            <div className="w-full lg:w-80 order-1 lg:order-2 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Pekerjaan apa yang sedang kamu cari?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-4 h-11 bg-card"
                />
              </div>

              {/* Filter Sidebar - Desktop */}
              <div className="hidden lg:block">
                <JobFilterSidebar
                  jobRoles={mockJobRoles}
                  cities={mockCities}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
