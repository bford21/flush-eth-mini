'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletConnect() {
  const { isConnected, address, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-cyan-400/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-gray-400 font-semibold">Connected</span>
              <span className="text-sm text-white font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
            {chain && (
              <div className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                {chain.name}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => disconnect()}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 active:scale-95"
    >
      Connect Wallet
    </button>
  );
}

