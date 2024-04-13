import Footer from "./components/Footer";
import './globals.css';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-gradient-to-tr from-purple-500 to-purple-900 text-white p-10">
      {/* Title */}
      <div className="flex flex-1 items-start justify-center">
        <h1 className="text-[8vw] font-semibold leading-none text-center text-shadow-lg">
          Flippando
        </h1>
      </div>

      {/* Cards container */}
      <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 justify-items-stretch content-start">
        {/* Card Links */}
        {createLinkCard("https://gno.flippando.xyz", "Gno", "GNOVM", "✅ deployed", "🧪 testnet", "✅ gno.flippando.xyz", "✅ public beta")}
        {createLinkCard("https://saga.flippando.xyz", "Saga", "EVM", "✅ deployed", "✅ mainnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("https://evmos.flippando.xyz", "Evmos", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("https://polygon.flippando.xyz", "Polygon", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("https://near.flippando.xyz", "NEAR / Aurora", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("https://arbitrum.flippando.xyz", "Arbitrum", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("https://optimism.flippando.xyz", "Optimism", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("https://ethereum.flippando.xyz", "Ethereum", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
      </div>

      <Footer />
    </main>
  );
}

// Helper function to create link card
function createLinkCard(url, title, engine, status, network, frontendStatus, access) {
  const determineClass = (url) => {
    
    if (url.includes('gno')) {
        return 'bg-green-900 hover:bg-green-600';
    } else {
        return 'bg-purple-800 hover:bg-purple-400';
    }
};

const dynamicClasses = determineClass(url);

  return (
    <a href={url} className={`group rounded-lg border ${dynamicClasses} border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
      <h2 className="mb-4 text-4xl font-bold">
        {title}
      </h2>
      <p className="m-0 mb-1 max-w-[30ch] text-sm">
        <b className="text-gray-300">Engine:</b> {engine}
      </p>
      <p className="m-0 mb-1 max-w-[30ch] text-sm">
        <b className="text-gray-300">Backend:</b> {status}
      </p>
      <p className="m-0 mb-1 max-w-[30ch] text-sm">
        <b className="text-gray-300">Network:</b> {network}
      </p>
      <p className="m-0 mb-1 max-w-[30ch] text-sm">
        <b className="text-gray-300">Frontend:</b> {frontendStatus}
      </p>
      <p className="m-0 mb-1 max-w-[30ch] text-sm">
        <b className="text-gray-300">Access:</b> <span role="img" aria-label="checkmark">{access}</span>
      </p>
    </a>
  );
}
