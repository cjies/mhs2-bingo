const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Ignore type error... lol
declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const gaPageView = (url: string): void => {
  if (!GA_ID || !window.gtag) {
    return;
  }

  window.gtag('config', GA_ID, { page_path: url });
};

// log specific events happening
export const gaEvent = (action: string, params?: Record<string, any>): void => {
  if (!GA_ID || !window.gtag) {
    return;
  }

  window.gtag('event', action, params);
};
