import React from 'react';

// Catches errors in child components and displays a fallback UI
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Track if an error has occurred and store the error message
    this.state = { hasError: false, message: '' };
  }

  // Update state when an error is thrown in a child component
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  // Log error details for debugging
  componentDidCatch(error, info) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    // Show fallback UI if an error occurred
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded-md mx-4">
          <h2 className="font-semibold">Something went wrong</h2>
          <p>{this.state.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload
          </button>
        </div>
      );
    }
    // Render children if no error
    return this.props.children;
  }
}
