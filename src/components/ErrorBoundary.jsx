import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log to console so developer tools still show details
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, background: 'rgba(255,255,255,0.95)', color: '#b91c1c' }}>
          <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{this.state.error?.message}</pre>
          <p style={{ opacity: 0.8 }}>Check the browser console for full stack trace.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
