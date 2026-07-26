import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// data shape: [{ date: "2026-07-01", revenue: 42000 }, ...]
function RevenueChart({ data, loading }) {
  return (
    <div className="db-panel db-panel-chart">
      <div className="db-panel-header">
        <h2>Revenue Trend</h2>
      </div>

      {loading ? (
        <div className="db-chart-skeleton" />
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--db-accent)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--db-accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
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
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--db-accent)"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RevenueChart;
