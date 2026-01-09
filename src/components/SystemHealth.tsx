import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Clock,
  RefreshCw,
  Eye,
  Archive
} from "lucide-react";

export function SystemHealth() {
  const [selectedBug, setSelectedBug] = useState<any | null>(null);
  const [bugReports, setBugReports] = useState([
    {
      id: 1,
      reporter: "Dr. Maria Santos",
      description: "Appointment scheduler not updating after new patient registration.",
      dateReported: "Oct 19, 2025",
      status: "pending",
    },
    {
      id: 2,
      reporter: "Dr. Luis Garcia",
      description: "Error when trying to upload ultrasound results to patient record.",
      dateReported: "Oct 17, 2025",
      status: "in-progress",
    },
    {
      id: 3,
      reporter: "Dr. Ana Reyes",
      description: "Slow response on dashboard analytics page.",
      dateReported: "Oct 15, 2025",
      status: "in-progress",
    },
  ]);
  const [archivedBugs, setArchivedBugs] = useState<any[]>([]);

  const systemServices = [
    { name: "API Server", status: "online", uptime: "99.9%", lastCheck: "1 min ago" },
    { name: "Database Connection", status: "online", uptime: "99.8%", lastCheck: "1 min ago" },
    { name: "SMS Service", status: "online", uptime: "98.5%", lastCheck: "2 min ago" },
    { name: "GIS Mapping Service", status: "online", uptime: "99.2%", lastCheck: "1 min ago" },
    { name: "Backup Service", status: "online", uptime: "100%", lastCheck: "5 min ago" },
    { name: "Email Notifications", status: "offline", uptime: "95.3%", lastCheck: "10 min ago" },
  ];

  const handleDeployUpdate = () => {
    alert("System update deployment initiated. This may take a few minutes.");
  };

  const handleViewBug = (bug: any) => {
    setSelectedBug(bug);
  };

  const handleResolveBug = (id: number) => {
    const resolvedBug = bugReports.find(b => b.id === id);
    if (resolvedBug) {
      setBugReports(prev => prev.filter(b => b.id !== id));
      setArchivedBugs(prev => [...prev, { ...resolvedBug, status: "resolved" }]);
      alert("Bug marked as resolved and archived!");
      setSelectedBug(null);
    }
  };

  const handleInProgressBug = (id: number) => {
    setBugReports(prev =>
      prev.map(b => (b.id === id ? { ...b, status: "in-progress" } : b))
    );
    alert("Bug marked as in progress!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">System Health & Maintenance</h1>
        <p className="text-gray-600">
          Monitor system services, manage bug reports, and deploy updates.
        </p>
      </div>

      {/* System Services Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">System Services Status</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemServices.map((service, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
            >
              <div className={`p-2 rounded-lg ${
                service.status === "online" ? "bg-green-50" : "bg-red-50"
              }`}>
                {service.status === "online" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-gray-900">{service.name}</p>
                  <Badge
                    variant={service.status === "online" ? "default" : "secondary"}
                    className={
                      service.status === "online"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {service.uptime} uptime
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.lastCheck}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Updates + Bug Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Info */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">System Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Current Version</span>
              <span className="text-gray-900">v2.1.4</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Last Update</span>
              <span className="text-gray-900">October 15, 2025</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Environment</span>
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                Production
              </Badge>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Database Size</span>
              <span className="text-gray-900">2.4 GB</span>
            </div>
          </div>
          <Button 
            onClick={handleDeployUpdate}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
          >
            Deploy Update
          </Button>
        </Card>

        {/* 🔧 Bug Reports Viewer for Admin */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Reported Bugs</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {bugReports.length > 0 ? (
              bugReports.map((bug) => (
                <div
                  key={bug.id}
                  className="border border-gray-200 p-3 rounded-lg flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{bug.reporter}</p>
                    <Badge
                      className={
                        bug.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {bug.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{bug.description}</p>
                  <p className="text-xs text-gray-500">{bug.dateReported}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleViewBug(bug)}
                    >
                      <Eye className="w-4 h-4" /> View
                    </Button>
                    {bug.status !== "in-progress" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-blue-700 border-blue-300"
                        onClick={() => handleInProgressBug(bug.id)}
                      >
                        In Progress
                      </Button>
                    )}
                    {bug.status === "in-progress" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-green-700 border-green-300"
                        onClick={() => handleResolveBug(bug.id)}
                      >
                        <CheckCircle2 className="w-4 h-4" /> Resolve
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No reported bugs at the moment.
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Bug Details Dialog */}
      {selectedBug && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="bg-white p-6 w-full max-w-md shadow-lg rounded-xl">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Bug Details
            </h2>
            <p className="text-sm text-gray-700 mb-4">{selectedBug.description}</p>
            <p className="text-xs text-gray-500 mb-4">
              Reported by <strong>{selectedBug.reporter}</strong> on{" "}
              {selectedBug.dateReported}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedBug(null)}
              >
                Close
              </Button>
              {selectedBug.status !== "in-progress" && (
                <Button
                  className="text-blue-700 border-blue-300"
                  variant="outline"
                  onClick={() => {
                    handleInProgressBug(selectedBug.id);
                    setSelectedBug(null);
                  }}
                >
                  In Progress
                </Button>
              )}
              {selectedBug.status === "in-progress" && (
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleResolveBug(selectedBug.id)}
                >
                  Mark as Resolved
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Archived Bugs */}
      {archivedBugs.length > 0 && (
        <Card className="p-6 border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 flex items-center gap-2">
              <Archive className="w-5 h-5" />
              Archived Bugs
            </h2>
            <Badge variant="outline">{archivedBugs.length}</Badge>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {archivedBugs.map((bug) => (
              <div
                key={bug.id}
                className="border border-gray-200 p-3 rounded-lg flex flex-col gap-2 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{bug.reporter}</p>
                  <Badge className="bg-green-100 text-green-700">
                    Resolved
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{bug.description}</p>
                <p className="text-xs text-gray-500">{bug.dateReported}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}