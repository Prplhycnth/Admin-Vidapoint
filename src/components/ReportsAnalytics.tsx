import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const loginData = [
  { date: "Oct 13", logins: 45 },
  { date: "Oct 14", logins: 52 },
  { date: "Oct 15", logins: 38 },
  { date: "Oct 16", logins: 61 },
  { date: "Oct 17", logins: 55 },
  { date: "Oct 18", logins: 67 },
  { date: "Oct 19", logins: 48 },
];

const recordsSharedData = [
  { facility: "Bancao-Bancao Health Center", records: 45 },
  { facility: "Palawan Provincial Hospital", records: 38 },
  { facility: "Montes Medical Clinic", records: 32 },
  { facility: "Puerto Princesa General Hospital", records: 28 },
];

const userRolesData = [
  { name: "Patients", value: 110, color: "#10b981" },
  { name: "Providers", value: 10, color: "#3b82f6" },
];

const systemUsageData = [
  { metric: "Active Users", value: "108", change: "+12%", trend: "up" },
  { metric: "Records Created", value: "342", change: "+8%", trend: "up" },
  { metric: "SMS Sent", value: "1,247", change: "+15%", trend: "up" },
  { metric: "Map Views", value: "892", change: "-3%", trend: "down" },
];

export function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Visual summaries of system usage and performance metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemUsageData.map((metric, index) => (
          <Card key={index} className="p-6">
            <p className="text-gray-600 mb-2">{metric.metric}</p>
            <p className="text-gray-900 mb-1">{metric.value}</p>
            <Badge
              variant="outline"
              className={
                metric.trend === "up"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }
            >
              {metric.change} from last week
            </Badge>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Trends */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Number of Logins per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="logins" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Daily Logins"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* User Roles Distribution */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">User Roles Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRolesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userRolesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {userRolesData.map((role, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: role.color }}
                />
                <span className="text-sm text-gray-600">{role.name}: {role.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Records Shared Chart */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Records Shared per Hospital/Facility</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={recordsSharedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="facility" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="records" 
              fill="#3b82f6" 
              name="Records Shared"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-2">Most Active Facility</h3>
          <p className="text-gray-600">Bancao-Bancao Health Center</p>
          <p className="text-sm text-gray-500 mt-1">45 records shared this week</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-gray-900 mb-2">Peak Usage Time</h3>
          <p className="text-gray-600">9:00 AM - 11:00 AM</p>
          <p className="text-sm text-gray-500 mt-1">Average 32 concurrent users</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-gray-900 mb-2">System Uptime</h3>
          <p className="text-gray-600">99.2% (Last 30 days)</p>
          <p className="text-sm text-gray-500 mt-1">5.76 hours of downtime</p>
        </Card>
      </div>
    </div>
  );
}
