import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, Building2, Bookmark, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job, JOB_TYPE_LABELS, WORK_SYSTEM_LABELS } from "@/types/job";
import { toast } from "sonner";

interface JobCardProps {
  job: Job;
}

const formatSalary = (min: string | number, max: string | number): string => {
  const minNum = typeof min === "string" ? parseInt(min) : min;
  const maxNum = typeof max === "string" ? parseInt(max) : max;
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}jt`;
    }
    return num.toLocaleString("id-ID");
  };

  if (minNum === 0 && maxNum === 0) return "Negotiable";
  if (maxNum === 0) return `Rp ${formatNumber(minNum)}+`;
  return `Rp ${formatNumber(minNum)} - Rp ${formatNumber(maxNum)}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  return `${Math.floor(diffDays / 30)} bulan yang lalu`;
};

export function JobCard({ job }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Bookmark dihapus" : "Lowongan disimpan");
  };

  return (
    <Link to={`/jobs/${job.slug}`} className="block">
      <div className="bg-card border border-border rounded-lg p-4 sm:p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200 group">
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-muted">
              <img 
                src={job.company.logo} 
                alt={job.company.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{job.company.name}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={handleBookmark}
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              </Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <Badge variant="secondary" className="text-xs font-medium px-2.5 py-0.5">
                {JOB_TYPE_LABELS[job.job_type]}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5">
                {WORK_SYSTEM_LABELS[job.work_system]}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5">
                <Clock className="h-3 w-3 mr-1" />
                {job.min_years_of_experience === 0 
                  ? "Fresh Graduate" 
                  : `${job.min_years_of_experience} Tahun`}
              </Badge>
            </div>

            {/* Location & Salary */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{job.city.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary font-semibold">
                  <Banknote className="h-3.5 w-3.5 shrink-0" />
                  <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDate(job.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
