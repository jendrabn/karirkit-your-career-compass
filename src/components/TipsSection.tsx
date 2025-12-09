import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Contoh CV untuk Fresh Graduate",
    description: "Pelajari cara membuat CV yang menarik perhatian HRD meski belum punya pengalaman kerja.",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Cara Menulis Surat Lamaran yang Menarik",
    description: "Tips menulis surat lamaran yang profesional dan membuat recruiter tertarik membaca CV Anda.",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Tips Membuat Portofolio Online",
    description: "Panduan lengkap membangun portofolio digital yang memukau untuk berbagai bidang profesi.",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Strategi Mengelola Banyak Lamaran Kerja",
    description: "Cara efektif melacak dan mengelola puluhan lamaran kerja tanpa kehilangan jejak.",
    color: "from-amber-400 to-amber-600",
  },
];

export function TipsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-primary font-medium mb-2">Blog & Tips</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Temukan Panduan dan Tips Karir
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden rounded-2xl card-shadow bg-card hover:card-shadow-hover transition-all group cursor-pointer">
              <div className={`h-32 bg-gradient-to-br ${article.color}`} />
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.description}
                </p>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                >
                  Baca selengkapnya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
