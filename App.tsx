import React, { useState } from 'react';
import { Booster } from './components/Booster';
import { SafeBrowsingCheck } from './components/SafeBrowsingCheck';
import { SparklesIcon, RocketIcon, ShieldCheckIcon, BitcoinIcon, ClipboardIcon, CheckCircleIcon } from './components/icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'security'>('performance');
  const [isBtcAddressCopied, setIsBtcAddressCopied] = useState(false);

  const tabButtonStyle = "flex-1 px-4 py-3 text-sm sm:text-base font-bold rounded-t-lg transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const activeTabStyle = "bg-light-navy text-accent";
  const inactiveTabStyle = "bg-navy text-slate hover:bg-lightest-navy/20";
  
  const btcAddress = 'bc1q9ejvyun26ampsgdydlp3vg42q0vncyn006r7y8';

  const handleCopyBtcAddress = () => {
    if (isBtcAddressCopied) return;
    navigator.clipboard.writeText(btcAddress).then(() => {
      setIsBtcAddressCopied(true);
      setTimeout(() => setIsBtcAddressCopied(false), 2500);
    }).catch(err => {
      console.error('Failed to copy BTC address: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-navy font-sans text-lightest-slate flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-lightest-slate flex items-center justify-center gap-3">
          <SparklesIcon className="w-8 h-8 text-accent" />
          Web Turbo Kit
        </h1>
        <p className="text-lg text-slate mt-2">The futuristic way to speed up and secure your browser.</p>
      </header>
      <main className="w-full max-w-2xl">
        <div className="flex" role="tablist" aria-label="Features">
          <button
            id="tab-performance"
            role="tab"
            aria-selected={activeTab === 'performance'}
            aria-controls="panel-performance"
            onClick={() => setActiveTab('performance')}
            className={`${tabButtonStyle} ${activeTab === 'performance' ? activeTabStyle : inactiveTabStyle}`}
          >
            <RocketIcon className="w-5 h-5" />
            Performance Boost
          </button>
          <button
            id="tab-security"
            role="tab"
            aria-selected={activeTab === 'security'}
            aria-controls="panel-security"
            onClick={() => setActiveTab('security')}
            className={`${tabButtonStyle} ${activeTab === 'security' ? activeTabStyle : inactiveTabStyle}`}
          >
             <ShieldCheckIcon className="w-5 h-5" />
            Security Check
          </button>
        </div>

        <div className={`bg-light-navy p-6 sm:p-8 rounded-b-xl ${activeTab === 'performance' ? 'rounded-tr-xl' : 'rounded-tl-xl'} shadow-2xl border border-lightest-navy/20`}>
          {activeTab === 'performance' && (
            <div id="panel-performance" role="tabpanel" tabIndex={0} aria-labelledby="tab-performance">
              <Booster />
            </div>
          )}
          {activeTab === 'security' && (
            <div id="panel-security" role="tabpanel" tabIndex={0} aria-labelledby="tab-security">
              <SafeBrowsingCheck />
            </div>
          )}
        </div>
      </main>
       <footer className="mt-12 text-center text-slate text-sm w-full max-w-2xl">
        <div className="mb-8 p-4 sm:p-6 border border-lightest-navy/20 rounded-lg animate-fade-in">
            <h4 className="font-bold text-light-slate flex items-center justify-center gap-2">
                <BitcoinIcon className="w-5 h-5 text-accent" />
                Enjoy the app?
            </h4>
            <p className="mt-2">Support its development with a Bitcoin donation.</p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${btcAddress}`} 
                    alt="Bitcoin Donation QR Code"
                    className="rounded-lg bg-white p-1"
                    width="128"
                    height="128"
                />
                <div className="flex flex-col items-center sm:items-start gap-2">
                     <p className="font-mono text-xs text-light-slate break-all p-2 bg-navy rounded-md border border-lightest-navy/20">{btcAddress}</p>
                     <button
                        onClick={handleCopyBtcAddress}
                        disabled={isBtcAddressCopied}
                        className="bg-lightest-navy text-accent border border-accent font-semibold text-sm px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors duration-300 flex items-center gap-2 w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isBtcAddressCopied ? (
                            <>
                                <CheckCircleIcon className="w-5 h-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <ClipboardIcon className="w-5 h-5" />
                                Copy Address
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Web Turbo Kit. All rights reserved.</p>
        <p className="mt-1">Powered by Gemini & React</p>
      </footer>
    </div>
  );
};

export default App;