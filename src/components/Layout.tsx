import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { PageType } from '../types/navigation';

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;