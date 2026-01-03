import { useParams, Link, useNavigate } from "react-router-dom";
import { ExternalLink, Github, Calendar, Briefcase, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Linkedin, Twitter, Instagram, Facebook, Youtube, Globe, FolderOpen, User } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPortfolioDetailData } from "@/data/mockPortfolios";
import { projectTypeLabels, SocialPlatform } from "@/types/portfolio";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const getSocialIcon = (platform: SocialPlatform) => {
  const iconClass = "h-4 w-4";
  switch (platform) {
    case "linkedin":
      return <Linkedin className={iconClass} />;
    case "github":
      return <Github className={iconClass} />;
    case "twitter":
      return <Twitter className={iconClass} />;
    case "instagram":
      return <Instagram className={iconClass} />;
    case "facebook":
      return <Facebook className={iconClass} />;
    case "youtube":
      return <Youtube className={iconClass} />;
    case "dribbble":
    case "behance":
    case "website":
    default:
      return <Globe className={iconClass} />;
  }
};

export default function PortfolioDetail() {
  const { username, id } = useParams<{ username: string; id: string }>();
  const navigate = useNavigate();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const data = getPortfolioDetailData(username || "", id || "");

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <FolderOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Portfolio tidak ditemukan</h1>
            <p className="text-muted-foreground mb-6">Portfolio yang Anda cari tidak tersedia.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { user, portfolio } = data;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => 
      prev === portfolio.medias.length - 1 ? 0 : prev + 1
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => 
      prev === 0 ? portfolio.medias.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section with Cover */}
      <section className="relative">
        {/* Cover Image */}
        <div className="h-64 lg:h-80 xl:h-96 relative overflow-hidden">
          <img
            src={portfolio.cover}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-4 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm">
              <Link 
                to={`/me/${username}`} 
                className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-background transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
                <span className="sm:hidden">Kembali</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 -mt-20 relative z-10 pb-12 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Card */}
              <Card className="shadow-xl border-border/50">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="default">
                      {projectTypeLabels[portfolio.project_type]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {portfolio.industry}
                    </Badge>
                  </div>
                  
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-4">
                    {portfolio.title}
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {portfolio.sort_description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {portfolio.role_title}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {monthNames[portfolio.month - 1]} {portfolio.year}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {portfolio.live_url && (
                      <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                        <a href={portfolio.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Lihat Live Demo
                        </a>
                      </Button>
                    )}
                    {portfolio.repo_url && (
                      <Button size="lg" variant="outline" asChild>
                        <a href={portfolio.repo_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                      <FolderOpen className="h-4 w-4 text-primary" />
                    </span>
                    Tentang Proyek
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {portfolio.description.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="mb-4 last:mb-0 leading-relaxed text-foreground/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Media Gallery */}
              {portfolio.medias.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                          <MapPin className="h-4 w-4 text-primary" />
                        </span>
                        Galeri Proyek
                      </span>
                      {portfolio.medias.length > 1 && (
                        <Badge variant="outline">
                          {currentMediaIndex + 1} / {portfolio.medias.length}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative group">
                      <div className="aspect-video rounded-xl overflow-hidden bg-muted shadow-lg">
                        <img
                          src={portfolio.medias[currentMediaIndex].path}
                          alt={portfolio.medias[currentMediaIndex].caption}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {portfolio.medias.length > 1 && (
                        <>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={prevMedia}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={nextMedia}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground text-center mt-4 italic">
                      {portfolio.medias[currentMediaIndex].caption}
                    </p>

                    {/* Thumbnails */}
                    {portfolio.medias.length > 1 && (
                      <div className="flex gap-2 mt-6 justify-center flex-wrap">
                        {portfolio.medias.map((media, idx) => (
                          <button
                            key={media.id}
                            onClick={() => setCurrentMediaIndex(idx)}
                            className={`w-16 h-12 lg:w-20 lg:h-14 rounded-lg overflow-hidden transition-all ${
                              idx === currentMediaIndex
                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={media.path}
                              alt={media.caption}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                      <span className="text-primary font-bold text-sm">&lt;/&gt;</span>
                    </span>
                    Teknologi yang Digunakan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.tools.map((tool) => (
                      <Badge 
                        key={tool.id} 
                        variant="secondary" 
                        className="text-sm px-4 py-2 bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {tool.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <Card className="shadow-lg border-border/50 overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-primary/20 to-primary/10" />
                <CardContent className="pt-0 -mt-8">
                  <Link
                    to={`/me/${username}`}
                    className="flex flex-col items-center text-center group"
                  >
                    <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-sm text-primary mb-2">
                      @{user.username}
                    </p>
                  </Link>
                  
                  <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
                    {user.headline}
                  </p>

                  {user.location && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3.5 w-3.5" />
                      {user.location}
                    </div>
                  )}

                  {/* Social Links */}
                  {user.social_links.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex items-center justify-center gap-1.5">
                        {user.social_links.map((social) => (
                          <Button
                            key={social.id}
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
                          >
                            <a href={social.url} target="_blank" rel="noopener noreferrer" title={social.platform}>
                              {getSocialIcon(social.platform)}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </>
                  )}

                  <Separator className="my-4" />
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/me/${username}`}>
                      <User className="h-4 w-4 mr-2" />
                      Lihat Semua Portfolio
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Project Info Card */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Detail Proyek</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Peran</p>
                      <p className="font-medium text-sm">{portfolio.role_title}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Industri</p>
                      <p className="font-medium text-sm">{portfolio.industry}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Periode</p>
                      <p className="font-medium text-sm">{monthNames[portfolio.month - 1]} {portfolio.year}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
          
          {/* Back Button - Full Width at Bottom */}
          <div className="mt-8 lg:hidden">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate(`/me/${username}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Portfolio
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
