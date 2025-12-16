import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, ChevronDown, ChevronRight, User, Lock, LogOut, FolderOpen, BookOpen, Plus, Tag } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: "/applications",
    icon: FileText,
  },
  {
    title: "Application Letter",
    url: "/application-letters",
    icon: FileText,
  },
  {
    title: "CV",
    url: "/cvs",
    icon: FileText,
  },
  {
    title: "Portfolio",
    url: "/portfolios",
    icon: FolderOpen,
  },
];

const blogMenuItems = [
  { title: "Semua Blog", url: "/blogs", icon: BookOpen },
  { title: "Buat Blog", url: "/blogs/create", icon: Plus },
  { title: "Kategori", url: "/categories", icon: Tag },
];

// Mock user data - replace with actual user data later
const mockUser = {
  name: "Jendra Bayu",
  email: "jendra455@gmail.com",
  avatar: "",
};

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [blogOpen, setBlogOpen] = useState(location.pathname.startsWith("/blogs") || location.pathname === "/categories");

  const isActive = (path: string) => {
    if (path === "/applications") {
      return location.pathname.startsWith("/applications");
    }
    return location.pathname === path;
  };

  const isBlogActive = location.pathname.startsWith("/blogs") || location.pathname === "/categories";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className={cn("border-b", isCollapsed ? "p-2" : "p-4")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={cn(
                "flex items-center w-full rounded-lg hover:bg-muted transition-colors",
                isCollapsed ? "justify-center p-2" : "gap-3 p-2"
              )}
            >
              <Avatar className={cn("shrink-0", isCollapsed ? "h-8 w-8" : "h-10 w-10")}>
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {mockUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium truncate">{mockUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-popover z-50">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/change-password")}>
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/auth/login")} className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg" tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center rounded-lg transition-colors",
                        isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-3",
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Blog Menu with Dropdown */}
              <SidebarMenuItem>
                <Collapsible open={blogOpen} onOpenChange={setBlogOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      tooltip="Blog"
                      className={cn(
                        "flex items-center rounded-lg transition-colors w-full",
                        isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-3",
                        isBlogActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <BookOpen className="h-5 w-5 shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium flex-1 text-left">Blog</span>
                          {blogOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!isCollapsed && (
                    <CollapsibleContent className="pl-6 space-y-1 mt-1">
                      {blogMenuItems.map((item) => (
                        <NavLink
                          key={item.url}
                          to={item.url}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                            location.pathname === item.url
                              ? "bg-muted text-foreground font-medium"
                              : "hover:bg-muted/50 text-muted-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
