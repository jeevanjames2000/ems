const STORAGE_KEY = "ems_employees";
import { INITIAL_EMPLOYEES as initialData } from "../data/dummyData";
export const employeeService = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(data);
  },
  getById: (id) => {
    const employees = employeeService.getAll();
    return employees.find((emp) => emp.id === id);
  },
  add: (employee) => {
    const employees = employeeService.getAll();
    const newEmployee = {
      ...employee,
      id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
    };
    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return newEmployee;
  },
  update: (id, updatedData) => {
    const employees = employeeService.getAll();
    const index = employees.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      employees[index] = { ...employees[index], ...updatedData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
      return employees[index];
    }
    return null;
  },
  delete: (id) => {
    const employees = employeeService.getAll();
    const filtered = employees.filter((emp) => emp.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
