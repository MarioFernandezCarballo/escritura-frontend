/**
 * Helper functions for Google Analytics 4 tracking via Google Tag Manager
 */

/**
 * Track a custom event with Google Analytics 4
 * @param eventName The name of the event to track
 * @param eventParams Additional parameters to include with the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  // Make sure we're in the browser environment and dataLayer exists
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
};

/**
 * Track a page view event
 * @param path The path of the page
 * @param title The title of the page
 */
export const trackPageView = (path: string, title: string) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
};

/**
 * Track a click event
 * @param category The category of the click (e.g., 'navigation', 'button', 'link')
 * @param label The label for the click (e.g., 'home', 'submit', 'read more')
 * @param value Optional numeric value associated with the event
 */
export const trackClick = (category: string, label: string, value?: number) => {
  trackEvent('click', {
    click_category: category,
    click_label: label,
    click_value: value,
  });
};

/**
 * Track a form submission event
 * @param formName The name of the form
 * @param formId The ID of the form
 * @param success Whether the submission was successful
 */
export const trackFormSubmission = (formName: string, formId: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_id: formId,
    form_success: success,
  });
};

/**
 * Track a content view event (for articles, publications, etc.)
 * @param contentType The type of content (e.g., 'article', 'publication', 'podcast')
 * @param contentId The ID of the content
 * @param contentName The name/title of the content
 */
export const trackContentView = (contentType: string, contentId: string, contentName: string) => {
  trackEvent('content_view', {
    content_type: contentType,
    content_id: contentId,
    content_name: contentName,
  });
};
