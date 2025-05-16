import { Staff, StaffFilterCriteria } from "@/types/staff";
import { v4 as uuidv4 } from 'uuid';

// This is a mock service that simulates API calls to a backend
// In a real application, this would be replaced with actual API calls using Axios

// Mock data
const mockStaff: Staff[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@stluke.org",
    phone: "+250-789-123-456",
    department: "Medical",
    role: "Doctor",
    hireDate: "2020-01-15",
    salary: 120000,
    status: "Active",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@stluke.org",
    phone: "+250-789-234-567",
    department: "Nursing",
    role: "Nurse",
    hireDate: "2019-06-22",
    salary: 75000,
    status: "Active",
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@stluke.org",
    phone: "+250-789-345-678",
    department: "Laboratory",
    role: "Lab Technician",
    hireDate: "2021-03-10",
    salary: 65000,
    status: "Active",
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@stluke.org",
    phone: "+250-789-456-789",
    department: "Pharmacy",
    role: "Pharmacist",
    hireDate: "2018-11-05",
    salary: 85000,
    status: "On Leave",
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@stluke.org",
    phone: "+250-789-567-890",
    department: "Radiology",
    role: "Radiologist",
    hireDate: "2020-08-20",
    salary: 110000,
    status: "Active",
  },
  {
    id: "6",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@stluke.org",
    phone: "+250-789-678-901",
    department: "Administration",
    role: "Administrator",
    hireDate: "2017-05-12",
    salary: 95000,
    status: "Active",
  },
  {
    id: "7",
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@stluke.org",
    phone: "+250-789-789-012",
    department: "Maintenance",
    role: "Maintenance Staff",
    hireDate: "2022-01-30",
    salary: 55000,
    status: "Active",
  },
  {
    id: "8",
    firstName: "Lisa",
    lastName: "Wilson",
    email: "lisa.wilson@stluke.org",
    phone: "+250-789-890-123",
    department: "IT",
    role: "IT Support",
    hireDate: "2021-07-15",
    salary: 80000,
    status: "Active",
  },
];

// Store the mock data in localStorage if it doesn't exist
const initializeStaffData = () => {
  const storedStaff = localStorage.getItem("staff");
  
  if (!storedStaff) {
    localStorage.setItem("staff", JSON.stringify(mockStaff));
    return mockStaff;
  }
  
  return JSON.parse(storedStaff);
};

// Helper to save staff data
const saveStaffData = (data: Staff[]) => {
  localStorage.setItem("staff", JSON.stringify(data));
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all staff with optional filters
export const getAllStaff = async (filters?: StaffFilterCriteria): Promise<Staff[]> => {
  await delay(500); // Simulate network delay
  
  let staff: Staff[] = initializeStaffData();
  
  if (filters) {
    if (filters.department) {
      staff = staff.filter(s => s.department === filters.department);
    }
    
    if (filters.role) {
      staff = staff.filter(s => s.role === filters.role);
    }
    
    if (filters.startDate) {
      staff = staff.filter(s => new Date(s.hireDate) >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      staff = staff.filter(s => new Date(s.hireDate) <= new Date(filters.endDate));
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      staff = staff.filter(
        s => s.firstName.toLowerCase().includes(term) || 
             s.lastName.toLowerCase().includes(term) || 
             s.email.toLowerCase().includes(term) ||
             s.department.toLowerCase().includes(term) ||
             s.role.toLowerCase().includes(term)
      );
    }
  }
  
  return staff;
};

// Get staff by ID
export const getStaffById = async (id: string): Promise<Staff | null> => {
  await delay(300);
  const staff = initializeStaffData();
  return staff.find(s => s.id === id) || null;
};

// Create new staff member
export const createStaff = async (staffData: Omit<Staff, 'id'>): Promise<Staff> => {
  await delay(700);
  const staff = initializeStaffData();
  
  const newStaff: Staff = {
    ...staffData,
    id: uuidv4(),
  };
  
  staff.push(newStaff);
  saveStaffData(staff);
  
  return newStaff;
};

// Update staff member
export const updateStaff = async (id: string, staffData: Partial<Staff>): Promise<Staff> => {
  await delay(600);
  const staff = initializeStaffData();
  
  const index = staff.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error(`Staff with ID ${id} not found`);
  }
  
  staff[index] = { ...staff[index], ...staffData };
  saveStaffData(staff);
  
  return staff[index];
};

// Delete staff member
export const deleteStaff = async (id: string): Promise<boolean> => {
  await delay(500);
  const staff = initializeStaffData();
  
  const index = staff.findIndex(s => s.id === id);
  if (index === -1) {
    return false;
  }
  
  staff.splice(index, 1);
  saveStaffData(staff);
  
  return true;
};
