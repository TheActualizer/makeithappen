import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful:', registration.scope);
        
        // Request notification permission
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              console.log('Notification permission granted');
            }
          });
        }
      })
      .catch(err => {
        console.error('ServiceWorker registration failed:', err);
      });
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);