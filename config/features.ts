// Default configuration
const DEFAULT_FEATURES = {
  AI_COACH: false,
  CAMERA_EVIDENCE: false,
  FILE_UPLOADS: false
};

// Keys for localStorage
const STORAGE_KEY = 'thynklab_dev_features';

export const getFeatures = () => {
  // Check if we are in dev mode via URL
  const urlParams = new URLSearchParams(window.location.search);
  const isDev = urlParams.get('dev') === 'true';

  if (!isDev) {
    return DEFAULT_FEATURES;
  }

  // In dev mode, try to load overrides from storage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_FEATURES, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load feature flags', e);
  }

  return DEFAULT_FEATURES;
};

export const saveFeatures = (features: typeof DEFAULT_FEATURES) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
  window.location.reload(); // Reload to apply changes safely
};