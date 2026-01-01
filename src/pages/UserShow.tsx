import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { 
  ArrowLeft, 
  Pencil, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  UserCheck, 
  UserX, 
  Ban,
  Download,
  Clock,
  AlertCircle,
  Hash,
  User as UserIcon,
  AtSign
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "@/components/ui/table";
import { mockUsers } from "@/data/mockUsers";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS, UserRole, UserStatus } from "@/types/user";

const getRoleBadgeVariant = (role: UserRole) => {
  return role === "admin" ? "default" : "secondary";
};

const getStatusBadgeVariant = (status: UserStatus) => {
  const variants: Record<UserStatus, "default" | "secondary" | "destructive" | "outline"> = {
    active: "default",
    suspended: "secondary",
    banned: "destructive",
  };
  return variants[status];
};

const getStatusIcon = (status: UserStatus) => {
  if (status === "active") return <UserCheck className="h-4 w-4" />;
  if (status === "suspended") return <UserX className="h-4 w-4" />;
  return <Ban className="h-4 w-4" />;
};

export default function UserShow() {
  const navigate = useNavigate();
  const { id: userId } = useParams<{ id: string }>();

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">User tidak ditemukan.</p>
        </div>
      </DashboardLayout>
    );
  }

  const downloadProgress = user.download_stats 
    ? (user.download_stats.today_count / user.download_stats.daily_limit) * 100 
    : 0;

  return (
    <DashboardLayout>
      <PageHeader
        title="Detail User"
        subtitle="Informasi lengkap tentang pengguna."
      />

      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <Button onClick={() => navigate(`/admin/users/${user.id}/edit`)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit User
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">@{user.username}</p>
              
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                  <Shield className="h-3 w-3" />
                  {USER_ROLE_OPTIONS.find(opt => opt.value === user.role)?.label}
                </Badge>
                <Badge variant={getStatusBadgeVariant(user.status)} className="gap-1">
                  {getStatusIcon(user.status)}
                  {USER_STATUS_OPTIONS.find(opt => opt.value === user.status)?.label}
                </Badge>
              </div>

              {user.status !== "active" && user.status_reason && (
                <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 w-full">
                  <div className="flex items-start gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <div className="text-left">
                      <p className="font-medium text-destructive">Alasan Status</p>
                      <p className="text-muted-foreground">{user.status_reason}</p>
                    </div>
                  </div>
                </div>
              )}

              {user.suspended_until && (
                <div className="mt-3 p-3 rounded-lg bg-warning/10 border border-warning/20 w-full">
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    <div className="text-left">
                      <p className="font-medium">Suspended Sampai</p>
                      <p className="text-muted-foreground">
                        {format(new Date(user.suspended_until), "dd MMMM yyyy, HH:mm", { locale: id })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Informasi Dasar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-40">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        ID
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{user.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        Nama Lengkap
                      </div>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <AtSign className="h-4 w-4 text-muted-foreground" />
                        Username
                      </div>
                    </TableCell>
                    <TableCell>@{user.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Telepon
                      </div>
                    </TableCell>
                    <TableCell>{user.phone || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        Role
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {USER_ROLE_OPTIONS.find(opt => opt.value === user.role)?.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Download Stats Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Download className="h-4 w-4" />
                Statistik Download
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{user.daily_download_limit}</p>
                  <p className="text-xs text-muted-foreground">Limit Harian</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{user.download_stats?.today_count ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Hari Ini</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{user.download_stats?.remaining ?? user.daily_download_limit}</p>
                  <p className="text-xs text-muted-foreground">Tersisa</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{user.download_stats?.total_count ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Total Download</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Penggunaan Hari Ini</span>
                  <span className="font-medium">{user.download_stats?.today_count ?? 0} / {user.download_stats?.daily_limit ?? user.daily_download_limit}</span>
                </div>
                <Progress value={downloadProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Timestamps Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Informasi Waktu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-40">Dibuat</TableCell>
                    <TableCell>
                      {format(new Date(user.created_at), "dd MMMM yyyy, HH:mm:ss", { locale: id })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Terakhir Diupdate</TableCell>
                    <TableCell>
                      {format(new Date(user.updated_at), "dd MMMM yyyy, HH:mm:ss", { locale: id })}
                    </TableCell>
                  </TableRow>
                  {user.suspended_until && (
                    <TableRow>
                      <TableCell className="font-medium">Suspended Sampai</TableCell>
                      <TableCell className="text-destructive">
                        {format(new Date(user.suspended_until), "dd MMMM yyyy, HH:mm:ss", { locale: id })}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
