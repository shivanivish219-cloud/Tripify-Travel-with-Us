import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup } = useAuth();
  const showToast = useToast();

  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    const { email, password } = loginForm;
    if (!email || !password) return showToast("Please fill in all fields.", "error");

    setLoading(true);
    try {
      const user = await login(email, password);
      onClose();
      showToast(`Welcome back, ${user.name}! 🎉`);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { name, email, password } = signupForm;
    if (!name || !email || !password)
      return showToast("Please fill in all required fields.", "error");

    setLoading(true);
    try {
      const user = await signup(signupForm);
      onClose();
      showToast(`Account created! Welcome, ${user.name} 🌍`);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-tabs">
        <button
          className={`modal-tab ${tab === "login" ? "active" : ""}`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`modal-tab ${tab === "signup" ? "active" : ""}`}
          onClick={() => setTab("signup")}
        >
          Sign Up
        </button>
      </div>

      {tab === "login" ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Please wait…" : "Login"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone (optional)</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={signupForm.phone}
              onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Please wait…" : "Create Account"}
          </button>
        </form>
      )}
    </Modal>
  );
}
