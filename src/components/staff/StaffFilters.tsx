import React from "react";
import { Department, Role, StaffFilterCriteria } from "@/types/staff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface StaffFiltersProps {
  filters: StaffFilterCriteria;
  onFilterChange: (filters: StaffFilterCriteria) => void;
  onResetFilters: () => void;
}

const departments: Department[] = [
  "Medical",
  "Nursing",
  "Laboratory",
  "Pharmacy",
  "Radiology",
  "Administration",
  "Maintenance",
  "IT",
];

const roles: Role[] = [
  "Doctor",
  "Nurse",
  "Lab Technician",
  "Pharmacist",
  "Radiologist",
  "Administrator",
  "Maintenance Staff",
  "IT Support",
];

const StaffFilters: React.FC<StaffFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const handleFilterChange = (key: keyof StaffFilterCriteria, value: string | undefined) => {
    onFilterChange({
      ...filters,
      [key]: value === "" ? undefined : value,
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-hospital-600" />
        <h3 className="font-medium">Filter Staff</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium">
            Search
          </label>
          <Input
            id="search"
            placeholder="Search staff..."
            value={filters.searchTerm || ""}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">
            Department
          </label>
          <Select
            value={filters.department || ""}
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger id="department">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <Select
            value={filters.role || ""}
            onValueChange={(value) => handleFilterChange("role", value)}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Hire Date From
          </label>
          <Input
            id="startDate"
            type="date"
            value={filters.startDate || ""}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="text-sm font-medium">
            Hire Date To
          </label>
          <Input
            id="endDate"
            type="date"
            value={filters.endDate || ""}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default StaffFilters;
