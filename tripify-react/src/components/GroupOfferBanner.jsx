export default function GroupOfferBanner({ onCallUs }) {
  return (
    <div className="offer">
      <img
        src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=500&q=80"
        alt="Group trip offer"
      />
      <div className="text-2">
        <strong>
          Planning a group trip? Get up to <span className="off">50% off –</span> exclusive
          discounts!
        </strong>
        <p>We create unforgettable adventures, customised for your group trip</p>
      </div>
      <button className="call" onClick={onCallUs}>
        Call us
      </button>
    </div>
  );
}
