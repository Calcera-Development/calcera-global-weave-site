
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Logo is now bundled and preloaded automatically via ES6 imports

// Optimize rendering with concurrent features
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Report web vitals for performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    // Log performance metrics
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms');
    console.log('First Paint:', performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A', 'ms');
  });
}
