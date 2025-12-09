export function TrustedBySection() {
  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png",
    },
    {
      name: "Gojek",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Gojek_logo_2019.svg/200px-Gojek_logo_2019.svg.png",
    },
    {
      name: "Tokopedia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tokopedia.svg/200px-Tokopedia.svg.png",
    },
    {
      name: "Shopee",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/200px-Shopee.svg.png",
    },
    {
      name: "Bukalapak",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Bukalapak-logo.svg/200px-Bukalapak-logo.svg.png",
    },
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
              className="flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={`Logo ${company.name}`}
                className="max-h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
