import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// data shape: [{ date: "2026-07-01", bookings: 12 }, ...]
function BookingTrends({ data, loading }) {
  return (
    <div className="db-panel db-panel-chart">
      <div className="db-panel-header">
        <h2>Booking Trends</h2>
      </div>

      {loading ? (
        <div className="db-chart-skeleton" />
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--db-border)"
              vertical={false}
            />
            <XAxis dataKey="date" stroke="var(--db-muted)" fontSize={12} />
            <YAxis stroke="var(--db-muted)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--db-panel-bg)",
                border: "1px solid var(--db-border)",
                borderRadius: 10,
              }}
            />
            <Bar
              dataKey="bookings"
              fill="var(--db-accent-2)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default BookingTrends;
