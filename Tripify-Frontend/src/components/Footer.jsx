import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-box">
          <h3>Travel Planner</h3>
          <p>
            Travel Planner helps explorers turn dream trips into reality. We
            make travel planning easy with destination ideas, itinerary tools,
            and budget-friendly guidance so every journey becomes memorable. 🌍
            Plan smarter and travel better.
          </p>
        </div>

        <div className="footer-box contact-info">
          <h3>Contact Us</h3>
          <p>
            <FaEnvelope style={{ marginRight: 8 }} /> support@travelplanner.com
          </p>
          <p>
            <FaPhone style={{ marginRight: 8 }} /> +91 98765 43210
          </p>
          <p>
            <FaLocationDot style={{ marginRight: 8 }} /> India
          </p>
        </div>

        <div className="footer-box">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaXTwitter />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Travel Planner | Designed for explorers 🌏
      </div>
    </footer>
  );
}
