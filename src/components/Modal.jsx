export default function Modal({ isOpen, onClose, maxWidth, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" style={maxWidth ? { maxWidth } : undefined}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
