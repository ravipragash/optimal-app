import React, { useState } from 'react';
import { UserPlus, Search, Mail, Phone, Edit, Trash } from 'lucide-react';

const employeesData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', phone: '+1234567890', status: 'Active', joiningDate: '2023-01-01', leavingDate: '' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', department: 'Marketing', phone: '+1234567891', status: 'Active', joiningDate: '2023-02-01', leavingDate: '' },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(employeesData);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    joiningDate: '',
    leavingDate: '',
    present: true,
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setEmployees([...employees, {
      ...newEmployee,
      id: employees.length + 1,
      status: newEmployee.present ? 'Active' : 'Inactive',
    }]);
    setNewEmployee({ name: '', email: '', department: '', phone: '', joiningDate: '', leavingDate: '', present: true });
    setShowModal(false);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <UserPlus size={20} />
          Add Employee
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full px-4 py-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  {employee.email}
                </td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  {employee.phone}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-blue-500 hover:underline"><Edit size={16} /></button>
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="text-red-500 hover:underline"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Employee</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Joining Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
                value={newEmployee.joiningDate}
                onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Leaving Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
                value={newEmployee.leavingDate}
                disabled={newEmployee.present}
                onChange={(e) => setNewEmployee({ ...newEmployee, leavingDate: e.target.value })}
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={newEmployee.present}
                onChange={(e) => setNewEmployee({ ...newEmployee, present: e.target.checked, leavingDate: e.target.checked ? '' : newEmployee.leavingDate })}
              />
              <label className="text-sm font-medium text-gray-700">Present</label>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button onClick={handleAddEmployee} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;