
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Staff } from "@/types/staff";
import { Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface StaffListProps {
  staffList: Staff[];
  isLoading: boolean;
  onEditStaff: (staff: Staff) => void;
  onDeleteStaff: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({
  staffList,
  isLoading,
  onEditStaff,
  onDeleteStaff,
}) => {
  // Format currency for salary
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hospital-600"></div>
      </div>
    );
  }

  if (staffList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No staff members found with the current filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-hospital-50">
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{`${staff.firstName} ${staff.lastName}`}</div>
                    <div className="text-sm text-gray-500">{staff.email}</div>
                  </div>
                </TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{formatDate(staff.hireDate)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      staff.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : staff.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {staff.status}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(staff.salary)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEditStaff(staff)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={() => onDeleteStaff(staff)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffList;
