import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import './globals.css';

export default function Home() {
  return (
    
    <main className="flex flex-1 flex-col bg-gradient-to-tr from-purple-500 to-purple-900 text-white p-5">
    <Header />  
      {/* Title */}
      <div className="flex flex-1 items-start justify-center">
        {createPlayCard("https://evm.flippando.xyz/flip", "Play Flippando", "On Base, Polygon, Sonic and Saga. Just choose your Flipping Territory.")}
      </div>
      {/* Dashboard */}
      <Dashboard />
      
      {/* Cards container */}
      <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3 justify-items-stretch content-start pt-4">
        {/* Card Links */}
        {createLinkCard("#", "Gno", "GNOVM", "✅ deployed", "🧪 testnet", "✅ gno.flippando.xyz", "🧪 internal testing")}
        {createLinkCard("https://evm.flippando.xyz/flip", "Saga Main", "EVM", "✅ deployed", "✅ mainnet", "✅ evm.flippando.xyz", "✅ public beta")}
        {createLinkCard("https://evm.flippando.xyz/flip", "Saga Dev", "EVM", "✅ deployed", "✅ devnet", "✅ evm.flippando.xyz", "✅ public beta")}
        {createLinkCard("https://evm.flippando.xyz/flip", "Base Sepolia", "EVM", "✅ deployed", "✅ testnet", "✅ evm.flippando.xyz", "✅ public beta")}
        {createLinkCard("#", "Evmos", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("#", "Polygon", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("#", "NEAR / Aurora", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("#", "Arbitrum", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("#", "Optimism", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        {createLinkCard("#", "Ethereum", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
      </div>

      <Footer />
    </main>
  );
}

// Helper function to create link card
function createLinkCard(url, title, engine, status, network, frontendStatus, access) {
  const determineClass = (url) => {
    
    if (access.includes('public beta')) {
        return 'bg-purple-500 hover:bg-purple-500';
    } else {
        return 'bg-purple-900 hover:bg-purple-500';
    }
  };

  const dynamicClasses = determineClass(url);

  return (
    <a href={url} className={`group rounded-lg border ${dynamicClasses} border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
      <h2 className="mb-4 text-4xl font-bold">
        {title}
      </h2>
      <p className="m-0 mb-1 max-w-[30ch] text-sm">
        <b className="text-gray-300">Virtual Machine:</b> {engine}
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

// Helper function to create link card
function createPlayCard(url, title, copy) {
  const chains = [
    { name: "Base", logo: "/assets/base-logo.png" },
    { name: "Polygon", logo: "/assets/polygon-logo.png" },
    { name: "Sonic", logo: "/assets/sonic-logo.png" },
    { name: "Saga", logo: "/assets/saga-logo.png" }
  ];

  return (
    <a href={url} className="group rounded-lg border bg-purple-900 hover:bg-purple-500 border-transparent px-5 py-4 mt-6 mb-7 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className="text-center mb-4 p-5 text-5xl">
        {title}
      </h2>
      <p className="text-center mb-4 text-sm">
        {copy}
      </p>
      <div className="flex justify-center gap-6 mt-4">
        {chains.map((chain) => (
          <div key={chain.name} className="flex flex-col items-center">
            <img src={chain.logo} alt={chain.name} className="w-10 h-10 rounded-full" />
            <span className="text-xs mt-2">{chain.name}</span>
          </div>
        ))}
      </div>
    </a>
  );
}
