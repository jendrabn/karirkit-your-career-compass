import { Link } from "react-router-dom";
import { MapPin, Building2, Briefcase, Calendar, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Job, JOB_TYPE_LABELS } from "@/types/job";

interface JobCardProps {
  job: Job;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Link to={`/jobs/${job.slug}`}>
      <Card className="hover:shadow-md transition-all hover:border-primary/30 cursor-pointer group bg-card">
        <CardContent className="p-4 sm:p-5">
          <div className="flex gap-4">
            {/* Company Logo */}
            <Avatar className="h-12 w-12 rounded-lg shrink-0 border">
              <AvatarImage src={job.company.logo} alt={job.company.name} className="object-contain" />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                {job.company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{job.company.name}</span>
                    </div>
                    <span className="text-primary font-medium">{JOB_TYPE_LABELS[job.job_type]}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.city.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>
                        {job.min_years_of_experience === 0
                          ? "Kurang dari setahun"
                          : `${job.min_years_of_experience}-${job.max_years_of_experience || job.min_years_of_experience + 2} tahun`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Bookmark & Dates */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <div className="text-right text-xs text-muted-foreground hidden sm:block">
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3" />
                      <span>Dibuat pada {formatDate(job.created_at)}</span>
                    </div>
                    <div className="mt-0.5">
                      Batas akhir lamaran {formatDate(job.expiration_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
