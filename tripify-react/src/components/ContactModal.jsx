import { useState } from "react";
import Modal from "./Modal";
import { useToast } from "../context/ToastContext";
import { sendContactMessage } from "../api/contactApi";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactModal({ isOpen, onClose }) {
  const showToast = useToast();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return showToast("Please fill in all required fields.", "error");
    }

    setLoading(true);
    try {
      const payload = { ...form, subject: form.subject.trim() || "General Inquiry" };
      const data = await sendContactMessage(payload);
      if (!data.success) {
        throw new Error(data.errors?.[0]?.msg || data.message || "Failed to send.");
      }
      onClose();
      showToast(data.message || "Message sent! 🙏");
      setForm(emptyForm);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Get in Touch 📞</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone (optional)</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            placeholder="What's this about?"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            placeholder="Tell us how we can help you..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Please wait…" : "Send Message"}
        </button>
      </form>
    </Modal>
  );
}
