import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Performance monitoring
const reportWebVitals = (metric: any) => {
  console.log('Performance metric:', metric);
};

// Add performance marks
performance.mark('app-start');

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

// Ensure React is properly initialized by wrapping App in StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure and log initial render time
performance.mark('app-end');
performance.measure('app-render', 'app-start', 'app-end');

// Report web vitals
reportWebVitals(performance.getEntriesByType('measure')[0]);