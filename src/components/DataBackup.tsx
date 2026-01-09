import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { 
  Download, 
  RefreshCw, 
  Database,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const backupHistory = [
  { id: 1, date: "October 17, 2025 - 2:00 AM", type: "Automated", size: "2.4 GB", status: "Completed", duration: "12 min" },
  { id: 2, date: "October 14, 2025 - 2:00 AM", type: "Automated", size: "2.3 GB", status: "Completed", duration: "11 min" },
  { id: 3, date: "October 12, 2025 - 3:15 PM", type: "Manual", size: "2.3 GB", status: "Completed", duration: "10 min" },
  { id: 4, date: "October 11, 2025 - 2:00 AM", type: "Automated", size: "2.2 GB", status: "Completed", duration: "11 min" },
  { id: 5, date: "October 8, 2025 - 2:00 AM", type: "Automated", size: "2.2 GB", status: "Completed", duration: "12 min" },
  { id: 6, date: "October 5, 2025 - 2:00 AM", type: "Automated", size: "2.1 GB", status: "Failed", duration: "2 min" },
];

export function DataBackup() {
  const lastBackup = backupHistory[0];
  const daysAgo = 2;
  const isOld = daysAgo > 7;

  const handleBackupNow = () => {
    alert("Manual backup initiated. This may take several minutes.");
  };

  const handleRestore = (backupDate: string) => {
    if (confirm(`Are you sure you want to restore the backup from ${backupDate}? This will overwrite current data.`)) {
      alert("Backup restoration initiated.");
    }
  };

  const handleDownload = (backupDate: string) => {
    alert(`Downloading backup from ${backupDate}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Data Backup & Recovery</h1>
        <p className="text-gray-600">Manage system backups and restore data when needed.</p>
      </div>

      {/* Backup Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${isOld ? "bg-amber-50" : "bg-green-50"}`}>
              <Database className={`w-6 h-6 ${isOld ? "text-amber-600" : "text-green-600"}`} />
            </div>
            <Badge 
              variant={isOld ? "secondary" : "default"}
              className={isOld 
                ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                : "bg-green-100 text-green-700 hover:bg-green-100"
              }
            >
              {isOld ? "Attention" : "Healthy"}
            </Badge>
          </div>
          <h3 className="text-gray-600 mb-1">Last Backup</h3>
          <p className="text-gray-900">{daysAgo} days ago</p>
          <p className="text-gray-500 text-sm mt-1">{lastBackup.date}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
              Active
            </Badge>
          </div>
          <h3 className="text-gray-600 mb-1">Backup Schedule</h3>
          <p className="text-gray-900">Daily at 2:00 AM</p>
          <p className="text-gray-500 text-sm mt-1">Automated backups enabled</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-50">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
              Info
            </Badge>
          </div>
          <h3 className="text-gray-600 mb-1">Total Backups</h3>
          <p className="text-gray-900">6 backups</p>
          <p className="text-gray-500 text-sm mt-1">13.5 GB total size</p>
        </Card>
      </div>

      {/* Alert if backup is old */}
      {isOld && (
        <Card className="p-4 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-900">Warning: Backup older than 7 days!</p>
              <p className="text-amber-700 text-sm mt-1">
                It's recommended to perform backups at least once a week to ensure data safety.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Backup Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Quick Actions</h2>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleBackupNow}
            className="bg-emerald-600 hover:bg-emerald-700 gap-2"
          >
            <Database className="w-4 h-4" />
            Back Up Now
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Status
          </Button>
        </div>
      </Card>

      {/* Backup History */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Backup History</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backupHistory.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="text-gray-900">{backup.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        backup.type === "Automated"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-purple-200 bg-purple-50 text-purple-700"
                      }
                    >
                      {backup.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{backup.size}</TableCell>
                  <TableCell className="text-gray-600">{backup.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant={backup.status === "Completed" ? "default" : "secondary"}
                      className={
                        backup.status === "Completed"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {backup.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {backup.status === "Completed" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestore(backup.date)}
                          >
                            Restore
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(backup.date)}
                            className="gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
