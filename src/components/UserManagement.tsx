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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, MoreVertical, CheckCircle2, XCircle, UserPlus, Eye, FileText, Calendar, Phone, Mail, MapPin, Award, Briefcase, Building } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "./ui/alert-dialog";

const mockUsers = [
  { id: 1, name: "Maria Anne Gabuco", role: "Patient", facility: "N/A", status: "Active", lastLogin: "2 hours ago", verified: true },
  { id: 2, name: "Dr. Maria Santos", role: "Provider", facility: "Puerto Princesa General Hospital", status: "Active", lastLogin: "1 day ago", verified: true },
  { id: 3, name: "Dr. Ana Reyes", role: "Provider", facility: "Adventist Palawan Hospital", status: "Active", lastLogin: "3 hours ago", verified: true },
  { id: 4, name: "Elena Garcia", role: "Patient", facility: "N/A", status: "Active", lastLogin: "5 hours ago", verified: true },
  { id: 5, name: "Dr. Sofia Torres", role: "Provider", facility: "Private Clinic", status: "Suspended", lastLogin: "1 week ago", verified: true },
  { id: 6, name: "Carmen Lopez", role: "Patient", facility: "N/A", status: "Active", lastLogin: "1 day ago", verified: false },
  { id: 7, name: "Isabella Cruz", role: "Patient", facility: "N/A", status: "Active", lastLogin: "2 days ago", verified: true },
  { id: 8, name: "Dr. Julian Montes", role: "Provider", facility: "Montes Medical Center", status: "Active", lastLogin: "4 hours ago", verified: true },
];

interface AccountRequest {
  id: number;
  name: string;
  facility: string;
  specialization: string;
  requestDate: string;
  status: string;
  // Full application details
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  contactNumber?: string;
  prcLicense: string;
  yearsOfPractice: number;
  facilityType: string;
  facilityAddress: string;
  institutionalIdStatus: string;
  prcIdStatus: string;
}

const accountRequests: AccountRequest[] = [
  { 
    id: 1, 
    name: "Dr. Carlos Reyes", 
    facility: "St. Paul Hospital", 
    specialization: "Obstetrician", 
    requestDate: "Oct 18, 2025", 
    status: "Pending",
    dateOfBirth: "March 15, 1985",
    gender: "Male",
    mobileNumber: "+63 912 345 6789",
    email: "carlos.reyes@sph.gov.ph",
    contactNumber: "+63 912 345 6789",
    prcLicense: "0123456",
    yearsOfPractice: 12,
    facilityType: "Hospital",
    facilityAddress: "National Highway, Puerto Princesa City, Palawan",
    institutionalIdStatus: "Uploaded",
    prcIdStatus: "Uploaded"
  },
  { 
    id: 2, 
    name: "Dr. Melissa Cruz", 
    facility: "Private Clinic", 
    specialization: "Pediatrician", 
    requestDate: "Oct 17, 2025", 
    status: "Pending",
    dateOfBirth: "June 22, 1988",
    gender: "Female",
    mobileNumber: "+63 915 678 9012",
    email: "melissa.cruz@clinic.com",
    contactNumber: "+63 915 678 9012",
    prcLicense: "0234567",
    yearsOfPractice: 8,
    facilityType: "Private Clinic",
    facilityAddress: "San Pedro Street, Puerto Princesa City, Palawan",
    institutionalIdStatus: "Uploaded",
    prcIdStatus: "Uploaded"
  },
  { 
    id: 3, 
    name: "Nurse Anna Bautista", 
    facility: "Barangay Health Station", 
    specialization: "Midwife", 
    requestDate: "Oct 16, 2025", 
    status: "Pending",
    dateOfBirth: "January 10, 1990",
    gender: "Female",
    mobileNumber: "+63 917 234 5678",
    email: "anna.bautista@barangay.gov.ph",
    prcLicense: "0345678",
    yearsOfPractice: 5,
    facilityType: "Health Center",
    facilityAddress: "Bancao-Bancao, Puerto Princesa City, Palawan",
    institutionalIdStatus: "Uploaded",
    prcIdStatus: "Uploaded"
  },
];

interface UserAction {
  type: "edit" | "reset_password" | "suspend" | "activate";
  user: typeof mockUsers[0] | null;
}

