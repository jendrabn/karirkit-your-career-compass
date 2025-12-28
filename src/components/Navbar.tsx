import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, LogOut, User, Home, FileText, Briefcase, FolderOpen, Globe, Sun, Moon, Monitor, Heart } from "lucide-react";
import logo from "@/assets/karirkit-logo.png";
import { DonationModal } from "./DonationModal";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/hooks/use-theme";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#fitur", label: "Fitur" },
  { href: "/jobs", label: "Info Loker" },
  { href: "/blog", label: "Blog" },
];

interface NavbarProps {
  isLoggedIn?: boolean;
  onLoginToggle?: () => void;
}

export function Navbar({ isLoggedIn = false, onLoginToggle }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="KarirKit Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation - Centered with pill style */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 rounded-full bg-muted/50 p-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isHashLink = link.href.startsWith("/#");
                
                if (isHashLink) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setDonationModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
            >
              <Heart className="h-4 w-4" />
              <span>Donasi</span>
            </button>
            <ThemeToggle />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Selena Gomez" />
                      <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">Selena Gomez</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover">
                  <DropdownMenuItem className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Halaman Utama
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Application Tracker
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Surat Lamaran
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    CV
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Portofolio
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Akun
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Globe className="mr-2 h-4 w-4" />
                      Bahasa Indonesia
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-popover">
                        <DropdownMenuItem className="cursor-pointer">Bahasa Indonesia</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {theme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : theme === "light" ? <Sun className="mr-2 h-4 w-4" /> : <Monitor className="mr-2 h-4 w-4" />}
                      Tema
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-popover">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
                          <Sun className="mr-2 h-4 w-4" />
                          Terang
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
                          <Moon className="mr-2 h-4 w-4" />
                          Gelap
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
                          <Monitor className="mr-2 h-4 w-4" />
                          Sistem
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive" onClick={onLoginToggle}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                  <Link to="/auth/login">Masuk</Link>
                </Button>
                <Button variant="default" asChild className="rounded-full px-6">
                  <Link to="/auth/register">Daftar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Theme Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isHashLink = link.href.startsWith("/#");
                
                if (isHashLink) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDonationModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg text-left"
              >
                <Heart className="h-4 w-4" />
                Donasi
              </button>
              <div className="flex gap-3 pt-4 mt-2 border-t border-border">
                {isLoggedIn ? (
                  <Button variant="outline" className="flex-1" onClick={onLoginToggle}>
                    Keluar
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/auth/login">Masuk</Link>
                    </Button>
                    <Button variant="default" className="flex-1 rounded-full" asChild>
                      <Link to="/auth/register">Daftar</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <DonationModal open={donationModalOpen} onOpenChange={setDonationModalOpen} />
    </>
  );
}
