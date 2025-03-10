/**
 * Configuration file for the application
 * Contains environment-specific settings
 */

// Determine if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// API URLs
export const API_BASE_URL = isDevelopment 
  ? 'http://127.0.0.1:5000'  // Local development backend
  : 'https://mariocarballo.pythonanywhere.com';  // Production backend

// You can add other configuration settings here as needed
