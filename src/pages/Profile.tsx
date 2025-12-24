import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Camera, Loader2, Bell, MessageCircle, Send } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Notification settings type
interface NotificationSettings {
  whatsapp: {
    enabled: boolean;
    phone: string;
    deadlineReminder: boolean;
    testReminder: boolean;
    interviewReminder: boolean;
    statusUpdate: boolean;
  };
  telegram: {
    enabled: boolean;
    chatId: string;
    deadlineReminder: boolean;
    testReminder: boolean;
    interviewReminder: boolean;
    statusUpdate: boolean;
  };
}

const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Mock user data
const mockUser = {
  name: "Jendra Bayu",
  username: "jendrabayu",
  email: "jendra455@gmail.com",
  phone: "081234567890",
  avatar: "",
  created_at: "2025-01-01T08:00:00.000Z",
  updated_at: "2025-12-10T14:30:00.000Z",
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(mockUser.avatar);

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    whatsapp: {
      enabled: false,
      phone: mockUser.phone || "",
      deadlineReminder: true,
      testReminder: true,
      interviewReminder: true,
      statusUpdate: true,
    },
    telegram: {
      enabled: false,
      chatId: "",
      deadlineReminder: true,
      testReminder: true,
      interviewReminder: true,
      statusUpdate: true,
    },
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: mockUser.name,
      username: mockUser.username,
      email: mockUser.email,
      phone: mockUser.phone,
      avatar: mockUser.avatar,
    },
  });

  const updateWhatsappSetting = (key: keyof NotificationSettings["whatsapp"], value: boolean | string) => {
    setNotifications(prev => ({
      ...prev,
      whatsapp: {
        ...prev.whatsapp,
        [key]: value,
      },
    }));
  };

  const updateTelegramSetting = (key: keyof NotificationSettings["telegram"], value: boolean | string) => {
    setNotifications(prev => ({
      ...prev,
      telegram: {
        ...prev.telegram,
        [key]: value,
      },
    }));
  };

  const saveNotificationSettings = async () => {
    setIsSavingNotifications(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Notification settings:", notifications);
      toast.success("Pengaturan notifikasi berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan pengaturan notifikasi");
    } finally {
      setIsSavingNotifications(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    setIsUploading(true);
    
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate upload to /uploads endpoint
      const formData = new FormData();
      formData.append("file", file);
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockPath = `/uploads/avatars/${file.name}`;
      
      form.setValue("avatar", mockPath);
      toast.success("Avatar berhasil diupload");
    } catch (error) {
      toast.error("Gagal mengupload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Profile data:", data);
      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      toast.error("Gagal memperbarui profil");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Profil Saya"
        subtitle="Kelola informasi profil, akun, dan pengaturan notifikasi Anda."
      />

      <div className="max-w-3xl space-y-6">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarPreview} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {mockUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Klik ikon kamera untuk mengganti foto profil (maks. 2MB)
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Masukkan nama lengkap"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...form.register("username")}
                    placeholder="Masukkan username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Masukkan email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
              </div>

              {/* Timestamps */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Terdaftar pada</span>
                  <span>{format(new Date(mockUser.created_at), "dd MMM yyyy, HH:mm")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Terakhir diperbarui</span>
                  <span>{format(new Date(mockUser.updated_at), "dd MMM yyyy, HH:mm")}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Pengaturan Notifikasi</CardTitle>
            </div>
            <CardDescription>
              Atur notifikasi untuk deadline lamaran, jadwal tes, interview, dan update status melalui WhatsApp atau Telegram.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* WhatsApp Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Terima notifikasi via WhatsApp</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.whatsapp.enabled}
                  onCheckedChange={(checked) => updateWhatsappSetting("enabled", checked)}
                />
              </div>

              {notifications.whatsapp.enabled && (
                <div className="space-y-4 pl-[52px]">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">Nomor WhatsApp</Label>
                    <Input
                      id="whatsapp-phone"
                      value={notifications.whatsapp.phone}
                      onChange={(e) => updateWhatsappSetting("phone", e.target.value)}
                      placeholder="628123456789"
                    />
                    <p className="text-xs text-muted-foreground">
                      Format: 628xxxxx (tanpa tanda + atau spasi)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Jenis Notifikasi</Label>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pengingat Deadline Lamaran</span>
                      <Switch
                        checked={notifications.whatsapp.deadlineReminder}
                        onCheckedChange={(checked) => updateWhatsappSetting("deadlineReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pengingat Jadwal Tes</span>
                      <Switch
                        checked={notifications.whatsapp.testReminder}
                        onCheckedChange={(checked) => updateWhatsappSetting("testReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pengingat Jadwal Interview</span>
                      <Switch
                        checked={notifications.whatsapp.interviewReminder}
                        onCheckedChange={(checked) => updateWhatsappSetting("interviewReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Update Status Lamaran</span>
                      <Switch
                        checked={notifications.whatsapp.statusUpdate}
                        onCheckedChange={(checked) => updateWhatsappSetting("statusUpdate", checked)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Telegram Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Send className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Telegram</h4>
                    <p className="text-sm text-muted-foreground">Terima notifikasi via Telegram</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.telegram.enabled}
                  onCheckedChange={(checked) => updateTelegramSetting("enabled", checked)}
                />
              </div>

              {notifications.telegram.enabled && (
                <div className="space-y-4 pl-[52px]">
                  <div className="space-y-2">
                    <Label htmlFor="telegram-chatid">Chat ID Telegram</Label>
                    <Input
                      id="telegram-chatid"
                      value={notifications.telegram.chatId}
                      onChange={(e) => updateTelegramSetting("chatId", e.target.value)}
                      placeholder="123456789"
                    />
                    <p className="text-xs text-muted-foreground">
                      Dapatkan Chat ID dengan mengirim pesan ke @userinfobot di Telegram
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Jenis Notifikasi</Label>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pengingat Deadline Lamaran</span>
                      <Switch
                        checked={notifications.telegram.deadlineReminder}
                        onCheckedChange={(checked) => updateTelegramSetting("deadlineReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pengingat Jadwal Tes</span>
                      <Switch
                        checked={notifications.telegram.testReminder}
                        onCheckedChange={(checked) => updateTelegramSetting("testReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pengingat Jadwal Interview</span>
                      <Switch
                        checked={notifications.telegram.interviewReminder}
                        onCheckedChange={(checked) => updateTelegramSetting("interviewReminder", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Update Status Lamaran</span>
                      <Switch
                        checked={notifications.telegram.statusUpdate}
                        onCheckedChange={(checked) => updateTelegramSetting("statusUpdate", checked)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <Button onClick={saveNotificationSettings} disabled={isSavingNotifications}>
              {isSavingNotifications ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Pengaturan Notifikasi"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}