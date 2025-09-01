import React from 'react';
import type { PerformanceTip } from '../types';
import { CacheIcon, ExtensionIcon, TabIcon, RefreshIcon, OtherIcon, ShareIcon, CheckCircleIcon, DownloadIcon } from './icons';

interface TipsDisplayProps {
  tips: PerformanceTip[];
  onShare: () => void;
  onReset: () => void;
  onDownload: () => void;
  isCopied: boolean;
}

const categoryIcons: Record<PerformanceTip['category'], React.ReactNode> = {
  Cache: <CacheIcon className="w-6 h-6 text-accent" />,
  Extensions: <ExtensionIcon className="w-6 h-6 text-accent" />,
  Updates: <RefreshIcon className="w-6 h-6 text-accent" />,
  Tabs: <TabIcon className="w-6 h-6 text-accent" />,
  Other: <OtherIcon className="w-6 h-6 text-accent" />,
};

export const TipsDisplay: React.FC<TipsDisplayProps> = ({ tips, onShare, onReset, isCopied, onDownload }) => {
  return (
    <div className="mt-8 animate-fade-in">
      <h3 className="text-2xl font-bold text-lightest-slate mb-4 text-center">Your AI Performance Tips</h3>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-navy p-5 rounded-lg border border-lightest-navy/20 animate-slide-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-lightest-navy/10 p-3 rounded-full">
                <span className="sr-only">{tip.category}</span>
                {categoryIcons[tip.category] || categoryIcons.Other}
              </div>
              <div>
                <h4 className="font-bold text-lg text-lightest-slate">{tip.title}</h4>
                <p className="text-slate text-base mt-1">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: `${tips.length * 150}ms`}}>
        <button
          onClick={onShare}
          disabled={isCopied}
          className="bg-accent text-navy font-bold text-lg px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center disabled:opacity-70"
        >
          {isCopied ? (
            <>
              <CheckCircleIcon className="w-6 h-6" />
              Copied!
            </>
          ) : (
            <>
              <ShareIcon className="w-6 h-6" />
              Share Tips
            </>
          )}
        </button>

         <button
          onClick={onDownload}
          className="bg-accent text-navy font-bold text-lg px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
        >
          <DownloadIcon className="w-6 h-6" />
          Download Tips
        </button>

        <button
          onClick={onReset}
          className="bg-lightest-navy text-accent border border-accent font-bold text-lg px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
        >
          <RefreshIcon className="w-6 h-6" />
          Boost Again
        </button>
      </div>
    </div>
  );
};