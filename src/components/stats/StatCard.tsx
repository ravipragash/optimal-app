import React, { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      {icon}
      <span className="text-sm text-gray-500">{title}</span>
    </div>
    <div className="text-2xl font-bold mb-2">{value}</div>
    <div className="text-sm text-gray-600">{trend}</div>
  </div>
);

export default StatCard;