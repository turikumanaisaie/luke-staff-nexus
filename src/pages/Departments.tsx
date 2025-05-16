
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building, User, Users, Calendar } from "lucide-react";

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for departments
  const departmentsData = [
    {
      id: 1,
      name: "Medical",
      headOfDepartment: "Dr. Robert Wilson",
      staffCount: 15,
      establishedDate: "2010-05-12",
      location: "East Wing, Floor 2",
      status: "Active",
    },
    {
      id: 2,
      name: "Nursing",
      headOfDepartment: "Nurse Maria Johnson",
      staffCount: 32,
      establishedDate: "2010-05-12",
      location: "All Wings",
      status: "Active",
    },
    {
      id: 3,
      name: "Laboratory",
      headOfDepartment: "Dr. Helen Thompson",
      staffCount: 8,
      establishedDate: "2011-08-23",
      location: "South Wing, Floor 1",
      status: "Active",
    },
    {
      id: 4,
      name: "Pharmacy",
      headOfDepartment: "Dr. James Rodriguez",
      staffCount: 6,
      establishedDate: "2012-03-14",
      location: "North Wing, Floor 1",
      status: "Active",
    },
    {
      id: 5,
      name: "Radiology",
      headOfDepartment: "Dr. Sarah Kim",
      staffCount: 10,
      establishedDate: "2012-09-30",
      location: "West Wing, Floor 1",
      status: "Active",
    },
    {
      id: 6,
      name: "Administration",
      headOfDepartment: "Mr. John Smith",
      staffCount: 7,
      establishedDate: "2010-01-15",
      location: "Main Building, Floor 3",
      status: "Active",
    },
    {
      id: 7,
      name: "Maintenance",
      headOfDepartment: "Mr. Carlos Gomez",
      staffCount: 12,
      establishedDate: "2010-01-15",
      location: "All Wings",
      status: "Active",
    },
    {
      id: 8,
      name: "IT",
      headOfDepartment: "Ms. Anna Chen",
      staffCount: 5,
      establishedDate: "2014-06-22",
      location: "South Wing, Floor 3",
      status: "Active",
    },
  ];

  const filteredDepartments = departmentsData.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Departments</h1>
        <p className="text-muted-foreground">
          Manage hospital departments and organizational structure
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search departments..."
            className="w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Building className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Total Departments</p>
              <p className="text-2xl font-bold">{departmentsData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold">
                {departmentsData.reduce((total, dept) => total + dept.staffCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Department Heads</p>
              <p className="text-2xl font-bold">{departmentsData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-hospital-600" />
            <div>
              <p className="text-sm text-gray-500">Oldest Department</p>
              <p className="text-2xl font-bold">2010</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-hospital-50">
                <TableHead>Name</TableHead>
                <TableHead>Head of Department</TableHead>
                <TableHead>Staff Count</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Established</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.headOfDepartment}</TableCell>
                  <TableCell>{dept.staffCount}</TableCell>
                  <TableCell>{dept.location}</TableCell>
                  <TableCell>{formatDate(dept.establishedDate)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {dept.status}
                    </span>
                  </TableCell>
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
                        <DropdownMenuItem>Edit Department</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete Department
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

export default Departments;
