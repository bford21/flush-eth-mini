'use client';

import { useAccount } from 'wagmi';

interface ToiletBowlProps {
  toiletBalance: number;
  isFlushAnimating?: boolean;
}

export function ToiletBowl({ toiletBalance = 0, isFlushAnimating = false }: ToiletBowlProps) {
  const { address } = useAccount();
  
  // Calculate number of ETH logos based on toilet balance
  const getLogoCount = () => {
    if (toiletBalance === 0) return 3; // Default for demo
    return Math.max(1, Math.min(Math.floor(toiletBalance / 0.001), 20)); // Cap at 20
  };

  const logoCount = getLogoCount();

  // Generate logo positions dynamically
  const generateLogoPositions = () => {
    const positions = [];
    const count = Math.min(logoCount, 20);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 15 + (i % 3) * 10;
      const bottomPos = 20 + ((i % 4) * 5);
      const leftPos = 50 + Math.cos(angle) * radius;
      
      positions.push({
        id: i,
        bottom: `${bottomPos}%`,
        left: `${leftPos}%`,
        size: i === 0 ? 'w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24' : i % 2 === 0 ? 'w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20' : 'w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16',
        floatAnimation: `animate-eth-float-${(i % 3) + 1}`,
        delay: (i * 0.1).toFixed(2) + 's'
      });
    }
    
    return positions;
  };

  const logoPositions = generateLogoPositions();

  return (
    <div className="relative w-[280px] h-[340px] sm:w-[400px] sm:h-[480px] md:w-[600px] md:h-[700px] my-4 sm:my-8" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}>
      {/* Toilet Bowl */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[280px] sm:w-[340px] sm:h-[400px] md:w-[520px] md:h-[600px] bg-gradient-to-b from-gray-200 to-gray-300 border-4 sm:border-6 md:border-8 border-gray-400 overflow-hidden"
        style={{ 
          borderRadius: '50% / 60%',
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.1), inset 0 -10px 30px rgba(0,0,0,0.05)'
        }}
      >
        {/* Inner Bowl */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-56 sm:w-64 sm:h-80 md:w-96 md:h-[450px] bg-gradient-to-b from-white to-gray-100 overflow-hidden"
          style={{ 
            borderRadius: '50% / 60%',
            boxShadow: 'inset 0 15px 40px rgba(0,0,0,0.15), inset 0 -10px 20px rgba(0,0,0,0.05)'
          }}
        >
          {/* Water */}
          <div 
            className={`absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-blue-300/30 via-blue-400/50 to-blue-500/60 transition-all ${isFlushAnimating ? 'animate-drain-water' : 'animate-water-wobble'}`}
            style={{ borderRadius: '50% / 30%' }}
          />
          
          {/* Toilet Balance Display */}
          {toiletBalance > 0 && !isFlushAnimating && (
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
              <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-xl sm:rounded-2xl border border-cyan-400/50 sm:border-2 shadow-xl">
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold mb-0.5 sm:mb-1">In Toilet</p>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold text-cyan-400 font-mono">
                  {toiletBalance.toFixed(6)} ETH
                </p>
              </div>
            </div>
          )}
          
          {/* Drain Hole */}
          <div 
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-10 h-12 sm:w-16 sm:h-20 md:w-20 md:h-24 bg-gradient-radial from-gray-900 via-gray-700 to-gray-500"
            style={{ 
              borderRadius: '50% / 60%',
              boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.8), inset 0 -2px 5px rgba(0,0,0,0.3)',
              background: 'radial-gradient(ellipse, #1a1a1a 30%, #333 60%, #666 100%)'
            }}
          />
          
          {/* Swirl Effect */}
          {isFlushAnimating && (
            <div className="absolute inset-0 animate-swirl-effect pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-52 sm:h-52 md:w-72 md:h-72 border-2 sm:border-3 md:border-4 border-transparent border-t-blue-400/60 border-r-blue-400/40 rounded-full animate-spin-fast" />
            </div>
          )}
          
          {/* Dynamic ETH Logos - floating in water */}
          {logoPositions.map((logo) => (
            <div
              key={logo.id}
              className={`absolute z-10 ${isFlushAnimating ? 'animate-eth-drain' : logo.floatAnimation}`}
              style={{
                bottom: logo.bottom,
                left: logo.left,
                transform: 'translateX(-50%)',
                animationDelay: isFlushAnimating ? logo.delay : undefined
              }}
            >
              <img src="/eth-logo.png" alt="ETH" className={`${logo.size} object-contain opacity-80`} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Flush Handle/Button - Hidden, controlled by parent */}
    </div>
  );
}

