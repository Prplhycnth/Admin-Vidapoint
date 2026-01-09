import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
  Search, 
  Download, 
  RefreshCw,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const activityLogs = [
  { id: 1, timestamp: "Oct 19, 2025 - 10:45 AM", user: "Dr. Julian Montes", action: "User account created", module: "User Management", status: "Success" },
  { id: 2, timestamp: "Oct 19, 2025 - 10:30 AM", user: "Maria Anne Gabuco", action: "User account created", module: "User Management", status: "Success" },
  { id: 3, timestamp: "Oct 19, 2025 - 10:15 AM", user: "System", action: "SMS reminder sent", module: "Notifications", status: "Success" },
  { id: 4, timestamp: "Oct 19, 2025 - 9:45 AM", user: "Dr. Ana Reyes", action: "Login attempt", module: "Authentication", status: "Success" },
  { id: 5, timestamp: "Oct 19, 2025 - 9:30 AM", user: "Unknown IP: 192.168.1.100", action: "Failed login attempt", module: "Authentication", status: "Failed" },
  { id: 6, timestamp: "Oct 19, 2025 - 9:00 AM", user: "Dr. Juan dela Cruz", action: "Record shared with hospital", module: "Data Sharing", status: "Success" },
  { id: 7, timestamp: "Oct 19, 2025 - 8:45 AM", user: "System", action: "Database backup completed", module: "System", status: "Success" },
  { id: 8, timestamp: "Oct 19, 2025 - 8:30 AM", user: "Elena Garcia", action: "Appointment scheduled", module: "Appointments", status: "Success" },
  { id: 9, timestamp: "Oct 19, 2025 - 8:15 AM", user: "Dr. Sofia Torres", action: "Security settings updated", module: "Security", status: "Success" },
  { id: 10, timestamp: "Oct 19, 2025 - 8:00 AM", user: "System", action: "Daily health check", module: "System", status: "Success" },
  { id: 11, timestamp: "Oct 19, 2025 - 7:30 AM", user: "Carmen Lopez", action: "Profile updated", module: "User Management", status: "Success" },
  { id: 12, timestamp: "Oct 19, 2025 - 7:00 AM", user: "System", action: "GIS data synchronized", module: "GIS Mapping", status: "Success" },
  { id: 13, timestamp: "Oct 19, 2025 - 11:15 AM", user: "Admin Console", action: "Bug #2 resolved and archived", module: "System Health", status: "Success" },
];

export function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = filterUser === "all" || log.user === filterUser;
    const matchesStatus = filterStatus === "all" || log.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesUser && matchesStatus;
  });

  const handleExportLogs = () => {
    alert("Exporting activity logs to CSV...");
  };

  const uniqueUsers = Array.from(new Set(activityLogs.map(log => log.user)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Activity Logs & Monitoring</h1>
          <p className="text-gray-600">Track all system activities for audit and troubleshooting.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button onClick={handleExportLogs} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterUser} onValueChange={setFilterUser}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {uniqueUsers.slice(0, 8).map((user) => (
                <SelectItem key={user} value={user}>{user}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Date Range
          </Button>
        </div>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-gray-600 mb-1">Total Activities (24h)</p>
          <p className="text-gray-900">{activityLogs.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 mb-1">Successful</p>
          <p className="text-green-600">{activityLogs.filter(log => log.status === "Success").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-600 mb-1">Failed</p>
          <p className="text-red-600">{activityLogs.filter(log => log.status === "Failed").length}</p>
        </Card>
      </div>

      {/* Logs Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Activity Log</h2>
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
            Real-time Updates
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-gray-600">{log.timestamp}</TableCell>
                  <TableCell className="text-gray-900">{log.user}</TableCell>
                  <TableCell className="text-gray-900">{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-gray-200 bg-gray-50 text-gray-700">
                      {log.module}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={log.status === "Success" ? "default" : "secondary"}
                      className={
                        log.status === "Success"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {log.status}
                    </Badge>
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
