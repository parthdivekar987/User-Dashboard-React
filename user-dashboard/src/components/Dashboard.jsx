import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import placeholderAvatar from '../assets/placeholder-avatar.png';
import gauravAvatar from '../assets/placeholder-avatar1.png';

const TotalUsersTile = ({ count }) => {
  return (
    <div className="kpi-tile">
      <h2>Total Users</h2>
      <p className="kpi-number">{count}</p>
    </div>
  );
};

const UsersPerDayChart = ({ users }) => {
  const dataLast30Days = users.filter(user => {
    const userDate = new Date(user.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return userDate > thirtyDaysAgo;
  });

  const dailyCounts = dataLast30Days.reduce((acc, user) => {
    const date = new Date(user.createdAt).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(dailyCounts).map(date => ({
    date,
    count: dailyCounts[date]
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="chart-container">
      <h3>Users Created Per Day (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const AvatarDistributionChart = ({ users }) => {
  const withAvatar = users.filter(u => u.avatar).length;
  const withoutAvatar = users.length - withAvatar;

  const data = [
    { name: 'With Avatar', value: withAvatar },
    { name: 'Without Avatar', value: withoutAvatar },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="chart-container">
      <h3>Avatar Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const RecentlyJoinedList = ({ users }) => {
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getAvatarForUser = (user) => {
    if (user.name.toLowerCase() === 'gaurav') {
      return gauravAvatar;
    }
    return user.avatar || placeholderAvatar;
  };

  return (
    <div className="recent-users-container">
      <h3>Recently Joined Users</h3>
      <ul>
        {recentUsers.map(user => (
          <li key={user.id} className="recent-user-item">
            <img 
              src={getAvatarForUser(user)} 
              alt={`${user.name}'s avatar`} 
              className="avatar-preview"
            />
            <div>
              <p>{user.name}</p>
              <p className="email">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = ({ users }) => {
    return (
        <section className="dashboard">
          <TotalUsersTile count={users.length} />
          <UsersPerDayChart users={users} />
          <AvatarDistributionChart users={users} />
          <RecentlyJoinedList users={users} />
        </section>
      );
};

export default Dashboard;
