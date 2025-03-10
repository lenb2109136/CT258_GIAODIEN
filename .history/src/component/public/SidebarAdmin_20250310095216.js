import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';
import './Admin.css';

export default function Admin() {
  // Mock data (unchanged)
  const metrics = {
    earnings: 350.4,
    spend: 642.39,
    sales: 574.34,
    balance: 1000,
    newTasks: 154,
    totalProjects: 2935,
  };

  const checkTableData = [
    { name: 'Horizon UI PRO', progress: '17.5%', quantity: 2458, date: '12 Jan 2021' },
    { name: 'Horizon UI Free', progress: '10.8%', quantity: 1485, date: '21 Feb 2021' },
    { name: 'Weekly Update', progress: '21.3%', quantity: 1024, date: '13 Mar 2021' },
  ];

  return (
    <div className="admin-container">
      <SidebarAdmin />
      <div className="main-content" style={{ marginLeft: '200px', paddingTop: '70px' }}>
        <HeaderAdmin />
        <div className="dashboard-content">
          {/* Metrics Cards */}
          <div className="metrics">
            <div className="metric-card">
              <h3>Earnings</h3>
              <p>${metrics.earnings}</p>
            </div>
            <div className="metric-card">
              <h3>Spend this month</h3>
              <p>${metrics.spend}</p>
            </div>
            <div className="metric-card">
              <h3>Sales</h3>
              <p>${metrics.sales}</p>
              <span className="growth">+23% since last month</span>
            </div>
            <div className="metric-card">
              <h3>Your balance</h3>
              <p>${metrics.balance}</p>
              <span>🇺🇸</span>
            </div>
            <div className="metric-card">
              <h3>New Tasks</h3>
              <p>{metrics.newTasks}</p>
            </div>
            <div className="metric-card">
              <h3>Total Projects</h3>
              <p>{metrics.totalProjects}</p>
            </div>
          </div>

          {/* Charts and Tables (unchanged for brevity) */}
          <div className="charts-tables">
            {/* ... (rest of the content remains the same) */}
          </div>
        </div>
      </div>
    </div>
  );
}