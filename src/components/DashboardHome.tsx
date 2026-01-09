import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  CheckCircle2, 
  Users, 
  ShieldAlert, 
  Database
} from "lucide-react";

export function DashboardHome() {
  const quickStats = [
    {
      title: "System Status",
      value: "All Services Running",
      icon: CheckCircle2,
      status: "success",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Users",
      value: "120",
      subtitle: "10 Providers, 110 Patients",
      icon: Users,
      status: "info",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Security Alerts",
      value: "0",
      icon: ShieldAlert,
      status: "success",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Last Backup",
      value: "2 days ago",
      icon: Database,
      status: "warning",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your system today.</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <Badge 
                  variant={stat.status === "success" ? "default" : stat.status === "warning" ? "secondary" : "outline"}
                  className={
                    stat.status === "success" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100" 
                      : stat.status === "warning"
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      : ""
                  }
                >
                  {stat.status === "success" ? "Healthy" : stat.status === "warning" ? "Attention" : "Active"}
                </Badge>
              </div>
              <h3 className="text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-gray-900">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-gray-500 text-sm mt-1">{stat.subtitle}</p>
              )}
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Recent System Activity</h2>
        <div className="space-y-3">
          {[
            { time: "2 hours ago", action: "New user registered", user: "Maria Anne Gabuco", type: "Patient" },
            { time: "5 hours ago", action: "System backup completed", user: "System", type: "Automated" },
            { time: "1 day ago", action: "Security settings updated", user: "Admin", type: "Manual" },
            { time: "2 days ago", action: "Database maintenance completed", user: "System", type: "Automated" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <p className="text-gray-900">{activity.action}</p>
                <p className="text-gray-500 text-sm">{activity.user} • {activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
