// data shape: [{ id, message, type: "info"|"warning"|"success", time }, ...]
function SupportPanel({ notifications, loading }) {
  return (
    <div className="db-panel">
      <div className="db-panel-header">
        <h2>Support &amp; Notifications</h2>
      </div>

      {loading ? (
        <div className="db-list-skeleton" />
      ) : notifications?.length ? (
        <ul className="db-notification-list">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`db-notification-item db-notif-${n.type}`}
            >
              <span className="db-notif-message">{n.message}</span>
              <span className="db-notif-time">{n.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="db-empty-text">No open support tickets right now.</p>
      )}
    </div>
  );
}

export default SupportPanel;
