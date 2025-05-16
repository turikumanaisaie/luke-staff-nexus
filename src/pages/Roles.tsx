
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Users, User } from "lucide-react";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for roles
  const rolesData = [
    {
      id: 1,
      name: "Doctor",
      department: "Medical",
      description: "Diagnoses and treats patients, prescribes medication.",
      staffCount: 10,
      accessLevel: "High",
      requiredQualifications: "MD or equivalent, medical license",
    },
    {
      id: 2,
      name: "Nurse",
      department: "Nursing",
      description: "Provides patient care, administers medication, assists doctors.",
      staffCount: 25,
      accessLevel: "Medium",
      requiredQualifications: "BSN, nursing license",
    },
    {
      id: 3,
      name: "Lab Technician",
      department: "Laboratory",
      description: "Conducts lab tests, analyzes samples, and reports results.",
      staffCount: 8,
      accessLevel: "Medium",
      requiredQualifications: "BS in Medical Laboratory Science",
    },
    {
      id: 4,
      name: "Pharmacist",
      department: "Pharmacy",
      description: "Dispenses medication, consults on drug interactions.",
      staffCount: 5,
      accessLevel: "Medium",
      requiredQualifications: "PharmD, pharmacy license",
    },
    {
      id: 5,
      name: "Radiologist",
      department: "Radiology",
      description: "Interprets diagnostic imaging, performs procedures.",
      staffCount: 6,
      accessLevel: "High",
      requiredQualifications: "MD, radiology specialization",
    },
    {
      id: 6,
      name: "Administrator",
      department: "Administration",
      description: "Manages hospital operations, staff, and resources.",
      staffCount: 3,
      accessLevel: "High",
      requiredQualifications: "MBA or MHA preferred",
    },
    {
      id: 7,
      name: "Maintenance Staff",
      department: "Maintenance",
      description: "Maintains hospital facilities and equipment.",
      staffCount: 12,
      accessLevel: "Low",
      requiredQualifications: "Technical training relevant to role",
    },
    {
      id: 8,
      name: "IT Support",
      department: "IT",
      description: "Manages hospital IT systems and infrastructure.",
      staffCount: 5,
      accessLevel: "Medium",
      requiredQualifications: "BS in Computer Science or related field",
    },
  ];

  const filteredRoles = rolesData.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Roles</h1>
        <p className="text-muted-foreground">
          Manage staff roles and responsibilities
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search roles..."
            className="w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Filter className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Total Roles</p>
              <p className="text-2xl font-bold">{rolesData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Departments Covered</p>
              <p className="text-2xl font-bold">
                {new Set(rolesData.map(role => role.department)).size}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Staff with Roles</p>
              <p className="text-2xl font-bold">
                {rolesData.reduce((total, role) => total + role.staffCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-hospital-50">
                <TableHead>Role Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Staff Count</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Required Qualifications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.department}</TableCell>
                  <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                  <TableCell>{role.staffCount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        role.accessLevel === "High"
                          ? "bg-red-100 text-red-800"
                          : role.accessLevel === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {role.accessLevel}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{role.requiredQualifications}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                        <DropdownMenuItem>View Staff</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Roles;
