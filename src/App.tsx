import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings, 
  Database, 
  FileText, 
  BarChart3,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { DashboardHome } from "./components/DashboardHome";
import { UserManagement } from "./components/UserManagement";
import { SecurityControl } from "./components/SecurityControl";
import { SystemHealth } from "./components/SystemHealth";
import { DataBackup } from "./components/DataBackup";
import { ActivityLogs } from "./components/ActivityLogs";
import { ReportsAnalytics } from "./components/ReportsAnalytics";
import { LoginPage } from "./components/LoginPage";
import { Button } from "./components/ui/button";

type Page = "dashboard" | "users" | "security" | "system" | "backup" | "logs" | "analytics";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: "dashboard" as Page, name: "Dashboard", icon: LayoutDashboard },
    { id: "users" as Page, name: "User Management", icon: Users },
    { id: "security" as Page, name: "Security & Access", icon: Shield },
    { id: "system" as Page, name: "System Health", icon: Settings },
    { id: "backup" as Page, name: "Data Backup", icon: Database },
    { id: "logs" as Page, name: "Activity Logs", icon: FileText },
    { id: "analytics" as Page, name: "Reports & Analytics", icon: BarChart3 },
  ];

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser("");
    setCurrentPage("dashboard");
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardHome />;
      case "users":
        return <UserManagement />;
      case "security":
        return <SecurityControl />;
      case "system":
        return <SystemHealth />;
      case "backup":
        return <DataBackup />;
      case "logs":
        return <ActivityLogs />;
      case "analytics":
        return <ReportsAnalytics />;
      default:
        return <DashboardHome />;
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-emerald-600">VidaPoint Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User info and Logout button */}
        <div className="border-t border-gray-200 p-4">
          <div className="mb-3 px-2">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="text-gray-900 capitalize">{currentUser}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2 text-gray-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </div>
  );
}
