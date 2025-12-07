import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export function MobileAppSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-primary-foreground">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Akses KarirKit Kapan Saja
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Pantau lamaran dan perbarui CV langsung dari perangkat Anda.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 12.5c0-1.58-.79-2.98-2-3.87l.72-.72a.75.75 0 0 0-1.06-1.06l-.84.84A4.98 4.98 0 0 0 12 7a4.98 4.98 0 0 0-2.32.69l-.84-.84a.75.75 0 0 0-1.06 1.06l.72.72a4.98 4.98 0 0 0-2 3.87c0 2.76 2.24 5 5 5s5-2.24 5-5zm-9 0c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
                </svg>
                App Store
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="flex justify-center gap-4">
            <Card className="w-40 h-80 rounded-3xl p-3 bg-card shadow-2xl -rotate-6">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-secondary to-muted overflow-hidden">
                <div className="p-3 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20" />
                  <div className="h-2 bg-primary/20 rounded w-3/4" />
                  <div className="h-2 bg-muted-foreground/20 rounded w-1/2" />
                  <div className="mt-4 space-y-2">
                    <div className="h-8 bg-card rounded-lg" />
                    <div className="h-8 bg-card rounded-lg" />
                    <div className="h-8 bg-card rounded-lg" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="w-40 h-80 rounded-3xl p-3 bg-card shadow-2xl rotate-6 mt-8">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-secondary to-muted overflow-hidden">
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-primary/20 rounded w-1/2" />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg" />
                    <div className="aspect-square bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg" />
                    <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg" />
                    <div className="aspect-square bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
