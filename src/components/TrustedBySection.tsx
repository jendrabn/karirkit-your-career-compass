export function TrustedBySection() {
  const companies = [
    "TechnoCorp",
    "Nusantara Bank",
    "Sejahtera Group",
    "Digital Nusa",
    "Inovasi Media",
    "Karya Prima",
    "Maju Bersama",
    "Solusi Teknologi",
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-muted-foreground mb-8">
          Dipercaya oleh pencari kerja dan profesional dari berbagai perusahaan
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-12"
            >
              <div className="px-4 py-2 rounded-lg bg-card border border-border/50">
                <span className="text-sm font-semibold text-muted-foreground/70">{company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
