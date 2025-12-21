import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import heroTracker from "@/assets/hero-tracker.png";
import heroPortfolio from "@/assets/hero-portfolio.png";
import heroCVSample from "@/assets/hero-cv-sample.png";

export function HeroSection() {
  return (
    <section id="beranda" className="hero-gradient py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Platform Gratis untuk Karier Anda</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient leading-tight">
              Kelola Semua Lamaran Kerja Anda dengan Lebih Mudah
            </h1>
            <p className="text-lg lg:text-xl text-foreground/90 leading-relaxed">
              Platform all-in-one untuk melacak lamaran kerja, membuat CV profesional, menyusun surat lamaran, dan membangun portofolio digital.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "Application Tracker",
                "CV Builder",
                "Surat Lamaran",
                "Portofolio Digital"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" className="group h-14 px-8 text-base">
                Daftar Sekarang — Gratis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base">
                Lihat Fitur
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Tidak perlu kartu kredit • Akses semua fitur dasar
            </p>
          </div>

          {/* Right Content - Feature Showcase */}
          <div className="relative">
            {/* Main Application Tracker Screenshot - Highlighted */}
            <div className="relative z-20">
              <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-30 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Fitur Utama
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary/20 bg-card">
                <img
                  src={heroTracker}
                  alt="Application Tracker - Pelacak Lamaran Kerja"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Portfolio Screenshot - Bottom Left */}
            <div className="absolute -bottom-8 -left-8 w-48 lg:w-56 z-10 hidden lg:block">
              <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-border/50 bg-card transform hover:scale-105 transition-transform duration-300">
                <img
                  src={heroPortfolio}
                  alt="Portfolio Digital"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 bg-card text-foreground px-3 py-1 rounded-full text-xs font-medium shadow-md border border-border">
                Portfolio
              </div>
            </div>

            {/* CV Sample - Bottom Right */}
            <div className="absolute -bottom-4 -right-4 w-32 lg:w-40 z-10 hidden lg:block">
              <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-border/50 bg-card transform hover:scale-105 transition-transform duration-300">
                <img
                  src={heroCVSample}
                  alt="CV ATS Template - John Doe"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-3 -left-3 bg-card text-foreground px-3 py-1 rounded-full text-xs font-medium shadow-md border border-border">
                CV ATS
              </div>
            </div>

            {/* Floating Status Card */}
            <div className="absolute top-4 -right-4 bg-card rounded-xl p-3 shadow-xl border border-border/50 hidden lg:flex items-center gap-3 animate-bounce z-30" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-semibold text-primary">Interview!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}