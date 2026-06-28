import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import BookingModal from "./components/BookingModal";
import ContactModal from "./components/ContactModal";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import DestinationsPage from "./pages/DestinationsPage";

export default function App() {
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [prefillDestination, setPrefillDestination] = useState("");

  function openBookingFor(destinationName) {
    setPrefillDestination(destinationName);
    setBookingOpen(true);
  }

  function handleProceedToPay(payload) {
    setBookingOpen(false);
    navigate("/payment", { state: { booking: payload } });
  }

  return (
    <>
      <Navbar onOpenAuth={() => setAuthOpen(true)} onSelectDestination={openBookingFor} />

      <Routes>
        <Route
          path="/"
          element={<HomePage onCardClick={openBookingFor} onOpenContact={() => setContactOpen(true)} />}
        />
        <Route path="/destinations" element={<DestinationsPage onCardClick={(d) => openBookingFor(d.name)} />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        prefillDestination={prefillDestination}
        onProceedToPay={handleProceedToPay}
      />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
