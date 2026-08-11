import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
    // Optional: Send to error tracking (Sentry, LogRocket, etc.)
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f5f5",
          }}
        >
          <h1 style={{ color: "#d32f2f" }}>Oops! Something went wrong</h1>
          <p style={{ color: "#666", marginTop: "1rem" }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1rem",
              background: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Go to Home
          </button>
          {process.env.NODE_ENV === "development" && (
            <pre
              style={{
                marginTop: "2rem",
                textAlign: "left",
                background: "#fff",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                maxWidth: "100%",
              }}
            >
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
