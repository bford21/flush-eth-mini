'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';

export function WalletConnect() {
  const { isConnected, address, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  if (isConnected && address) {
    return (
      <div className="wallet-info">
        <div className="wallet-details">
          <div className="detail-item">
            <span className="label">Address:</span>
            <span className="value">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          {chain && (
            <div className="detail-item">
              <span className="label">Chain:</span>
              <span className="value">{chain.name}</span>
            </div>
          )}
          {balance && (
            <div className="detail-item">
              <span className="label">Balance:</span>
              <span className="value">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            </div>
          )}
        </div>
        <button className="wallet-button disconnect" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <button
        className="wallet-button connect"
        onClick={() => connect({ connector: connectors[0] })}
      >
        🔗 Connect Wallet
      </button>
    </div>
  );
}

