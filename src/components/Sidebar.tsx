import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Users, 
  Building2, 
  Calendar, 
  ClipboardList, 
  DollarSign, 
  Settings,
  Search,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Use Link from react-router-dom and useLocation
import { PageType } from '../types/navigation';
import SearchInput from './common/SearchInput';

interface SidebarProps {
  onPageChange: (page: PageType) => void;
  currentPage: PageType;
}

const menuItems = [
  { id: 'dashboard' as PageType, icon: <LayoutDashboard />, text: 'Dashboard', path: '/dashboard' },
  { id: 'employees' as PageType, icon: <Users />, text: 'Employees', path: '/employees' },
  { id: 'departments' as PageType, icon: <Building2 />, text: 'Departments', path: '/departments' },
  { id: 'attendance' as PageType, icon: <Calendar />, text: 'Attendance', path: '/attendance' },
  { id: 'leave' as PageType, icon: <ClipboardList />, text: 'Leave Management', path: '/leave' },
  { id: 'payroll' as PageType, icon: <DollarSign />, text: 'Payroll', path: '/payroll' },
  { id: 'settings' as PageType, icon: <Settings />, text: 'Settings', path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation(); // Get the current location (URL)

  const filteredMenuItems = menuItems.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transform lg:translate-x-0 transition-transform duration-200 ease-in-out fixed lg:static inset-y-0 left-0 z-10 w-64 bg-gray-800 text-white`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">OPTIMAL</h1>
          
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search menu..."
          />

          <nav className="space-y-2">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path} // Use Link to navigate
                onClick={() => {
                  onPageChange(item.id); // Optionally pass the page change event
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path // Use location.pathname to highlight the active page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
