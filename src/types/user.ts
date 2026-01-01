export type UserRole = "user" | "admin";
export type UserStatus = "active" | "suspended" | "banned";

export interface DownloadStats {
  daily_limit: number;
  today_count: number;
  remaining: number;
  total_count: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  status_reason?: string;
  suspended_until?: string;
  avatar: string;
  daily_download_limit: number;
  download_stats?: DownloadStats;
  created_at: string;
  updated_at: string;
}

export const USER_ROLE_OPTIONS = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export const USER_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "banned", label: "Banned" },
];
