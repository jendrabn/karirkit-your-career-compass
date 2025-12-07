import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCw, Bell, TrendingUp, Calendar, CheckCircle } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Atur Strategi Karier Anda dengan Lebih Terarah
            </h2>
            <p className="text-muted-foreground text-lg">
              KarirKit membantu Anda mengelola semua berkas dan lamaran kerja dalam satu tempat, sehingga Anda bisa fokus mempersiapkan diri untuk tahap berikutnya.
            </p>
            <div className="space-y-4">
              {[
                { icon: Clock, text: "Pantau progres lamaran secara real time" },
                { icon: RefreshCw, text: "Selaraskan CV, surat lamaran, dan portofolio" },
                { icon: Bell, text: "Minimalkan risiko lupa follow up" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Mockup */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 rounded-2xl card-shadow bg-card col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Statistik Lamaran</h3>
                <Badge variant="secondary">Minggu Ini</Badge>
              </div>
              <div className="flex items-end gap-2 h-24">
                {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${height}%` }}>
                    <div 
                      className="w-full bg-primary rounded-t transition-all"
                      style={{ height: `${Math.random() * 50 + 50}%` }}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 rounded-2xl card-shadow bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-xs text-muted-foreground">Total Lamaran</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-2xl card-shadow bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">5</p>
                  <p className="text-xs text-muted-foreground">Interview</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-2xl card-shadow bg-card col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pengingat Aktif</p>
                    <p className="text-xs text-muted-foreground">Follow up TechnoCorp besok</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
