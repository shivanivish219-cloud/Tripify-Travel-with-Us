import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchDestinations } from "../api/destinationsApi";
import { fallbackDestinations } from "../assets/fallbackDestinations";

export default function Navbar({ onOpenAuth }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // Debounced live search (mirrors the original 300ms setTimeout pattern)
  useEffect(() => {
    if (!query.trim()) {
      setShowResults(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchDestinations({ q: query });
        setResults(data.destinations || []);
      } catch {
        // API not reachable yet — fall back to local filtering so the
        // search bar still feels alive during development.
        const q = query.toLowerCase();
        setResults(
          fallbackDestinations.filter((d) => d.name.toLowerCase().includes(q)),
        );
      }
      setShowResults(true);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSelect = useCallback(
    (destination) => {
      navigate(`/destinations/${destination.slug}`);
      setQuery("");
      setResults([]);
      setShowResults(false);
    },
    [navigate],
  );

  return (
    <>
      {/* ── Top bar ─────────────────────────────────── */}
      <div className="main-continer">
        <div className="head">
          <span>022-78934191</span>
          <span>Travel Agent? Join Us</span>
          <div id="auth-nav">
            {isAuthenticated ? (
              <>
                <span id="user-greeting">
                  👋 Hi, {user?.name?.split(" ")[0]}
                </span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <a
                href="#"
                className="log-link"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenAuth();
                }}
              >
                Log in / Sign up
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Nav ─────────────────────────────────────── */}
      <nav>
        <Link to="/" className="title">
          <img
            src="/logo.png"
            alt="Travel Logo"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="title-name">Tripify</span>
        </Link>

        <div className="search search-wrapper" ref={wrapperRef}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for destination, hotel, activity"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div id="search-results" className={showResults ? "show" : ""}>
            {results.length === 0 ? (
              <div className="search-result-item">
                <span className="dest-meta">No destinations found.</span>
              </div>
            ) : (
              results.slice(0, 8).map((d) => (
                <div
                  key={d.slug || d.name}
                  className="search-result-item"
                  onClick={() => handleSelect(d)}
                >
                  <div>
                    <div className="dest-name">{d.name}</div>
                    <div className="dest-meta">
                      {d.duration || ""} &nbsp;•&nbsp; ₹
                      {d.priceFrom?.toLocaleString("en-IN") || "—"} onwards
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="nav-links">
          <div className="nav-items">
            <span>
              Tours <i className="fa-solid fa-chevron-down"></i>
            </span>
            <div className="dropdown">
              <a href="#">Domestic tours</a>
              <a href="#">International tours</a>
            </div>
          </div>
          <div className="nav-items">
            <span>
              Services <i className="fa-solid fa-chevron-down"></i>
            </span>
            <div className="dropdown">
              <a href="#">Travel booking</a>
              <a href="#">Accommodations</a>
              <a href="#">Transportation services</a>
              <a href="#">Tour Packages</a>
              <a href="#">Visa & Passport Assistance</a>
              <a href="#">Travel Insurance</a>
              <a href="#">24/7 Customer Support</a>
            </div>
          </div>
          <div className="nav-items">
            <span>
              Blogs <i className="fa-solid fa-chevron-down"></i>
            </span>
            <div className="dropdown">
              <a href="#">Travel Tips</a>
              <a href="#">Top Destinations</a>
              <a href="#">Budget Travel Guide</a>
              <a href="#">Honeymoon Special</a>
              <a href="#">Adventure Travel</a>
              <a href="#">Visa & Travel Updates</a>
            </div>
          </div>
          <div className="nav-items">
            <span>
              Career <i className="fa-solid fa-chevron-down"></i>
            </span>
            <div className="dropdown">
              <a href="#">Current Openings</a>
              <a href="#">Travel Consultant</a>
              <a href="#">Tour Manager</a>
              <a href="#">Marketing Executive</a>
              <a href="#">Internship Program</a>
              <a href="#">Apply Now</a>
            </div>
          </div>
          {isAuthenticated && (
            <div className="nav-items" onClick={() => navigate("/my-bookings")}>
              <span>My Bookings</span>
            </div>
          )}
          {isAuthenticated && user?.role === "navigator" && (
            <div
              className="nav-items"
              onClick={() => navigate("/admin/dashboard")}
            >
              <span>Dashboard</span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
