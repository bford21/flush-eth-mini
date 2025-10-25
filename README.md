# Flush ETH Mini - Farcaster Mini App 🚽

A Farcaster Mini App built with **Next.js**, featuring an animated toilet bowl, wallet connection functionality, and the Farcaster Mini App SDK.

## 🚀 Quick Start

### Prerequisites

- Node.js 22.11.0 or higher (LTS recommended)
- npm, pnpm, or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

This creates an optimized production build with static export enabled.

### Start Production Server

```bash
npm start
```

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **@farcaster/miniapp-sdk** - Farcaster Mini App SDK
- **@farcaster/miniapp-wagmi-connector** - Wagmi connector for Farcaster
- **@tanstack/react-query** - Data fetching and caching
- **CSS3** - Advanced animations and styling

## ✨ Features

- 🚽 **Animated Toilet Bowl** - Beautiful CSS-based toilet with water effects
- 💧 **Flush Animation** - Swirling water and draining ETH logos
- 🌊 **Floating ETH Logos** - Dynamic ETH logos floating in the water
- ✅ **Farcaster SDK Integration** - Proper initialization with `sdk.actions.ready()`
- 🔗 **Wallet Connection** - Connect Ethereum wallets (Base & Mainnet)
- 📊 **Account Display** - Shows connected address, chain, and balance
- 📱 **Responsive Design** - Works beautifully on mobile and desktop
- 🎨 **Glassmorphic UI** - Modern gradient background with blur effects
- ⚡ **Error Handling** - Graceful error states and status display
- 🔒 **TypeScript** - Full type safety throughout

## 📚 What's Inside

This mini app demonstrates:

1. **Next.js App Router** - Modern React architecture
2. **Farcaster SDK** - Quick Auth and native features access
3. **Wallet Integration** - Using Wagmi with Farcaster connector
4. **CSS Animations** - Complex keyframe animations for toilet effects
5. **React Hooks** - `useEffect`, `useState`, `useAccount`, `useConnect`, etc.
6. **Client-side Rendering** - With `'use client'` directive
7. **Beautiful UI** - Custom toilet bowl built entirely with CSS

## 🗂️ Project Structure

```
flush-eth-mini/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page with SDK & wallet
│   └── globals.css      # Global styles & animations
├── components/
│   ├── Providers.tsx    # Wagmi & Query Client providers
│   ├── WalletConnect.tsx # Wallet connection component
│   └── ToiletBowl.tsx   # Animated toilet bowl component
├── lib/
│   └── wagmi-config.ts  # Wagmi configuration
├── public/
│   └── eth-logo.png     # ETH logo for floating animation
├── manifest.json        # App manifest for publishing
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md           # Documentation
```

## 🚽 The Toilet Bowl

The toilet bowl is a fully CSS-based animation system featuring:

### Visual Components
- **Outer Bowl** - Ceramic-style gradient with realistic shadows
- **Inner Bowl** - White porcelain with depth effects
- **Water** - Animated blue gradient with wobbling motion
- **Drain Hole** - Dark radial gradient at the bottom
- **Flush Button** - Gradient button with hover effects

### Animations
- **Water Wobble** - Gentle bobbing motion (idle state)
- **Flush Animation** - Water drains with rotating spiral effect
- **ETH Float** - Multiple floating animations for ETH logos
- **ETH Drain** - Logos spiral down into drain when flushing
- **Swirl Effect** - Visual swirl overlay during flush

### Features
- Dynamic ETH logo count based on wallet state
- Responsive sizing for mobile, tablet, and desktop
- Performance-optimized (capped at 20 logos)
- Smooth transitions and timing

## 🔌 Wallet Connection

The app uses Wagmi with the Farcaster Mini App connector to enable seamless wallet connections:

### How It Works

1. **Farcaster Connector** - Uses `@farcaster/miniapp-wagmi-connector` for native integration
2. **Supported Chains** - Base and Ethereum Mainnet (easily extendable)
3. **Account Information** - Displays address, chain name, and token balance
4. **One-Click Connect** - Simple button interface for wallet connection

