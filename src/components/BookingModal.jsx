import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";
import { createBooking } from "../api/bookingsApi";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  destination: "",
  packageType: "domestic",
  travelDate: "",
  returnDate: "",
  adults: 1,
  children: 0,
  specialRequests: "",
};

export default function BookingModal({ isOpen, onClose, prefillDestination, onProceedToPay }) {
  const showToast = useToast();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  // Pre-fill destination when opened from a card click or search select
  useEffect(() => {
    if (isOpen && prefillDestination) {
      setForm((f) => ({ ...f, destination: prefillDestination }));
    }
  }, [isOpen, prefillDestination]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    return (
      form.fullName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.destination.trim() &&
      form.travelDate
    );
  }

  function buildPayload() {
    return {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      destination: form.destination.trim(),
      packageType: form.packageType,
      travelDate: form.travelDate,
      returnDate: form.returnDate || undefined,
      numberOfTravellers: {
        adults: parseInt(form.adults) || 1,
        children: parseInt(form.children) || 0,
      },
      specialRequests: form.specialRequests.trim(),
    };
  }

  async function handleConfirm() {
    if (!validate()) return showToast("Please fill in all required fields.", "error");

    setLoading(true);
    try {
      const data = await createBooking(buildPayload());
      if (!data.success) {
        throw new Error(data.errors?.[0]?.msg || data.message || "Booking failed.");
      }
      onClose();
      showToast(`Booking confirmed! Ref: ${data.bookingReference} 🎉`);
      setForm(emptyForm);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function handleProceedToPay() {
    if (!validate()) return showToast("Please fill in all required fields.", "error");
    onProceedToPay(buildPayload());
    setForm(emptyForm);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="520px">
      <h2>Book Your Trip ✈️</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="As per passport/ID"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Confirmation will be sent here"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Destination</label>
        <input
          type="text"
          value={form.destination}
          onChange={(e) => update("destination", e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Package Type</label>
          <select value={form.packageType} onChange={(e) => update("packageType", e.target.value)}>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>
        <div className="form-group">
          <label>Travel Date</label>
          <input
            type="date"
            value={form.travelDate}
            onChange={(e) => update("travelDate", e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Return Date (optional)</label>
          <input
            type="date"
            value={form.returnDate}
            onChange={(e) => update("returnDate", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Adults</label>
          <input
            type="number"
            min="1"
            value={form.adults}
            onChange={(e) => update("adults", e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Children</label>
        <input
          type="number"
          min="0"
          value={form.children}
          onChange={(e) => update("children", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Special Requests (optional)</label>
        <textarea
          value={form.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={handleProceedToPay} style={{ marginBottom: 10 }}>
        Proceed to Pay
      </button>
      <button className="btn-primary" onClick={handleConfirm} disabled={loading} style={{ background: "#16a34a" }}>
        {loading ? "Please wait…" : "Confirm Booking (Pay Later)"}
      </button>
    </Modal>
  );
}
