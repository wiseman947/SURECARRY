import DashboardCards from "./components/DashboardCards";
import RevenueChart from "./components/RevenueChart";
import RecentBookings from "./components/RecentBookings";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <DashboardCards />

      <RevenueChart />

      <RecentBookings />

    </div>
  );
}