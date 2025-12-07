import { Linkedin, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/karirkit-logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* KarirKit Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="KarirKit" className="h-8 w-auto brightness-0 invert" />
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Karier
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Produk Column */}
          <div>
            <h3 className="font-semibold mb-4">Produk</h3>
            <ul className="space-y-2">
              <li>
                <a href="#application-tracker" className="text-sm text-background/70 hover:text-background transition-colors">
                  Application Tracker
                </a>
              </li>
              <li>
                <a href="#cv" className="text-sm text-background/70 hover:text-background transition-colors">
                  CV Builder
                </a>
              </li>
              <li>
                <a href="#surat-lamaran" className="text-sm text-background/70 hover:text-background transition-colors">
                  Surat Lamaran
                </a>
              </li>
              <li>
                <a href="#portofolio" className="text-sm text-background/70 hover:text-background transition-colors">
                  Portofolio
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan Column */}
          <div>
            <h3 className="font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <p className="text-sm text-background/60 text-center">
            © {currentYear} KarirKit. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
