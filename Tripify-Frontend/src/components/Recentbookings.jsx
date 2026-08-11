// data shape: [{ id, travelerName, destination, amount, status, date }, ...]
const STATUS_STYLES = {
  paid: "db-status-confirmed",
  pending: "db-status-pending",
  cancelled: "db-status-cancelled",
};

function RecentBookings({ bookings, loading }) {
  return (
    <div className="db-panel db-panel-wide">
      <div className="db-panel-header">
        <h2>Recent Bookings</h2>
      </div>

      {loading ? (
        <div className="db-list-skeleton" />
      ) : (
        <table className="db-table">
          <thead>
            <tr>
              <th>Traveler</th>
              <th>Destination</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id}>
                <td>{b.travelerName}</td>
                <td>{b.destination}</td>
                <td>₹{Number(b.amount).toLocaleString("en-IN")}</td>
                <td>
                  <span
                    className={`db-status-pill ${STATUS_STYLES[b.status] ?? ""}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>{new Date(b.date).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentBookings;
