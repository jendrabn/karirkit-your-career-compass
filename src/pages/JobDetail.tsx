import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, Building2, GraduationCap, Globe, Mail, Phone, Calendar, Users, Bookmark, List, ExternalLink, Banknote, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ShareMenu } from "@/components/jobs/ShareMenu";
import { getMockJobBySlug } from "@/data/mockJobs";
import { JOB_TYPE_LABELS, WORK_SYSTEM_LABELS, EDUCATION_LEVEL_LABELS, EMPLOYEE_SIZE_LABELS } from "@/types/job";
import { toast } from "sonner";

const formatSalary = (min: string | number, max: string | number): string => {
  const minNum = typeof min === "string" ? parseInt(min) : min;
  const maxNum = typeof max === "string" ? parseInt(max) : max;
  const formatNumber = (num: number) => num.toLocaleString("id-ID");
  if (minNum === 0 && maxNum === 0) return "Negotiable";
  if (maxNum === 0) return `Rp ${formatNumber(minNum)}+`;
  return `Rp ${formatNumber(minNum)} - Rp ${formatNumber(maxNum)}`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const job = getMockJobBySlug(slug || "");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(0);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Bookmark dihapus" : "Lowongan disimpan");
  };

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Lowongan tidak ditemukan</h1>
            <Link to="/jobs">
              <Button>Lihat Semua Lowongan</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const hasMedia = job.medias && job.medias.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/jobs" className="inline-flex items-center text-sm text-primary hover:underline">
              <List className="h-4 w-4 mr-2" />
              Semua Daftar Pekerjaan
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header Card */}
              <Card className="overflow-hidden border-border/50">
                {/* Media Section */}
                {hasMedia && (
                  <div className="relative">
                    <div className="aspect-[21/9] w-full overflow-hidden bg-muted">
                      <img
                        src={job.medias[selectedMedia].path}
                        alt={`${job.title} - Gambar ${selectedMedia + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {job.medias.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {job.medias.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedMedia(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              selectedMedia === index
                                ? "bg-primary scale-125"
                                : "bg-white/70 hover:bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <CardContent className="p-5 sm:p-6">
                  <div className="flex gap-4">
                    {/* Company Logo */}
                    <div className="shrink-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-muted border border-border">
                        <img
                          src={job.company.logo}
                          alt={job.company.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{job.title}</h1>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span className="text-base">{job.company.name}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBookmark}
                            className="h-9"
                          >
                            <Bookmark
                              className={`h-4 w-4 mr-1.5 ${isBookmarked ? "fill-primary text-primary" : ""}`}
                            />
                            {isBookmarked ? "Tersimpan" : "Simpan"}
                          </Button>
                          <ShareMenu url={currentUrl} title={job.title} />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="secondary" className="font-medium">
                          {JOB_TYPE_LABELS[job.job_type]}
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                          {WORK_SYSTEM_LABELS[job.work_system]}
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.city.name}, {job.city.province.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Details Grid */}
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Detail Pekerjaan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Pengalaman</p>
                        <p className="font-medium text-sm">
                          {job.min_years_of_experience === 0 
                            ? "Fresh Graduate" 
                            : `${job.min_years_of_experience}${job.max_years_of_experience ? ` - ${job.max_years_of_experience}` : "+"} tahun`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Pendidikan</p>
                        <p className="font-medium text-sm">{EDUCATION_LEVEL_LABELS[job.education_level]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Kuota</p>
                        <p className="font-medium text-sm">{job.talent_quota} orang</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Berakhir</p>
                        <p className="font-medium text-sm">{formatDate(job.expiration_date)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Deskripsi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                    <p>{job.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Persyaratan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </div>
                </CardContent>
              </Card>

              {/* Media Gallery */}
              {hasMedia && job.medias.length > 1 && (
                <Card className="border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Galeri
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {job.medias.map((media, index) => (
                        <button
                          key={media.id}
                          onClick={() => setSelectedMedia(index)}
                          className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            selectedMedia === index
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-transparent hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={media.path}
                            alt={`Gambar ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Salary Card */}
              <Card className="border-border/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-5">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Banknote className="h-4 w-4" />
                    <span className="text-sm">Gaji per bulan</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </p>
                </div>
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Informasi Kontak</h4>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{job.contact_name}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                        <a href={`mailto:${job.contact_email}`} className="text-primary hover:underline truncate">
                          {job.contact_email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        <a href={`tel:${job.contact_phone}`} className="text-primary hover:underline">
                          {job.contact_phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button asChild className="w-full">
                    <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                      Lamar Sekarang
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Company Card */}
              <Card className="border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Tentang Perusahaan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{job.company.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{job.company.business_sector}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{job.company.description}</p>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2.5">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{EMPLOYEE_SIZE_LABELS[job.company.employee_size]}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{job.company.job_count} lowongan aktif</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a 
                        href={job.company.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline truncate"
                      >
                        {job.company.website_url.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Role Card */}
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Role Pekerjaan</p>
                      <p className="font-medium text-sm">{job.job_role.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posted Date Card */}
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Diposting pada</p>
                      <p className="font-medium text-sm">{formatDate(job.created_at)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
