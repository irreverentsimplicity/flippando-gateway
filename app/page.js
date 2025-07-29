import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { VStack, HStack } from "@chakra-ui/react";
import './globals.css';

export default function Home() {
  const maintenanceMode = 0;

  return (
    
    <main className="flex flex-1 flex-col bg-gradient-to-tr from-purple-500 to-purple-900 text-white p-5">
    <Header />  
      {/* Title */}
      <div className="flex flex-1 items-start justify-center">
        {maintenanceMode == 0 &&
          createPlayCard("https://evm.flippando.xyz/flip", "Play Flippando", "On Base, Polygon, Sonic, Flipchain and Berachain.",  "Just choose your Flipping Territory.")
        }
        {maintenanceMode == 1 &&
          createMaintenanceCard("#", "Flippando is in maintenance", "We're tidying up some stuff.",  "It shouldn't take long, flip back soon.")
        }
      </div>
      {/* Dashboard */}
      {maintenanceMode == 0 &&
      <Dashboard />
      }
      {/* Cards container */}
      <div className="text-[4vw] text-center mt-10 pt-10">
          Flipping Territories
      </div>
      <div className="text-lg font-italic text-center text-shadow-sm mt-10 mb-10 mr-40 ml-40">
           We are constantly expanding. As we deploy on new chains, this area will be updated.             
        </div>
      <div className="w-full flex-1 items-start grid grid-cols-1 sm:grid-cols-2 gap-3  pt-4 p-10">
        {/* Left Column with 2-column grid inside */}
        <div className="grid grid-cols-2 gap-3 mr-10">
        <div className="text-4xl text-center col-span-2 text-shadow-sm pb-0">
           Mainnets
        </div>
        <hr className="col-span-2 pt-5"/>
          {createLinkCard("https://evm.flippando.xyz/flip", "Base", "base-logo.png", "EVM", "✅ deployed", "✅ mainnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Flipchain Main", "saga-logo.png", "EVM", "✅ deployed", "✅ mainnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Polygon", "polygon-logo.png", "EVM", "✅ deployed", "✅ mainnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Sonic", "sonic-logo.png", "EVM", "✅ deployed", "✅ mainnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Berachain", "berachain-logo.png", "EVM", "✅ deployed", "✅ mainnet", "✅ evm.flippando.xyz", "✅ public beta")}
        </div>
        
        {/* Right Column with 2-column grid inside */}
        
        <div className="grid grid-cols-2 gap-3 mr-10">
        <div className="text-4xl text-center col-span-2 text-shadow-sm pb-0">
           Testnets
        </div>
        <hr className="col-span-2 pt-5"/>
          {createLinkCard("https://evm.flippando.xyz/flip", "Base Sepolia", "base-logo.png", "EVM", "✅ deployed", "🧪 testnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Flipchain Dev", "saga-logo.png", "EVM", "✅ deployed", "🧪 testnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Polygon Amoy", "polygon-logo.png", "EVM", "✅ deployed", "🧪 testnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Sonic Blaze", "sonic-logo.png", "EVM", "✅ deployed", "🧪 testnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("https://evm.flippando.xyz/flip", "Berachain Bepolia", "berachain-logo.png", "EVM", "✅ deployed", "🧪 testnet", "✅ evm.flippando.xyz", "✅ public beta")}
          {createLinkCard("#", "Gno", "", "GNOVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}  
          {createLinkCard("#", "Arbitrum", "", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
          {createLinkCard("#", "Optimism", "", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
          {createLinkCard("#", "Ethereum", "", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
          {createLinkCard("#", "Evmos", "", "EVM", "✅ deployed", "🧪 testnet", "🔒 not deployed", "🧪 internal testing")}
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Helper function to create link card
function createLinkCard(url, title, logo, engine, status, network, frontendStatus, access) {
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
      <HStack className="items-end mb-4">
      {logo !== "" &&
        <img src={`/assets/${logo}`} alt={title} className="w-8 h-8 rounded-full" />
      }
      <h2 className="text-2xl ">
        {title}
      </h2>
      </HStack>
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
function createPlayCard(url, title, copy1, copy2) {
  const chains = [
    { name: "Base", logo: "/assets/base-logo.png" },
    { name: "Polygon", logo: "/assets/polygon-logo.png" },
    { name: "Sonic", logo: "/assets/sonic-logo.png" },
    { name: "Flipchain", logo: "/assets/saga-logo.png" },
    { name: "Berachain", logo: "/assets/berachain-logo.png" },
  ];

  return (
    <a href={url} className="group rounded-lg border bg-purple-500 hover:bg-purple-800 border-transparent px-5 py-4 mt-6 mb-7 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className="text-center mb-4 p-5 text-5xl">
        {title}
      </h2>
      <p className="text-center mb-2 text-md">
        {copy1}
      </p>
      <p className="text-center mb-6 text-sm">
        {copy2}
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

// Helper function to create a maintenance card
function createMaintenanceCard(url, title, copy1, copy2) {
  const chains = [
    { name: "Base", logo: "/assets/base-logo.png" },
    { name: "Polygon", logo: "/assets/polygon-logo.png" },
    { name: "Sonic", logo: "/assets/sonic-logo.png" },
    { name: "Flipchain", logo: "/assets/saga-logo.png" },
    { name: "Berachain", logo: "/assets/berachain-logo.png" },
  ];

  return (
    <a href={url} className="group rounded-lg border bg-purple-500 hover:bg-purple-800 border-transparent px-5 py-4 mt-6 mb-7 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className="text-center mb-4 p-5 text-5xl">
        {title}
      </h2>
      <p className="text-center mb-2 text-md">
        {copy1}
      </p>
      <p className="text-center mb-6 text-sm">
        {copy2}
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
