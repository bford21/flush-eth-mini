'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { WalletConnect } from '@/components/WalletConnect';

export default function Home() {
  const [status, setStatus] = useState('Initializing...');
  const [statusClass, setStatusClass] = useState('');

  useEffect(() => {
    async function initializeApp() {
      try {
        setStatus('Loading SDK...');
        
        // Wait a moment for the app to fully render
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Tell Farcaster the app is ready to display
        await sdk.actions.ready();
        
        setStatus('✅ Mini App Ready!');
        setStatusClass('ready');
        
        console.log('Farcaster Mini App initialized successfully!');
      } catch (error) {
        console.error('Failed to initialize Mini App:', error);
        setStatus('⚠️ Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        setStatusClass('error');
      }
    }

    initializeApp();
  }, []);

  return (
    <div className="container">
      <h1>👋 Hello World!</h1>
      <p>Welcome to your first Farcaster Mini App</p>
      <div className={`status ${statusClass}`}>{status}</div>
      
      <div className="wallet-section">
        <WalletConnect />
      </div>
    </div>
  );
}

