import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useToast } from "../contexts/ToastContext";
import { createBooking } from "../api/bookingsApi";

const PRICE_PER_TRAVELLER = 9999;

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

export default function BookingModal({
  isOpen = true,
  onClose,
  prefillDestination,
  destination,
  onProceedToPay,
}) {
  const showToast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  // Pre-fill destination when opened from a card click, search select, or detail page
  const targetDestination =
    typeof destination === "string"
      ? destination
      : destination?.name || prefillDestination;

  useEffect(() => {
    if (isOpen && targetDestination) {
      setForm((f) => ({ ...f, destination: targetDestination }));
    }
  }, [isOpen, targetDestination]);

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
    const adults = parseInt(form.adults) || 1;
    const children = parseInt(form.children) || 0;
    const travellers = adults + children;

    return {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      destination: form.destination.trim(),
      packageType: form.packageType,
      travelDate: form.travelDate,
      returnDate: form.returnDate || undefined,
      numberOfTravellers: { adults, children },
      specialRequests: form.specialRequests.trim(),
      amount: travellers * PRICE_PER_TRAVELLER,
    };
  }

  async function handleConfirm() {
    if (!validate())
      return showToast("Please fill in all required fields.", "error");

    setLoading(true);
    try {
      // No paymentStatus sent here -> backend defaults it to "pending"
      const data = await createBooking(buildPayload());
      if (!data.success) {
        throw new Error(
          data.errors?.[0]?.msg || data.message || "Booking failed.",
        );
      }
      onClose();
      showToast(
        `Booking saved! Ref: ${data.bookingReference} — payment pending 💳`,
      );
      setForm(emptyForm);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function handleProceedToPay() {
    if (!validate())
      return showToast("Please fill in all required fields.", "error");

    const payload = buildPayload();
    setForm(emptyForm);

    if (typeof onProceedToPay === "function") {
      onProceedToPay(payload);
    } else {
      onClose?.();
      navigate("/payment", { state: { booking: payload } });
    }
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
          <select
            value={form.packageType}
            onChange={(e) => update("packageType", e.target.value)}
          >
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

      <button
        className="btn-primary"
        onClick={handleProceedToPay}
        style={{ marginBottom: 10 }}
      >
        Proceed to Pay
      </button>
      <button
        className="btn-primary"
        onClick={handleConfirm}
        disabled={loading}
        style={{ background: "#16a34a" }}
      >
        {loading ? "Please wait…" : "Confirm Booking (Pay Later)"}
      </button>
    </Modal>
  );
}
