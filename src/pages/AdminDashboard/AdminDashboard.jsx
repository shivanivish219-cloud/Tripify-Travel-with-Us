import { useEffect, useState, useCallback } from "react";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";
import KpiCards from "../../components/KpiCards";
import RevenueChart from "../../components/RevenueChart";
import BookingTrends from "../../components/BookingTrends";
import PopularPackages from "../../components/PopularPackages";
import RecentBookings from "../../components/RecentBookings";
import SupportPanel from "../../components/SupportPanel";
import {
  fetchKpis,
  fetchRevenueTrend,
  fetchBookingTrend,
  fetchPopularPackages,
  fetchRecentBookings,
} from "../../api/dashboardApi";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [kpis, setKpis] = useState(null);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [bookingTrend, setBookingTrend] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);

  const loadDashboardData = useCallback(async (selectedRange) => {
    setLoading(true);
    setError(null);

    try {
      const [
        kpiData,
        revenueData,
        bookingData,
        packageData,
        recentBookingData,
      ] = await Promise.all([
        fetchKpis(selectedRange),
        fetchRevenueTrend(selectedRange),
        fetchBookingTrend(selectedRange),
        fetchPopularPackages(),
        fetchRecentBookings(8),
      ]);

      setKpis(kpiData);
      setRevenueTrend(revenueData);
      setBookingTrend(bookingData);
      setPackages(packageData);
      setBookings(recentBookingData);
    } catch (err) {
      console.error("Dashboard load failed:", err);
      setError("Couldn't load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData(range);
  }, [range, loadDashboardData]);

  return (
    <div className="db-layout">
      <DashboardSidebar />

      <div className="db-main">
        <DashboardNavbar range={range} onRangeChange={setRange} />

        <div className="db-content">
          {error && (
            <div className="db-error-banner">
              {error}
              <button onClick={() => loadDashboardData(range)}>Retry</button>
            </div>
          )}

          <KpiCards kpis={kpis} loading={loading} />

          <div className="db-grid-2">
            <RevenueChart data={revenueTrend} loading={loading} />
            <BookingTrends data={bookingTrend} loading={loading} />
          </div>

          <div className="db-grid-2">
            <PopularPackages packages={packages} loading={loading} />
            <SupportPanel notifications={[]} loading={loading} />
          </div>

          <RecentBookings bookings={bookings} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
