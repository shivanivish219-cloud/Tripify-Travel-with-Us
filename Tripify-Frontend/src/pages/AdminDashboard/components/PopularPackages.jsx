// data shape: [{ id, name, location, bookings }, ...] — sorted by bookings desc, API side
function PopularPackages({ packages, loading }) {
  return (
    <div className="db-panel">
      <div className="db-panel-header">
        <h2>Popular Packages</h2>
      </div>

      {loading ? (
        <div className="db-list-skeleton" />
      ) : (
        <ul className="db-package-list">
          {packages?.map((pkg, index) => (
            <li key={pkg.id} className="db-package-item">
              <span className="db-package-rank">{index + 1}</span>
              <div className="db-package-info">
                <span className="db-package-name">{pkg.name}</span>
                <span className="db-package-location">{pkg.location}</span>
              </div>
              <span className="db-package-count">{pkg.bookings} bookings</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopularPackages;
