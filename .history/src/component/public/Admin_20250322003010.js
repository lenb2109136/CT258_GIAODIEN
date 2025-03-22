import React, { useEffect, useState } from 'react';
import HeaderAdmin from './HeaderAdmin';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Admin.css';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Admin() {
  const [metrics, setMetrics] = useState({
    earnings: 0,
    spend: 0,
    sales: 0,
    balance: 0,
    newTasks: 0,
    totalProjects: 0,
    customers: 0, // Số khách hàng
    employees: 0, // Số nhân viên
    trips: 0, // Số chuyến
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [tourTypeRevenue, setTourTypeRevenue] = useState([]);
  const [ticketSales, setTicketSales] = useState([]);

  // Fetch dữ liệu từ backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const earningsRes = await axios.get(
          'http://localhost:8080/admin/total-earnings'
        );
        const salesRes = await axios.get(
          'http://localhost:8080/admin/monthly-sales'
        );
        const newTasksRes = await axios.get(
          'http://localhost:8080/admin/new-tasks'
        );
        const totalProjectsRes = await axios.get(
          'http://localhost:8080/admin/total-tours'
        );
        const monthlyRevenueRes = await axios.get(
          'http://localhost:8080/admin/monthly-revenue'
        );
        const tourTypeRevenueRes = await axios.get(
          'http://localhost:8080/admin/tour-type-revenue'
        );
        const ticketSalesRes = await axios.get(
          'http://localhost:8080/admin/ticket-sales'
        );
        // Thêm các API mới
        const customersRes = await axios.get(
          'http://localhost:8080/admin/total-customers'
        );
        const employeesRes = await axios.get(
          'http://localhost:8080/admin/total-employees'
        );
        const tripsRes = await axios.get(
          'http://localhost:8080/admin/total-trips'
        );

        const earnings = earningsRes.data.data?.total || 75452900;
        const sales = salesRes.data.data?.total || 75452900;
        const spend = earnings * 0.5;
        const balance = earnings - spend;
        const newTasks = newTasksRes.data.data?.count || 24;
        const totalProjects = totalProjectsRes.data.data?.count || 16;
        const customers = customersRes.data.data?.count || 100; // Giá trị mặc định
        const employees = employeesRes.data.data?.count || 20; // Giá trị mặc định
        const trips = tripsRes.data.data?.count || 50; // Giá trị mặc định

        setMetrics({
          earnings: (earnings / 1000000).toFixed(2),
          spend: (spend / 1000000).toFixed(2),
          sales: (sales / 1000000).toFixed(2),
          balance: (balance / 1000000).toFixed(2),
          newTasks,
          totalProjects,
          customers,
          employees,
          trips,
        });

        const monthlyData = Array(12).fill(0);
        monthlyRevenueRes.data.data?.forEach(item => {
          monthlyData[item.month - 1] = item.revenue / 1000000;
        });
        setMonthlyRevenue(monthlyData);

        setTourTypeRevenue(tourTypeRevenueRes.data.data || []);

        const ticketData = Array(12).fill(0);
        ticketSalesRes.data.data?.forEach(item => {
          ticketData[item.month - 1] = item.tickets;
        });
        setTicketSales(ticketData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ backend:', error);
        setMetrics({
          earnings: 75.45,
          spend: 37.73,
          sales: 75.45,
          balance: 37.73,
          newTasks: 24,
          totalProjects: 16,
          customers: 100, // Giá trị mặc định nếu API lỗi
          employees: 20, // Giá trị mặc định nếu API lỗi
          trips: 50, // Giá trị mặc định nếu API lỗi
        });
        setMonthlyRevenue(Array(12).fill(0));
        setTourTypeRevenue([]);
        setTicketSales(Array(12).fill(0));
      }
    };

    fetchMetrics();
  }, []);

  // Dữ liệu và tùy chọn cho biểu đồ cột doanh thu 12 tháng
  const monthlyRevenueChartData = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    datasets: [
      {
        label: 'Doanh thu (triệu VND)',
        data: monthlyRevenue,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Doanh thu (triệu VND)' },
      },
    },
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Doanh thu 12 tháng' },
    },
    maintainAspectRatio: false,
  };

  // Dữ liệu và tùy chọn cho biểu đồ tròn (phân phối doanh thu theo loại tour)
  const tourTypeChartData = {
    labels: tourTypeRevenue.map(item => item.typeName),
    datasets: [
      {
        label: 'Doanh thu theo loại tour',
        data: tourTypeRevenue.map(item => item.revenue / 1000000),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const tourTypeChartOptions = {
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Phân phối doanh thu theo loại tour' },
    },
    maintainAspectRatio: false,
  };

  // Dữ liệu và tùy chọn cho biểu đồ cột (số vé bán được theo tháng)
  const ticketSalesChartData = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    datasets: [
      {
        label: 'Số vé bán được',
        data: ticketSales,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const ticketSalesChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Số vé' },
      },
    },
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Số vé bán được theo tháng' },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="admin-container">
      <div className="main-content">
        <div className="dashboard-content">
          {/* Metrics Cards */}
          <div className="metrics">
            <div className="metric-card">
              <h3>Doanh thu tháng này</h3>
              <p>{metrics.earnings} triệu VND</p>
            </div>

            <div className="metric-card">
              <h3>Tổng số tour</h3>
              <p>{metrics.totalProjects}</p>
            </div>
            <div className="metric-card">
              <h3>Tổng số khách hàng</h3>
              <p>{metrics.customers}</p>
            </div>
            <div className="metric-card">
              <h3>Tổng số nhân viên</h3>
              <p>{metrics.employees}</p>
            </div>
            <div className="metric-card">
              <h3>Tổng số chuyến</h3>
              <p>{metrics.trips}</p>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="charts-tables">
            {/* Biểu đồ doanh thu 12 tháng trên một dòng riêng */}
            <div className="chart-section full-width">
              <h3>Tổng cộng: {metrics.earnings} triệu VND</h3>
              <div className="chart-placeholder large">
                <Bar
                  data={monthlyRevenueChartData}
                  options={monthlyRevenueChartOptions}
                />
              </div>
            </div>

            {/* Container cho hai biểu đồ nhỏ hơn nằm ngang */}
            <div className="sub-charts-container">
              <div className="chart-section half-width">
                <h3>Số vé bán được theo tháng</h3>
                <div className="chart-placeholder medium">
                  <Bar
                    data={ticketSalesChartData}
                    options={ticketSalesChartOptions}
                  />
                </div>
              </div>

              <div className="pie-chart-section half-width">
                <h3>Phân phối doanh thu theo loại tour</h3>
                <div className="chart-placeholder medium">
                  <Pie
                    data={tourTypeChartData}
                    options={tourTypeChartOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
