# Flush ETH Mini - Farcaster Mini App

A Farcaster Mini App built with **Next.js**, featuring wallet connection functionality using the Farcaster Mini App SDK and Wagmi.

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
- **CSS3** - Styling with modern features

## ✨ Features

- ✅ **Hello World Display** - Beautiful gradient UI with animations
- ✅ **Farcaster SDK Integration** - Proper initialization with `sdk.actions.ready()`
- ✅ **Wallet Connection** - Connect Ethereum wallets (Base & Mainnet)
- ✅ **Account Display** - Shows connected address, chain, and balance
- ✅ **Responsive Design** - Works beautifully on mobile and desktop
- ✅ **Error Handling** - Graceful error states and status display
- ✅ **TypeScript** - Full type safety throughout

## 📚 What's Inside

This mini app demonstrates:

1. **Next.js App Router** - Modern React architecture
2. **Farcaster SDK** - Quick Auth and native features access
3. **Wallet Integration** - Using Wagmi with Farcaster connector
4. **React Hooks** - `useEffect`, `useState`, `useAccount`, `useConnect`, etc.
5. **Client-side Rendering** - With `'use client'` directive
6. **Beautiful UI** - Glassmorphic design with gradient background

## 🗂️ Project Structure

```
flush-eth-mini/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page with SDK & wallet
│   └── globals.css      # Global styles
├── components/
│   ├── Providers.tsx    # Wagmi & Query Client providers
│   └── WalletConnect.tsx # Wallet connection component
├── lib/
│   └── wagmi-config.ts  # Wagmi configuration
├── manifest.json        # App manifest for publishing
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md           # Documentation
```

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

## 🔑 Important Notes

1. **Always call `sdk.actions.ready()`** - This is critical! Without it, users will see an infinite loading screen.
2. **Client Components** - The main page and wallet component use `'use client'` directive because they require browser APIs.
3. **Static Export** - Configured for static export (`output: 'export'`) to make deployment easier.
4. **Enable Developer Mode** - Visit https://farcaster.xyz/~/settings/developer-tools to enable developer mode in Farcaster.
5. **Test in Farcaster** - While the app works in a regular browser, the full SDK features are available when running in a Farcaster client.

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
- Add ENS name resolution
- Implement token swaps or NFT interactions
- Add Quick Auth for authenticated backend requests

## 🎨 Customization

### Adding More Pages

Create new files in the `app` directory:

```tsx
// app/about/page.tsx
export default function About() {
  return <div>About Page</div>;
}
```

### Adding API Routes

Create API routes in `app/api`:

```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello from API' });
}
```

### Styling

Modify `app/globals.css` or add component-specific CSS modules.

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/docs/getting-started)
- [Farcaster Wallet Integration](https://miniapps.farcaster.xyz/docs/guides/wallets)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)

## 🐛 Troubleshooting

### Wallet Not Connecting

- Make sure you're using the app within a Farcaster client for full functionality
- Check that the connector is properly configured in `lib/wagmi-config.ts`
- Ensure your user has a wallet connected to their Farcaster account

### Build Errors

- Verify Node.js version: `node --version` (must be 22.11.0+)
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📄 License

ISC
