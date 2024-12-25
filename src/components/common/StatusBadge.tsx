import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'default' | 'success' | 'warning' | 'error';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'default' }) => {
  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-sm rounded-full ${getColorClasses()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;