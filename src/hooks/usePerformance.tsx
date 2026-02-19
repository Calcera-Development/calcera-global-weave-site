
import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Handle different types of performance entries
        if (entry.entryType === 'paint') {
          console.log(`Performance metric: ${entry.name}`, entry.startTime);
        } else if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log(`Performance metric: ${entry.name}`, {
            loadTime: navEntry.loadEventEnd - navEntry.fetchStart,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart
          });
        } else if (entry.entryType === 'largest-contentful-paint') {
          const lcpEntry = entry as PerformancePaintTiming;
          console.log(`Performance metric: ${entry.name}`, lcpEntry.startTime);
        } else {
          console.log(`Performance metric: ${entry.name}`, entry);
        }
      }
    });

    // Observe paint and navigation timing
    observer.observe({ entryTypes: ['paint', 'navigation', 'largest-contentful-paint'] });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Preload critical resources
  useEffect(() => {
    // Logo is now bundled and loaded automatically via import
  }, []);
};
