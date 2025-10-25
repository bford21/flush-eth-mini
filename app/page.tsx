'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { ToiletBowl } from '@/components/ToiletBowl';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { formatEther } from 'viem';

export default function Home() {
  const [status, setStatus] = useState('Initializing...');
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
        
        setStatus('✅ SDK Ready');
        setIsReady(true);
        
        console.log('Farcaster Mini App initialized successfully!');
      } catch (error) {
        console.error('Failed to initialize Mini App:', error);
        setStatus('⚠️ Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
      {/* SDK Status - Top Left */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-400/30 text-xs text-gray-300">
          {status}
        </div>
      </div>

      <main className="flex flex-col items-center gap-4 sm:gap-8 text-center max-w-3xl w-full pt-16 sm:pt-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 sm:gap-6">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white drop-shadow-2xl tracking-wider px-4">
            Flush ETH Mini
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-xl px-4">
            Digital money meets a digital drain
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
            {!isConnected && (
              <p className="text-xs sm:text-sm text-gray-400 max-w-md px-4">
                A Farcaster Mini App powered by{' '}
                <a href="https://miniapps.farcaster.xyz" className="text-cyan-400 hover:underline">
                  @farcaster/miniapp-sdk
                </a>
              </p>
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
        <span className="text-gray-600">Inspired by Flush ETH</span>
      </footer>
    </div>
  );
}

