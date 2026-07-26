import { NavLink } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdOutlineBookOnline,
  MdOutlinePeople,
  MdOutlineLocalOffer,
  MdOutlineSupportAgent,
  MdOutlineSettings,
} from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";

const NAV_ITEMS = [
  {
    to: "/admin/dashboard",
    label: "Overview",
    icon: MdSpaceDashboard,
    end: true,
  },
  {
    to: "/admin/dashboard/bookings",
    label: "Bookings",
    icon: MdOutlineBookOnline,
  },
  {
    to: "/admin/dashboard/travelers",
    label: "Travelers",
    icon: MdOutlinePeople,
  },
  {
    to: "/admin/dashboard/packages",
    label: "Packages",
    icon: MdOutlineLocalOffer,
  },
  {
    to: "/admin/dashboard/support",
    label: "Support",
    icon: MdOutlineSupportAgent,
  },
  {
    to: "/admin/dashboard/settings",
    label: "Settings",
    icon: MdOutlineSettings,
  },
];

function DashboardSidebar() {
  return (
    <aside className="db-sidebar">
      <div className="db-sidebar-logo">
        <FaPlaneDeparture />
        <span>Tripify Admin</span>
      </div>

      <nav className="db-sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              "db-sidebar-link" + (isActive ? " db-sidebar-link-active" : "")
            }
          >
            <Icon className="db-sidebar-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
