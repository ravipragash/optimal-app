import React, { useState } from 'react';
import { FolderPlus, Users, Search } from 'lucide-react';

const departmentsData = [
  { id: 1, name: 'Engineering', employees: 45, manager: 'Robert Wilson', budget: '$450,000' },
  { id: 2, name: 'Marketing', employees: 28, manager: 'Emily Brown', budget: '$320,000' },
];

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = departmentsData.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FolderPlus size={20} />
          Add Department
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search departments..."
          className="w-full px-4 py-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{department.name}</h3>
              <span className="flex items-center gap-2 text-gray-600">
                <Users size={20} />
                {department.employees}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Manager: {department.manager}</p>
              <p>Annual Budget: {department.budget}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;