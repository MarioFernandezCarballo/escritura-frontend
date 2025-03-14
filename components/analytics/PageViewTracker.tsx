'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PageViewTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Construct the full URL including search parameters
      const url = searchParams?.size
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // Push to dataLayer for GA4 page view tracking
      window.dataLayer.push({
        event: 'page_view',
        page_path: pathname,
        page_url: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
};

export default PageViewTracker;
