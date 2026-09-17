import {
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  readonly name: string;
  readonly path: string;
  readonly moduleId: string;
  readonly icon: LucideIcon;
}

export const menuItems: readonly MenuItem[] = [
  { name: "Dashboard Overview", path: "/dashboard", moduleId: "Dashboard", icon: LayoutDashboard },
];
