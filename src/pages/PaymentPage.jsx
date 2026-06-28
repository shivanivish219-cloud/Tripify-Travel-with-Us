import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { createBooking } from "../api/bookingsApi";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();
  const booking = state?.booking;

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | success
  const [bookingRef, setBookingRef] = useState(null);

  // No booking info? send them back to start one instead of showing a dead page.
  if (!booking) {
    return (
      <div style={{ maxWidth: 480, margin: "60px auto", textAlign: "center" }}>
        <h2>No booking in progress</h2>
        <p style={{ color: "#64748b" }}>
          Pick a destination from the homepage first, then proceed to pay.
        </p>
        <Link to="/" className="btn-primary" style={{ display: "inline-block", textDecoration: "none", padding: "12px 24px" }}>
          Go to Homepage
        </Link>
      </div>
    );
  }

  // Rough total estimate just for display — real pricing logic can be
  // wired to the destination's priceFrom/priceTo later.
  const travellers = (booking.numberOfTravellers?.adults || 1) + (booking.numberOfTravellers?.children || 0);
  const estimatedTotal = travellers * 9999;

  function validatePayment() {
    if (method === "card") {
      return card.number.replace(/\s/g, "").length >= 12 && card.name && card.expiry && card.cvv.length >= 3;
    }
    return upiId.includes("@");
  }

  async function handlePay(e) {
    e.preventDefault();
    if (!validatePayment()) {
      return showToast("Please enter valid payment details.", "error");
    }

    setStatus("processing");
    try {
      // Simulate gateway delay
      await new Promise((res) => setTimeout(res, 1800));

      const data = await createBooking(booking);
      if (!data.success) {
        throw new Error(data.errors?.[0]?.msg || data.message || "Booking failed.");
      }
      setBookingRef(data.bookingReference);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      showToast(err.message, "error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ maxWidth: 480, margin: "60px auto", textAlign: "center" }}>
        <div style={{ fontSize: 56 }}>✅</div>
        <h2>Payment Successful!</h2>
        <p style={{ color: "#64748b" }}>
          Your trip to <strong>{booking.destination}</strong> is confirmed.
        </p>
        <p style={{ background: "#f0fdf4", color: "#16a34a", padding: "10px 16px", borderRadius: 8, display: "inline-block", fontWeight: 700 }}>
          Booking Ref: {bookingRef}
        </p>
        <div style={{ marginTop: 20 }}>
          <Link to="/my-bookings" className="btn-primary" style={{ display: "inline-block", textDecoration: "none", padding: "12px 24px", marginRight: 10 }}>
            View My Bookings
          </Link>
          <Link to="/" style={{ color: "#2563eb", textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: "0 16px" }}>
      <h2>Complete Your Payment 💳</h2>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16, marginBottom: 20 }}>
        <p style={{ margin: "4px 0" }}><strong>Destination:</strong> {booking.destination}</p>
        <p style={{ margin: "4px 0" }}><strong>Travel Date:</strong> {booking.travelDate}</p>
        <p style={{ margin: "4px 0" }}><strong>Travellers:</strong> {travellers}</p>
        <p style={{ margin: "4px 0", fontWeight: 700, color: "#103152" }}>
          Estimated Total: ₹{estimatedTotal.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="modal-tabs">
        <button className={`modal-tab ${method === "card" ? "active" : ""}`} onClick={() => setMethod("card")}>
          Card
        </button>
        <button className={`modal-tab ${method === "upi" ? "active" : ""}`} onClick={() => setMethod("upi")}>
          UPI
        </button>
      </div>

      <form onSubmit={handlePay}>
        {method === "card" ? (
          <>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry (MM/YY)</label>
                <input
                  type="text"
                  placeholder="08/28"
                  maxLength={5}
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  maxLength={4}
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        <button className="btn-primary" type="submit" disabled={status === "processing"}>
          {status === "processing" ? "Processing payment…" : `Pay ₹${estimatedTotal.toLocaleString("en-IN")}`}
        </button>
      </form>

      <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 14 }}>
        🔒 This is a simulated payment for practice purposes — no real money is charged.
      </p>
    </div>
  );
}
