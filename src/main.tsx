
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Logo is now bundled and preloaded automatically via ES6 imports

// Initial Load Reliability Check
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Critical Failure: Root element not found.");
  // Attempt a fallback or automatic reload if the DOM is completely empty
  if (window.location.search.indexOf('reload=true') === -1) {
    window.location.href = window.location.href + (window.location.href.indexOf('?') === -1 ? '?' : '&') + 'reload=true';
  }
}

// Global error tracking for production reliability
window.addEventListener('error', (event) => {
  console.error('[GLOBAL_ERROR]', event.error);
  // Auto-recovery for chunk loading failures (typical in Vercel updates)
  if (event.message && event.message.includes('Loading chunk')) {
    window.location.reload();
  }
});

// Report web vitals for performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    // Wrap in timeout to ensure metrics are fully available
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        console.log('Page Load Time:', Math.max(0, perfData.loadEventEnd - perfData.fetchStart), 'ms');
        console.log('DOM Content Loaded:', Math.max(0, perfData.domContentLoadedEventEnd - perfData.fetchStart), 'ms');
        console.log('First Paint:', performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A', 'ms');
      }
    }, 100);
  });
}
