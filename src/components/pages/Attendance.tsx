import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Search } from 'lucide-react';

const attendanceData = [
  { id: 1, name: 'John Doe', date: '2024-03-14', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
  { id: 2, name: 'Sarah Smith', date: '2024-03-14', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'Present' },
];

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredAttendance = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <div className="flex gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Clock size={20} />
            Mark Attendance
          </button>
        </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAttendance.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <CalendarIcon size={16} className="text-gray-400" />
                  {record.date}
                </td>
                <td className="px-6 py-4">{record.checkIn}</td>
                <td className="px-6 py-4">{record.checkOut}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;