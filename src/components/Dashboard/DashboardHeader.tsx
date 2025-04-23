
import { cn } from "@/lib/utils";
import { LvLogo } from "./LvLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  StoreIcon,
  UserIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { storeLocations } from "@/data/dashboardData";
import { useNavigate } from "react-router-dom";

// Using a context to manage store selection would be better in a real app

interface DashboardHeaderProps {
  className?: string;
  toggleSidebar?: () => void;
  sidebarExpanded?: boolean;
  isMobile?: boolean;
  onStoreChange?: (store: string) => void;
  hideStoreSelector?: boolean;
  title?: string;
  description?: string;
  selectedStore?: string;
}

export function DashboardHeader({
  className,
  toggleSidebar,
  sidebarExpanded,
  isMobile,
  onStoreChange,
  hideStoreSelector = false,
  title,
  description,
  selectedStore = "All Stores",
}: DashboardHeaderProps) {
  const [localSelectedStore, setLocalSelectedStore] = useState(selectedStore);
  const [userRole, setUserRole] = useState("admin"); // admin or store-manager
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleStoreChange = (value: string) => {
    setLocalSelectedStore(value);
    if (onStoreChange) {
      onStoreChange(value);
    }
  };

  useEffect(() => {
    // Initialize with default store or selected store
    if (onStoreChange) {
      onStoreChange(localSelectedStore);
    }
  }, []);

  useEffect(() => {
    // Update local state when prop changes
    setLocalSelectedStore(selectedStore);
  }, [selectedStore]);

  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear tokens, etc.)
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    navigate(`/dashboard/${path}`);
  };

  return (
    <header
      className={cn(
        "px-4 sm:px-6 lg:px-8 py-4 border-b border-border flex items-center justify-between bg-background",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            <MenuIcon className="h-5 w-5" />s
          </Button>
        )}
        {/* Only show logo in header when sidebar is collapsed or on mobile */}
        {(isMobile || !sidebarExpanded) && <LvLogo size="lg" />}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {!hideStoreSelector && (
          <Select value={localSelectedStore} onValueChange={handleStoreChange}>
            <SelectTrigger className="w-[200px]">
              <StoreIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select a store" />
            </SelectTrigger>
            <SelectContent>
              {storeLocations.map((store) => (
                <SelectItem key={store} value={store}>
                  {store}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback>
                  <img
                    src="/images/user-profile.png"
                    alt="Profile Picture"
                    width={150}
                    height={75}
                  />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userRole === "admin" ? "Administrator" : "Store Manager"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
