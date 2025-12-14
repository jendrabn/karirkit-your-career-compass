import { useParams, Link, useNavigate } from "react-router-dom";
import { ExternalLink, Github, Calendar, Briefcase, MapPin, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getPortfolioDetailData } from "@/data/mockPortfolios";
import { projectTypeLabels } from "@/types/portfolio";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function PortfolioDetail() {
  const { username, id } = useParams<{ username: string; id: string }>();
  const navigate = useNavigate();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const data = getPortfolioDetailData(username || "", id || "");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Portfolio tidak ditemukan</h1>
          <p className="text-muted-foreground mt-2">Portfolio yang Anda cari tidak tersedia.</p>
          <Button className="mt-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            KarirKit
          </Link>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/me/${username}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Semua Portfolio
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden bg-muted">
          <img
            src={portfolio.cover}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-4" variant="secondary">
              {projectTypeLabels[portfolio.project_type]}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              {portfolio.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {portfolio.sort_description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                {portfolio.role_title}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {portfolio.industry}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {monthNames[portfolio.month - 1]} {portfolio.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {portfolio.live_url && (
                <Button asChild>
                  <a href={portfolio.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Lihat Live Demo
                  </a>
                </Button>
              )}
              {portfolio.repo_url && (
                <Button variant="outline" asChild>
                  <a href={portfolio.repo_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Tentang Proyek</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground/90">
                    {portfolio.description.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
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
                    <CardTitle>Galeri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
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
                            className="absolute left-2 top-1/2 -translate-y-1/2"
                            onClick={prevMedia}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={nextMedia}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </>
                      )}

                      <p className="text-sm text-muted-foreground text-center mt-3">
                        {portfolio.medias[currentMediaIndex].caption}
                      </p>

                      {/* Thumbnails */}
                      {portfolio.medias.length > 1 && (
                        <div className="flex gap-2 mt-4 justify-center">
                          {portfolio.medias.map((media, idx) => (
                            <button
                              key={media.id}
                              onClick={() => setCurrentMediaIndex(idx)}
                              className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                                idx === currentMediaIndex
                                  ? "border-primary"
                                  : "border-transparent opacity-60 hover:opacity-100"
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
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <Card>
                <CardContent className="pt-6">
                  <Link
                    to={`/me/${username}`}
                    className="flex items-center gap-4 group"
                  >
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </Link>
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">
                    {user.headline}
                  </p>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teknologi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.tools.map((tool) => (
                      <Badge key={tool.id} variant="secondary">
                        {tool.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Info Proyek</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipe</span>
                    <span className="font-medium">{projectTypeLabels[portfolio.project_type]}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Industri</span>
                    <span className="font-medium">{portfolio.industry}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Peran</span>
                    <span className="font-medium">{portfolio.role_title}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Periode</span>
                    <span className="font-medium">{monthNames[portfolio.month - 1]} {portfolio.year}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Dibuat dengan ❤️ menggunakan{" "}
            <Link to="/" className="text-primary hover:underline">
              KarirKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
