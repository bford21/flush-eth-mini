'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { ToiletBowl } from '@/components/ToiletBowl';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { formatEther } from 'viem';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [toiletBalance, setToiletBalance] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [isFlushAnimating, setIsFlushAnimating] = useState(false);
  
  const { isConnected, address } = useAccount();
  const { data: walletBalance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    async function initializeApp() {
      try {
        // Wait a moment for the app to fully render
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Tell Farcaster the app is ready to display
        await sdk.actions.ready();
        
        setIsReady(true);
        
        console.log('Farcaster Mini App initialized successfully!');
      } catch (error) {
        console.error('Failed to initialize Mini App:', error);
      }
    }

    initializeApp();
  }, []);

  const handleAddETH = () => {
    if (!isConnected) {
      // Connect wallet if not connected
      connect({ connector: connectors[0] });
      return;
    }
    setShowAddModal(true);
  };

  const handleConfirmAdd = () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    const maxAmount = walletBalance ? parseFloat(formatEther(walletBalance.value)) : 0;
    const finalAmount = Math.min(amount, maxAmount);
    
    setToiletBalance(prev => prev + finalAmount);
    setAddAmount('');
    setShowAddModal(false);
  };

  const handleFlush = () => {
    if (toiletBalance <= 0 || isFlushAnimating) return;
    
    setIsFlushAnimating(true);
    
    // Play flushing sound
    const audio = new Audio('/toilet-flushing.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
    
    setTimeout(() => {
      setToiletBalance(0);
      setIsFlushAnimating(false);
    }, 4000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 p-2 sm:p-4 relative pb-20">
      <main className="flex flex-col items-center gap-4 sm:gap-8 text-center max-w-3xl w-full pt-16 sm:pt-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 sm:gap-6">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white drop-shadow-2xl font-[family-name:var(--font-bangers)] tracking-wider px-4">
            Flush ETH
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-xl px-4">
            The ultimate ETH burn mechanism
          </p>
          
          {/* Toilet Bowl - Top Down View with Button */}
          <div className="relative">
            <ToiletBowl toiletBalance={toiletBalance} isFlushAnimating={isFlushAnimating} />
            
            {/* Add ETH / Flush Button */}
            <button 
              onClick={toiletBalance > 0 ? handleFlush : handleAddETH}
              disabled={isFlushAnimating}
              className="absolute top-1 sm:top-2 md:top-4 left-1/2 -translate-x-1/2 z-20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg flex items-center gap-2 sm:gap-3 ${
                toiletBalance > 0 
                  ? 'bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600' 
                  : 'bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600'
              }`}>
                <span className="text-xl sm:text-2xl md:text-3xl">{toiletBalance > 0 ? '🚽' : !isConnected ? '🔗' : '💧'}</span>
                <span className="text-base sm:text-xl md:text-2xl font-bold text-white">
                  {isFlushAnimating ? 'FLUSHING...' : toiletBalance > 0 ? 'Flush' : !isConnected ? 'Connect Wallet' : 'Add ETH'}
                </span>
              </div>
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-2 mt-4">
            {isConnected && walletBalance && (
              <>
                <p className="text-xs sm:text-sm text-cyan-400 font-semibold">
                  Your Balance: {parseFloat(formatEther(walletBalance.value)).toFixed(4)} {walletBalance.symbol}
                </p>
                <button
                  onClick={() => disconnect()}
                  className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  Disconnect Wallet
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Add ETH Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-400/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Add ETH to Toilet</h2>
            <p className="text-gray-400 text-sm mb-6">
              Enter the amount of ETH you'd like to add (this is just visual, no transaction will occur)
            </p>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Amount (ETH)</label>
              <input
                type="number"
                step="0.000001"
                min="0"
                max={walletBalance ? formatEther(walletBalance.value) : '0'}
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="0.001"
                className="w-full bg-gray-800 border border-cyan-400/30 rounded-lg px-4 py-3 text-white text-lg font-mono focus:outline-none focus:border-cyan-400"
              />
              {walletBalance && (
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Max: {parseFloat(formatEther(walletBalance.value)).toFixed(6)} {walletBalance.symbol}</span>
                  <button
                    onClick={() => setAddAmount(formatEther(walletBalance.value))}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Use Max
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddAmount('');
                }}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                disabled={!addAmount || parseFloat(addAmount) <= 0}
                className="flex-1 bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Toilet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-gray-400 text-xs sm:text-sm">
        <a
          href="https://twitter.com/cryptodevbrian"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 hover:text-cyan-400 transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          @cryptodevbrian
        </a>
        <span className="text-gray-600 hidden sm:inline">•</span>
        <a
          href="https://github.com/bford21/flush-eth"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 hover:text-cyan-400 transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          View Source
        </a>
      </footer>
    </div>
  );
}

