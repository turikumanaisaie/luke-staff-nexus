
export type Department = 
  | "Medical" 
  | "Nursing" 
  | "Laboratory" 
  | "Pharmacy" 
  | "Radiology" 
  | "Administration" 
  | "Maintenance" 
  | "IT";

export type Role = 
  | "Doctor" 
  | "Nurse" 
  | "Lab Technician" 
  | "Pharmacist" 
  | "Radiologist" 
  | "Administrator" 
  | "Maintenance Staff" 
  | "IT Support";

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  role: Role;
  hireDate: string;
  salary: number;
  status: "Active" | "On Leave" | "Terminated";
}

// Renamed from StaffFilters to StaffFilterCriteria to avoid name conflicts
export interface StaffFilterCriteria {
  department?: Department;
  role?: Role;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}
