import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Staff, StaffFilterCriteria } from "@/types/staff";
import { getAllStaff, createStaff, updateStaff, deleteStaff } from "@/services/staffService";
import StaffList from "@/components/staff/StaffList";
import StaffForm, { StaffFormValues } from "@/components/staff/StaffForm";
import StaffFilters from "@/components/staff/StaffFilters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { User, UserPlus } from "lucide-react";

const StaffDashboard = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>();
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
  const [filters, setFilters] = useState<StaffFilterCriteria>({});

  useEffect(() => {
    loadStaff();
  }, [filters]);

  const loadStaff = async () => {
    setIsLoading(true);
    try {
      const data = await getAllStaff(filters);
      setStaff(data);
    } catch (error) {
      console.error("Failed to load staff:", error);
      toast.error("Failed to load staff data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStaff = () => {
    setSelectedStaff(undefined);
    setIsFormOpen(true);
  };

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleDeleteStaff = (staff: Staff) => {
    setStaffToDelete(staff);
  };

  const confirmDelete = async () => {
    if (!staffToDelete) return;

    try {
      await deleteStaff(staffToDelete.id);
      toast.success(`${staffToDelete.firstName} ${staffToDelete.lastName} has been removed`);
      loadStaff();
    } catch (error) {
      toast.error("Failed to delete staff member");
      console.error("Delete error:", error);
    } finally {
      setStaffToDelete(null);
    }
  };

  const handleFormSubmit = async (data: StaffFormValues) => {
    setIsSubmitting(true);

    try {
      if (selectedStaff) {
        // Update existing staff
        await updateStaff(selectedStaff.id, data);
        toast.success(`${data.firstName} ${data.lastName}'s information has been updated`);
      } else {
        // Create new staff with all required fields from Staff type
        await createStaff({
          ...data,
          role: data.role!,
          email: data.email!,
          status: data.status || "Active",
          firstName: data.firstName!,
          lastName: data.lastName!,
          phone: data.phone!,
          department: data.department!,
          hireDate: data.hireDate!,
          salary: data.salary!
        });
        toast.success(`${data.firstName} ${data.lastName} has been added to staff`);
      }

      setIsFormOpen(false);
      loadStaff();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save staff information");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage hospital staff members
          </p>
        </div>
        <Button onClick={handleAddStaff} className="bg-hospital-600 hover:bg-hospital-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      <StaffFilters
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={() => setFilters({})}
      />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-hospital-600" />
            <h2 className="text-xl font-semibold">Staff List</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {staff.length} staff members found
          </p>
        </div>

        <StaffList
          staffList={staff}
          isLoading={isLoading}
          onEditStaff={handleEditStaff}
          onDeleteStaff={handleDeleteStaff}
        />
      </div>

      <StaffForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedStaff}
        isSubmitting={isSubmitting}
      />

      <AlertDialog open={!!staffToDelete} onOpenChange={() => setStaffToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove {staffToDelete?.firstName} {staffToDelete?.lastName} from the staff list.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StaffDashboard;