export function UserManagement() {
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<AccountRequest | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [userAction, setUserAction] = useState<UserAction>({ type: "edit", user: null });
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [updatedUsers, setUpdatedUsers] = useState(mockUsers);

  const filteredUsers = updatedUsers.filter(user => {
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.facility.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleActionClick = (action: "edit" | "reset_password" | "suspend" | "activate", user: typeof mockUsers[0]) => {
    setUserAction({ type: action, user });
    if (action === "edit") {
      setEditDialogOpen(true);
    } else if (action === "reset_password") {
      setResetPasswordDialogOpen(true);
    } else {
      setActionDialogOpen(true);
    }
  };

  const confirmAction = () => {
    if (!userAction.user) return;
    const actionMessages: Record<string, string> = {
      edit: `User ${userAction.user.name} has been updated successfully.`,
      reset_password: `Password reset link sent to ${userAction.user.name}.`,
      suspend: `User ${userAction.user.name} has been suspended.`,
      activate: `User ${userAction.user.name} has been activated.`,
    };

    if (userAction.type === "suspend" || userAction.type === "activate") {
      setUpdatedUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userAction.user!.id
            ? { ...u, status: userAction.type === "suspend" ? "Suspended" : "Active" }
            : u
        )
      );
    }

    alert(actionMessages[userAction.type]);
    setActionDialogOpen(false);
    setEditDialogOpen(false);
    setResetPasswordDialogOpen(false);
  };

  const handleRequestAction = (action: string, requestName: string) => {
    alert(`${action} request from ${requestName}`);
  };

  const handleViewDetails = (request: AccountRequest) => {
    setSelectedRequest(request);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage and authenticate users across the platform.</p>
      </div>

      {/* Account Requests */}
      {accountRequests.length > 0 && (
        <Card className="p-6 border-amber-200 bg-amber-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-600" />
              <h2 className="text-gray-900">Pending Account Requests</h2>
              <Badge className="bg-amber-600 hover:bg-amber-600">
                {accountRequests.length}
              </Badge>
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="text-gray-900">{request.name}</TableCell>
                    <TableCell className="text-gray-600">{request.facility}</TableCell>
                    <TableCell className="text-gray-600">{request.specialization}</TableCell>
                    <TableCell className="text-gray-600">{request.requestDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(request)}
                          className="gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleRequestAction("Approve", request.name)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequestAction("Reject", request.name)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        user.role === "Provider"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.facility}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "default" : "secondary"}
                      className={
                        user.status === "Active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
                  <TableCell>
                    {user.verified ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleActionClick("edit", user)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleActionClick("reset_password", user)}>
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleActionClick(user.status === "Active" ? "suspend" : "activate", user)}
                          className={user.status === "Active" ? "text-red-600" : "text-green-600"}
                        >
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Account Request Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Provider Account Application</DialogTitle>
            <DialogDescription>
              Complete application details for healthcare provider verification
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-900">{selectedRequest.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-900">{selectedRequest.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedRequest.mobileNumber}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedRequest.email}
                    </p>
                  </div>
                  {selectedRequest.contactNumber && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Contact Number (Optional)</p>
                      <p className="text-gray-900">{selectedRequest.contactNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Professional Credentials */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Professional Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">PRC License Number</p>
                    <p className="text-gray-900">{selectedRequest.prcLicense}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Specialty</p>
                    <p className="text-gray-900">{selectedRequest.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Years of Practice</p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      {selectedRequest.yearsOfPractice} years
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Facility Affiliation */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-600" />
                  Facility Affiliation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Facility Type</p>
                    <p className="text-gray-900">{selectedRequest.facilityType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Facility Name</p>
                    <p className="text-gray-900">{selectedRequest.facility}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Facility Address</p>
                    <p className="text-gray-900 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      {selectedRequest.facilityAddress}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Document Verification */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Document Verification
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Institutional ID / Appointment Letter</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {selectedRequest.institutionalIdStatus}
                      </Badge>
                      <Button size="sm" variant="link" className="text-emerald-600 p-0 h-auto">
                        View Document
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">PRC ID or Valid License Document</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {selectedRequest.prcIdStatus}
                      </Badge>
                      <Button size="sm" variant="link" className="text-emerald-600 p-0 h-auto">
                        View Document
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Terms & Consent */}
              <div>
                <h3 className="text-gray-900 mb-4">Terms & Consent</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Confirmed that the information provided is true and accurate
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Authorized VidaPoint to verify credentials with corresponding institutions
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Agreed to the Data Privacy and Terms of Use
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Info */}
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <p className="text-sm text-gray-600">
                  <span className="text-gray-900">Request Date:</span> {selectedRequest.requestDate}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="text-gray-900">Status:</span>{" "}
                  <Badge className="bg-amber-600 hover:bg-amber-600 ml-1">
                    {selectedRequest.status}
                  </Badge>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleRequestAction("Reject", selectedRequest.name);
                    setDetailsDialogOpen(false);
                  }}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Reject Application
                </Button>
                <Button
                  onClick={() => {
                    handleRequestAction("Approve", selectedRequest.name);
                    setDetailsDialogOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve Application
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update information for {userAction.user?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">User Name</label>
              <Input value={userAction.user?.name || ""} disabled className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Input value={userAction.user?.role || ""} disabled className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Input value={userAction.user?.status || ""} disabled className="mt-1" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              A password reset link will be sent to {userAction.user?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              The user will receive an email with instructions to reset their password.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setResetPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction} className="bg-emerald-600 hover:bg-emerald-700">
              Send Reset Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suspend/Activate Confirmation Dialog */}
      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {userAction.type === "suspend" ? "Suspend User" : "Activate User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {userAction.type === "suspend"
                ? `Are you sure you want to suspend ${userAction.user?.name}? They will no longer be able to access the system.`
                : `Are you sure you want to activate ${userAction.user?.name}? They will regain access to the system.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmAction}
              style={userAction.type === "suspend" ? { backgroundColor: "#dc2626", color: "white" } : { backgroundColor: "#16a34a", color: "white" }}
              onMouseEnter={(e) => {
                if (userAction.type === "suspend") {
                  (e.target as HTMLElement).style.backgroundColor = "#b91c1c";
                } else {
                  (e.target as HTMLElement).style.backgroundColor = "#15803d";
                }
              }}
              onMouseLeave={(e) => {
                if (userAction.type === "suspend") {
                  (e.target as HTMLElement).style.backgroundColor = "#dc2626";
                } else {
                  (e.target as HTMLElement).style.backgroundColor = "#16a34a";
                }
              }}
            >
              {userAction.type === "suspend" ? "Suspend" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
