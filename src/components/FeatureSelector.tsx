import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, FileCheck, FolderOpen, Check, Clock, ArrowRight, Calendar, Bell } from "lucide-react";

const features = [
  {
    id: "tracker",
    icon: Briefcase,
    title: "Application Tracker",
    subtitle: "Pantau setiap lamaran kerja dalam satu tempat.",
  },
  {
    id: "surat",
    icon: FileText,
    title: "Surat Lamaran",
    subtitle: "Buat surat lamaran profesional dalam hitungan menit.",
  },
  {
    id: "cv",
    icon: FileCheck,
    title: "CV Builder",
    subtitle: "CV rapi dan modern yang disukai perekrut.",
  },
  {
    id: "portofolio",
    icon: FolderOpen,
    title: "Portofolio",
    subtitle: "Tampilkan karya terbaik Anda secara digital.",
  },
];

export function FeatureSelector() {
  return (
    <section id="application-tracker" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <Tabs defaultValue="tracker" className="w-full">
          {/* Feature Cards as Tab Triggers */}
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto bg-transparent p-0 mb-12">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="group data-[state=active]:bg-secondary data-[state=active]:border-primary data-[state=active]:shadow-lg border-2 border-transparent bg-card rounded-2xl p-6 h-auto flex flex-col items-center text-center gap-3 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary group-data-[state=active]:bg-primary/20 flex items-center justify-center transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{feature.subtitle}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="tracker" className="mt-0">
            <FeatureDetail
              title="Lacak Semua Lamaran Kerja Tanpa Bingung"
              description="Simpan semua lamaran Anda dalam satu tampilan. Lihat status setiap lamaran, mulai dari dikirim, diproses, interview, hingga offer."
              bullets={[
                "Timeline status lamaran yang jelas",
                "Catatan interview dan feedback",
                "Pengingat tindak lanjut agar tidak terlewat",
              ]}
              cta="Pelajari cara kerja Application Tracker"
              mockup={<TrackerMockup />}
            />
          </TabsContent>

          <TabsContent value="surat" className="mt-0" id="surat-lamaran">
            <FeatureDetail
              title="Buat Surat Lamaran yang Meyakinkan"
              description="Gunakan template surat lamaran dengan bahasa profesional. Sesuaikan untuk setiap posisi hanya dalam beberapa klik."
              bullets={[
                "Template siap pakai untuk berbagai jenis pekerjaan",
                "Data otomatis terisi dari profil dan CV",
                "Ekspor ke PDF dalam sekali klik",
              ]}
              cta="Pelajari cara membuat Surat Lamaran"
              mockup={<SuratMockup />}
            />
          </TabsContent>

          <TabsContent value="cv" className="mt-0" id="cv">
            <FeatureDetail
              title="CV Modern yang Menonjol di Mata Rekruter"
              description="Bangun CV rapi dan terstruktur tanpa perlu desain rumit. Cocok untuk fresh graduate maupun profesional berpengalaman."
              bullets={[
                "Template CV modern dan mudah dibaca",
                "Bagian-bagian yang sudah terstruktur (pengalaman, pendidikan, skill)",
                "Ekspor ke PDF dan bagikan link online",
              ]}
              cta="Pelajari cara membuat CV"
              mockup={<CVMockup />}
            />
          </TabsContent>

          <TabsContent value="portofolio" className="mt-0" id="portofolio">
            <FeatureDetail
              title="Tunjukkan Keahlian Anda dengan Portofolio Digital"
              description="Kumpulkan hasil karya terbaik Anda—gambar, video, link, dan studi kasus—dalam satu halaman portofolio yang mudah dibagikan."
              bullets={[
                "Galeri visual yang menarik",
                "Tautan publik yang bisa dikirim ke recruiter",
                "Cocok untuk desainer, developer, kreator konten, dan lainnya",
              ]}
              cta="Pelajari cara membuat Portofolio"
              mockup={<PortfolioMockup />}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface FeatureDetailProps {
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  mockup: React.ReactNode;
}

function FeatureDetail({ title, description, bullets, cta, mockup }: FeatureDetailProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground text-lg">{description}</p>
        <ul className="space-y-3">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">{bullet}</span>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="order-first lg:order-last">{mockup}</div>
    </div>
  );
}

function TrackerMockup() {
  return (
    <Card className="p-6 rounded-2xl card-shadow bg-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Daftar Lamaran</h3>
          <Badge variant="secondary">12 Aktif</Badge>
        </div>
        {[
          { company: "TechnoCorp", role: "Frontend Developer", status: "Applied", color: "bg-primary/10 text-primary" },
          { company: "Nusantara Bank", role: "UI Designer", status: "Interview", color: "bg-amber-100 text-amber-700" },
          { company: "Sejahtera Group", role: "Product Manager", status: "Offer", color: "bg-emerald-100 text-emerald-700" },
          { company: "Digital Nusa", role: "Software Engineer", status: "Rejected", color: "bg-destructive/10 text-destructive" },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.role}</p>
                <p className="text-xs text-muted-foreground">{item.company}</p>
              </div>
            </div>
            <Badge variant="secondary" className={item.color}>{item.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SuratMockup() {
  return (
    <Card className="p-6 rounded-2xl card-shadow bg-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Editor Surat Lamaran</h3>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 space-y-3">
          <div className="h-3 bg-primary/20 rounded w-1/3" />
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-2 bg-muted rounded w-5/6" />
          <div className="h-2 bg-muted rounded w-4/5" />
          <div className="h-4" />
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-2 bg-muted rounded w-3/4" />
          <div className="h-2 bg-muted rounded w-5/6" />
          <div className="h-2 bg-muted rounded w-2/3" />
        </div>
        <div className="flex gap-2 pt-2">
          <Badge variant="secondary" className="bg-secondary">Template: Formal</Badge>
          <Badge variant="secondary" className="bg-secondary">Bahasa: Indonesia</Badge>
        </div>
      </div>
    </Card>
  );
}

function CVMockup() {
  return (
    <Card className="p-6 rounded-2xl card-shadow bg-card">
      <div className="flex gap-4">
        <div className="w-1/3 space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 mx-auto" />
          <div className="space-y-2 text-center">
            <div className="h-3 bg-primary/20 rounded w-full" />
            <div className="h-2 bg-muted rounded w-3/4 mx-auto" />
          </div>
          <div className="space-y-1 pt-4">
            <div className="h-2 bg-muted rounded w-full" />
            <div className="h-2 bg-muted rounded w-3/4" />
            <div className="h-2 bg-muted rounded w-5/6" />
          </div>
        </div>
        <div className="w-2/3 space-y-4 border-l border-border pl-4">
          <div>
            <div className="h-3 bg-primary/20 rounded w-1/3 mb-2" />
            <div className="h-2 bg-muted rounded w-full" />
            <div className="h-2 bg-muted rounded w-5/6 mt-1" />
          </div>
          <div>
            <div className="h-3 bg-primary/20 rounded w-1/4 mb-2" />
            <div className="h-2 bg-muted rounded w-full" />
            <div className="h-2 bg-muted rounded w-3/4 mt-1" />
          </div>
          <div>
            <div className="h-3 bg-primary/20 rounded w-1/5 mb-2" />
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">React</Badge>
              <Badge variant="secondary" className="text-xs">TypeScript</Badge>
              <Badge variant="secondary" className="text-xs">Node.js</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PortfolioMockup() {
  return (
    <Card className="p-6 rounded-2xl card-shadow bg-card">
      <div className="grid grid-cols-2 gap-3">
        <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-400 to-blue-600" />
        <div className="aspect-video rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600" />
        <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-400 to-purple-600" />
        <div className="aspect-video rounded-xl bg-gradient-to-br from-amber-400 to-amber-600" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20" />
          <div>
            <div className="h-2 bg-muted rounded w-20" />
            <div className="h-2 bg-muted rounded w-16 mt-1" />
          </div>
        </div>
        <Badge variant="secondary" className="bg-secondary">4 Proyek</Badge>
      </div>
    </Card>
  );
}
