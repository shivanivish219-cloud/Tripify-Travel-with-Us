import { useState } from "react";
import { MdSearch, MdOutlineNotificationsNone } from "react-icons/md";

function DashboardNavbar({ adminName = "Admin", range, onRangeChange }) {
  const [search, setSearch] = useState("");

  return (
    <header className="db-navbar">
      <h1 className="db-navbar-title">Dashboard</h1>

      <div className="db-navbar-search">
        <MdSearch />
        <input
          type="text"
          placeholder="Search bookings, travelers, packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="db-navbar-right">
        <select
          className="db-range-select"
          value={range}
          onChange={(e) => onRangeChange(e.target.value)}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>

        <button
          type="button"
          className="db-icon-btn"
          aria-label="Notifications"
        >
          <MdOutlineNotificationsNone />
          <span className="db-notif-dot" />
        </button>

        <div className="db-admin-chip">
          <div className="db-admin-avatar">{adminName.charAt(0)}</div>
          <span>{adminName}</span>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
