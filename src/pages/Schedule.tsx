
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

const Schedule = () => {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Mock data for schedule
  const scheduleData = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      department: "Medical",
      monday: "8AM-4PM",
      tuesday: "8AM-4PM",
      wednesday: "OFF",
      thursday: "8AM-4PM",
      friday: "8AM-4PM",
      saturday: "OFF",
      sunday: "OFF",
    },
    {
      id: 2,
      name: "Nurse John Doe",
      department: "Nursing",
      monday: "7AM-7PM",
      tuesday: "OFF",
      wednesday: "7AM-7PM",
      thursday: "OFF",
      friday: "7AM-7PM",
      saturday: "OFF",
      sunday: "OFF",
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      department: "Medical",
      monday: "OFF",
      tuesday: "8AM-4PM",
      wednesday: "8AM-4PM",
      thursday: "8AM-4PM",
      friday: "OFF",
      saturday: "8AM-2PM",
      sunday: "OFF",
    },
    {
      id: 4,
      name: "Technician Sarah Johnson",
      department: "Laboratory",
      monday: "9AM-5PM",
      tuesday: "9AM-5PM",
      wednesday: "9AM-5PM",
      thursday: "9AM-5PM",
      friday: "9AM-5PM",
      saturday: "OFF",
      sunday: "OFF",
    },
    {
      id: 5,
      name: "Admin Maria Garcia",
      department: "Administration",
      monday: "9AM-5PM",
      tuesday: "9AM-5PM",
      wednesday: "9AM-5PM",
      thursday: "9AM-5PM",
      friday: "9AM-5PM",
      saturday: "OFF",
      sunday: "OFF",
    },
  ];

  const departments = ["Medical", "Nursing", "Laboratory", "Pharmacy", "Administration"];

  const filteredSchedule = selectedDepartment === "all"
    ? scheduleData
    : scheduleData.filter(staff => staff.department === selectedDepartment);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Staff Schedule</h1>
        <p className="text-muted-foreground">
          Manage staff shifts and working hours
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-hospital-600" />
          <h3 className="font-medium">Schedule Management</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto">
            <Select
              value={selectedWeek}
              onValueChange={setSelectedWeek}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">Previous Week</SelectItem>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-hospital-50">
                <TableHead>Staff Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Monday</TableHead>
                <TableHead>Tuesday</TableHead>
                <TableHead>Wednesday</TableHead>
                <TableHead>Thursday</TableHead>
                <TableHead>Friday</TableHead>
                <TableHead>Saturday</TableHead>
                <TableHead>Sunday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedule.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>{schedule.department}</TableCell>
                  <TableCell className={schedule.monday === "OFF" ? "text-red-500" : ""}>
                    {schedule.monday}
                  </TableCell>
                  <TableCell className={schedule.tuesday === "OFF" ? "text-red-500" : ""}>
                    {schedule.tuesday}
                  </TableCell>
                  <TableCell className={schedule.wednesday === "OFF" ? "text-red-500" : ""}>
                    {schedule.wednesday}
                  </TableCell>
                  <TableCell className={schedule.thursday === "OFF" ? "text-red-500" : ""}>
                    {schedule.thursday}
                  </TableCell>
                  <TableCell className={schedule.friday === "OFF" ? "text-red-500" : ""}>
                    {schedule.friday}
                  </TableCell>
                  <TableCell className={schedule.saturday === "OFF" ? "text-red-500" : ""}>
                    {schedule.saturday}
                  </TableCell>
                  <TableCell className={schedule.sunday === "OFF" ? "text-red-500" : ""}>
                    {schedule.sunday}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>
          Export Schedule
        </Button>
      </div>
    </div>
  );
};

export default Schedule;
