import {
  MdOutlineCurrencyRupee,
  MdOutlineBookOnline,
  MdOutlinePeople,
  MdOutlineStarRate,
} from "react-icons/md";

// kpis shape expected from the API:
// { revenue: { value, changePercent }, bookings: {...}, travelers: {...}, rating: {...} }
function KpiCards({ kpis, loading }) {
  const cards = [
    {
      key: "revenue",
      label: "Total Revenue",
      icon: MdOutlineCurrencyRupee,
      format: (v) => `₹${Number(v).toLocaleString("en-IN")}`,
    },
    {
      key: "bookings",
      label: "Total Bookings",
      icon: MdOutlineBookOnline,
      format: (v) => Number(v).toLocaleString("en-IN"),
    },
    {
      key: "travelers",
      label: "Active Travelers",
      icon: MdOutlinePeople,
      format: (v) => Number(v).toLocaleString("en-IN"),
    },
    {
      key: "rating",
      label: "Avg. Rating",
      icon: MdOutlineStarRate,
      format: (v) => `${Number(v).toFixed(1)} / 5`,
    },
  ];

  return (
    <div className="db-kpi-grid">
      {cards.map(({ key, label, icon: Icon, format }) => {
        const data = kpis?.[key];
        const isPositive = (data?.changePercent ?? 0) >= 0;

        return (
          <div key={key} className="db-kpi-card">
            <div className="db-kpi-icon">
              <Icon />
            </div>

            <div className="db-kpi-body">
              <span className="db-kpi-label">{label}</span>

              {loading ? (
                <span className="db-kpi-skeleton" />
              ) : (
                <>
                  <span className="db-kpi-value">
                    {format(data?.value ?? 0)}
                  </span>
                  <span
                    className={`db-kpi-change ${isPositive ? "positive" : "negative"}`}
                  >
                    {isPositive ? "▲" : "▼"}{" "}
                    {Math.abs(data?.changePercent ?? 0)}% vs last period
                  </span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KpiCards;
