import React from 'react';
import { BarChart3, Users, Clock, Calendar } from 'lucide-react';
import StatCard from '../stats/StatCard';
import ActivityFeed from '../stats/ActivityFeed';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      {/* Main title section */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the HRM Dashboard!</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="Total Employees"
          value="156"
          trend="+12% from last month"
        />
        <StatCard
          icon={<Clock className="h-8 w-8 text-green-500" />}
          title="Average Attendance"
          value="92%"
          trend="+3% from last month"
        />
        <StatCard
          icon={<Calendar className="h-8 w-8 text-purple-500" />}
          title="Leave Requests"
          value="8"
          trend="4 pending approval"
        />
        <StatCard
          icon={<BarChart3 className="h-8 w-8 text-orange-500" />}
          title="Total Payroll"
          value="$284,500"
          trend="For March 2024"
        />
      </div>

      {/* Activity feed */}
      <ActivityFeed />
    </div>
  );
}

export default Dashboard;
