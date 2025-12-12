import { FileText, Mail, Users, LayoutTemplate } from "lucide-react";

const stats = [
  {
    icon: FileText,
    value: "3.6rb+",
    label: "CV Dibuat",
  },
  {
    icon: Mail,
    value: "1.1jt+",
    label: "Surat Lamaran Dibuat",
  },
  {
    icon: Users,
    value: "32.7rb+",
    label: "Pengguna Terdaftar",
  },
  {
    icon: LayoutTemplate,
    value: "7+",
    label: "Pilihan Template",
  },
];

export function StatsSection() {
  return (
    <section className="py-8 bg-[hsl(230,70%,50%)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center py-4"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
