export type OptimizationStatus = 'idle' | 'boosting' | 'complete';

// FIX: Define a specific union type for performance tip categories for better type safety.
export type PerformanceCategory = 'Cache' | 'Extensions' | 'Updates' | 'Tabs' | 'Other';

export interface PerformanceTip {
  title: string;
  description: string;
  // FIX: Use the specific PerformanceCategory type instead of a generic string.
  category: PerformanceCategory;
}

// FIX: Define and export SafeBrowsingCategory to resolve the import error in SafeBrowsingCheck.tsx.
export type SafeBrowsingCategory = 'Privacy' | 'Phishing' | 'Passwords' | 'Updates' | 'General';

export interface SafeBrowsingTip {
  title: string;
  description: string;
  // FIX: Use the specific SafeBrowsingCategory type instead of a generic string.
  category: SafeBrowsingCategory;
}
