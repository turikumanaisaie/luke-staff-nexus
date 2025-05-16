
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { toast } from "sonner";

import { 
  Calendar, 
  Users, 
  User,
  Filter
} from "lucide-react";

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const navItems: NavItem[] = [
  {
    title: "Staff Management",
    icon: Users,
    path: "/dashboard",
  },
  {
    title: "Departments",
    icon: User,
    path: "/dashboard/departments",
  },
  {
    title: "Roles",
    icon: Filter,
    path: "/dashboard/roles",
  },
  {
    title: "Schedule",
    icon: Calendar,
    path: "/dashboard/schedule",
  },
];

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Get user from session storage
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  // Check if user is authenticated
  React.useEffect(() => {
    if (!user?.authenticated) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user?.authenticated) {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-hospital-600 flex items-center justify-center text-white font-bold text-lg">
                SL
              </div>
              <div>
                <h3 className="font-semibold">St. Luke Hospital</h3>
                <p className="text-xs text-muted-foreground">HR Management</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigate(item.path);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.title}</span>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">St. Luke Hospital HRMS</h1>
            </div>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
