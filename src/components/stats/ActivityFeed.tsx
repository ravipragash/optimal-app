import React from 'react';

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "New Employee Added",
    description: "John Doe was added to the Engineering department",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Leave Request",
    description: "Sarah Johnson requested annual leave",
    time: "4 hours ago"
  },
  {
    id: 3,
    title: "Payroll Generated",
    description: "March 2024 payroll has been processed",
    time: "Yesterday"
  }
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
            <div>
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;