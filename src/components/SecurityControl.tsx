import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, Check, X } from "lucide-react";



const suspiciousActivities = [
  {
    time: "10 minutes ago",
    activity: "Brute-force: 72 failed logins",
    user: "Unknown IP: 203.0.113.45",
    severity: "critical",
  },
  {
    time: "30 minutes ago",
    activity: "Successful login after many failures",
    user: "User: Juan Dela Cruz",
    severity: "high",
  },
  {
    time: "1 day ago",
    activity: "Login from new device",
    user: "Ana Reyes",
    severity: "moderate",
  },
  {
    time: "2 days ago",
    activity: "Single failed login",
    user: "Elena Garcia",
    severity: "low",
  },
  {
    time: "3 days ago",
    activity: "Password reset completed",
    user: "Maria Anne Gabuco",
    severity: "informational",
  },
];

export function SecurityControl() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Security & Access Control</h1>
        <p className="text-gray-600">Manage user permissions and monitor security events.</p>
      </div>
      {/* Role Definitions (read-only) */}
      <div>
        <h2 className="text-gray-900 mb-1">Role Definitions</h2>
        <p className="text-gray-600 mb-4">Overview of built-in access levels. Permissions are fixed and cannot be edited.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-900">Provider <span className="text-gray-500 text-sm">(Healthcare Workers)</span></h3>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> View patient records</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Edit patient records</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Share medical data</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> View GIS maps</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Generate reports</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-600" /> Cannot manage users</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-600" /> Cannot access system settings</li>
            </ul>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-900">Patient <span className="text-gray-500 text-sm">(Expectant Mothers)</span></h3>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> View personal medical records</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Update personal profile</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Submit pregnancy-related forms</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-600" /> Cannot edit clinical records</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-600" /> Cannot access GIS maps</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-600" /> Cannot generate clinical reports</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-600" /> Cannot access admin modules</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Suspicious Activities */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Recent Suspicious Activities</h2>
          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
            {suspiciousActivities.length} Events
          </Badge>
        </div>
        <div className="space-y-3">
          {suspiciousActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
            >
              <div
                className={`p-2 rounded-lg ${
                  activity.severity === "critical"
                    ? "bg-red-50"
                    : activity.severity === "high"
                    ? "bg-amber-50"
                    : activity.severity === "moderate"
                    ? "bg-blue-50"
                    : activity.severity === "low"
                    ? "bg-gray-50"
                    : "bg-emerald-50"
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${
                    activity.severity === "critical"
                      ? "text-red-700"
                      : activity.severity === "high"
                      ? "text-amber-600"
                      : activity.severity === "moderate"
                      ? "text-blue-600"
                      : activity.severity === "low"
                      ? "text-gray-600"
                      : "text-emerald-600"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-gray-900">{activity.activity}</p>
                    <p className="text-gray-500 text-sm">{activity.user}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      activity.severity === "critical"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : activity.severity === "high"
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : activity.severity === "moderate"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : activity.severity === "low"
                        ? "border-gray-200 bg-gray-50 text-gray-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }
                  >
                    {activity.severity}
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
