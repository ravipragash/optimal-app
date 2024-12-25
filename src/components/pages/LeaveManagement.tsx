import React, { useState } from 'react';
import { CalendarPlus, Search } from 'lucide-react';

const leaveRequests = [
  { id: 1, employee: 'John Doe', type: 'Annual Leave', from: '2024-03-20', to: '2024-03-22', status: 'Pending' },
  { id: 2, employee: 'Sarah Smith', type: 'Sick Leave', from: '2024-03-15', to: '2024-03-16', status: 'Approved' },
];

const LeaveManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = leaveRequests.filter(request =>
    request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <CalendarPlus size={20} />
          Request Leave
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search leave requests..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{request.employee}</td>
                <td className="px-6 py-4">{request.type}</td>
                <td className="px-6 py-4">{request.from}</td>
                <td className="px-6 py-4">{request.to}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-green-600 hover:text-green-800">Approve</button>
                    <button className="text-red-600 hover:text-red-800">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;