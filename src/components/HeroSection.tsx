import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Briefcase, User, Check, Clock, X } from "lucide-react";

export function HeroSection() {
  return (
    <section id="beranda" className="hero-gradient py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient leading-tight">
              Kelola Semua Lamaran Kerja Anda dengan Lebih Mudah
            </h1>
            <p className="text-lg text-foreground/90">
              Platform all-in-one untuk melacak lamaran kerja, membuat CV profesional, menyusun surat lamaran, dan membangun portofolio digital.
            </p>
            <p className="text-muted-foreground">
              Gunakan Application Tracker untuk memonitor progres lamaran, buat CV dan Surat Lamaran yang profesional, serta bangun Portofolio yang memukau. Semua alat yang Anda butuhkan untuk menonjol di dunia kerja dalam satu platform yang intuitif.
            </p>
            <div className="pt-4">
              <Button variant="hero" size="lg">
                Daftar Sekarang
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Application Tracker, CV Builder, Surat Lamaran, dan Portofolio — semuanya gratis dalam satu platform.
              </p>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-accent rounded-3xl p-6 lg:p-8">
              {/* Decorative elements */}
              <div className="absolute top-4 right-12 w-3 h-3 bg-amber-400 rounded-full" />
              <div className="absolute top-6 right-8 w-2 h-2 bg-rose-400 rounded-full" />
              <div className="absolute top-12 right-4 w-4 h-4 text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>

              {/* Recruiter Card */}
              <div className="absolute -top-4 left-8 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2 z-10">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Recruiter</span>
              </div>

              {/* Job Seeker Card */}
              <div className="absolute top-24 -left-4 bg-card rounded-xl shadow-lg p-3 flex items-center gap-2 z-10">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">Job Seeker</span>
              </div>

              {/* Main Profile Card */}
              <div className="bg-card rounded-2xl shadow-xl p-4 ml-8 mt-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-20 bg-muted rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-2 bg-muted rounded w-1/2" />
                    <div className="h-2 bg-muted rounded w-2/3" />
                  </div>
                </div>

                {/* Profile Detail */}
                <div className="bg-card rounded-xl border border-border p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">Jessica Lee</p>
                      <p className="text-xs text-muted-foreground">Senior Software engineer</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Connect</Button>
                    <Button size="sm" variant="outline" className="w-10 p-0">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Application Status List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium">Senior Software engineer</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Applied</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-amber-100 rounded flex items-center justify-center">
                        <Clock className="w-3 h-3 text-amber-600" />
                      </div>
                      <span className="text-xs font-medium">Software engineer</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">Interview</Badge>
                  </div>
                </div>
              </div>

              {/* Side Panel Card */}
              <div className="absolute -right-4 top-32 bg-card rounded-xl shadow-lg p-3 w-40 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">Jerry Wang</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="w-4 h-4 rounded bg-muted" />
                    <span>Business Dev Manager</span>
                  </div>
                </div>
              </div>

              {/* Bottom Portfolio Cards */}
              <div className="absolute -bottom-4 right-8 flex gap-2 z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-md" />
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md" />
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
