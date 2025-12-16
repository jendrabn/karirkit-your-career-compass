import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, Briefcase, FolderOpen, CheckCircle, XCircle, Users, FileStack, BookOpen, Crown } from "lucide-react";

// Mock stats data
const stats = {
  total_applications: 150,
  total_applications_letters: 10,
  total_cvs: 100,
  total_portfolios: 50,
  active_applications: 120,
  inactive_applications: 30,
};

// Mock admin stats
const adminStats = {
  total_users: 1250,
  total_templates: 24,
  total_blogs: 45,
  premium_users: 180,
};

const statCards = [
  {
    label: "Total Lamaran",
    value: stats.total_applications,
    icon: Send,
    bgColor: "bg-primary/10",
    textColor: "text-primary",
  },
  {
    label: "Surat Lamaran",
    value: stats.total_applications_letters,
    icon: FileText,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    label: "Total CV",
    value: stats.total_cvs,
    icon: Briefcase,
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
  {
    label: "Total Portfolio",
    value: stats.total_portfolios,
    icon: FolderOpen,
    bgColor: "bg-orange-100",
    textColor: "text-orange-600",
  },
  {
    label: "Lamaran Aktif",
    value: stats.active_applications,
    icon: CheckCircle,
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    label: "Lamaran Tidak Aktif",
    value: stats.inactive_applications,
    icon: XCircle,
    bgColor: "bg-red-100",
    textColor: "text-red-600",
  },
];

const adminStatCards = [
  {
    label: "Total Pengguna",
    value: adminStats.total_users,
    icon: Users,
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-600",
  },
  {
    label: "Pengguna Premium",
    value: adminStats.premium_users,
    icon: Crown,
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
  {
    label: "Total Template",
    value: adminStats.total_templates,
    icon: FileStack,
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-600",
  },
  {
    label: "Total Blog",
    value: adminStats.total_blogs,
    icon: BookOpen,
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan aktivitas dan statistik lamaran Anda."
      />

      <div className="space-y-8">
        {/* User Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((stat, index) => (
            <Card key={index} className="p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
              <div className="mt-3">
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Admin Section Divider */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground font-medium px-2">
            Statistik Admin
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStatCards.map((stat, index) => (
            <Card key={index} className="p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
              <div className="mt-3">
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