### Configuration

The Wagmi configuration is in `lib/wagmi-config.ts`:

```typescript
import { http, createConfig } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: [base, mainnet],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
  connectors: [farcasterMiniApp()],
});
```

### Adding More Chains

To add support for more chains, simply import them from `wagmi/chains` and add them to the config:

```typescript
import { base, mainnet, optimism, arbitrum } from 'wagmi/chains';

export const config = createConfig({
  chains: [base, mainnet, optimism, arbitrum],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [farcasterMiniApp()],
});
```

## 🎨 Customization

### Modifying the Toilet

The toilet component is in `components/ToiletBowl.tsx`. You can customize:

- **Colors** - Change gradient colors in the className props
- **Size** - Adjust the width/height classes
- **Animation Speed** - Modify timing in `globals.css` animations
- **Logo Count** - Change the calculation in `getLogoCount()`
- **Button Style** - Customize the flush button appearance

### Adding Features

The toilet component accepts these props:

```typescript
interface ToiletBowlProps {
  flushableAmount?: bigint;  // Amount to display
  onFlush?: () => void;      // Callback when flushed
  isPending?: boolean;       // Loading state
}
```

## 🔑 Important Notes

1. **Always call `sdk.actions.ready()`** - This is critical! Without it, users will see an infinite loading screen.
2. **Client Components** - The main page and components use `'use client'` directive because they require browser APIs.
3. **Static Export** - Configured for static export (`output: 'export'`) to make deployment easier.
4. **Enable Developer Mode** - Visit https://farcaster.xyz/~/settings/developer-tools to enable developer mode in Farcaster.
5. **Test in Farcaster** - While the app works in a regular browser, the full SDK features are available when running in a Farcaster client.
6. **ETH Logo** - Make sure `eth-logo.png` is in the `public` folder.

## 📦 Deployment

This app is configured for static export, making it easy to deploy to:

- **Vercel** (Recommended) - `vercel deploy`
- **Netlify** - Drag & drop the `out` folder after `npm run build`
- **GitHub Pages** - Deploy the `out` folder
- **Cloudflare Pages** - Connect your repo
- **Any static hosting** - Upload the `out` folder

After deploying, update `manifest.json` with your deployment URL.

## 📝 Next Steps

### To publish and share your mini app:

1. **Deploy your app** to a hosting service (Vercel, Netlify, etc.)
2. **Update `manifest.json`** with your deployment URL
3. **Enable Developer Mode** in Farcaster
4. **Create a manifest** using Farcaster's developer tools
5. **Test your mini app** in Farcaster clients
6. **Make it shareable** in Farcaster feeds

### To extend functionality:

- Add transaction capabilities using `useSendTransaction`
- Integrate with smart contracts using `useContractWrite`
- Add contract interactions (like the original BETH flush function)
- Implement token swaps or NFT interactions
- Add Quick Auth for authenticated backend requests
- Add sound effects (toilet flush sound)
- Implement score tracking or gamification

## 🎮 Inspired By

This project was inspired by [Flush ETH](https://flush.eth.limo/) by [@cryptodevbrian](https://twitter.com/cryptodevbrian) - a fun way to burn force-sent ETH from the BETH contract.

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/docs/getting-started)
- [Farcaster Wallet Integration](https://miniapps.farcaster.xyz/docs/guides/wallets)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [Original Flush ETH](https://github.com/bford21/flush-eth)

## 🐛 Troubleshooting

### Toilet Not Displaying

- Check that `eth-logo.png` exists in the `public` folder
- Verify all CSS animations are loaded
- Check browser console for errors

### Wallet Not Connecting

- Make sure you're using the app within a Farcaster client for full functionality
- Check that the connector is properly configured in `lib/wagmi-config.ts`
- Ensure your user has a wallet connected to their Farcaster account

### Build Errors

- Verify Node.js version: `node --version` (must be 22.11.0+)
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Animations Not Working

- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check that CSS animations are enabled in your browser
- Verify the CSS file was properly updated

## 📄 License

ISC
