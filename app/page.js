import Footer from "./components/Footer";
import GameMechanics from "./components/GameMechanics";
import './globals.css';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between bg-gradient-to-tr from-purple-500 to-purple-900 text-white p-5">
      {/* Title */}
      <div className="flex flex-1 items-start justify-center">
        <h1 className="text-[8vw] font-semibold leading-none text-center text-shadow-lg pb-8 pt-4">
          Flippando
        </h1>
      </div>
      <div className="flex flex-1 items-start justify-center">
        <h3 className="text-[1.5vw] font-italic leading-none text-center text-shadow-md pb-10 mb-10">
          Estoy flippando en colores
        </h3>
      </div>
      
      {/* Game mechanics */}
      <GameMechanics/>
      <div className="text-[3vw] font-semibold leading-none text-center text-shadow-lg mt-10 mb-10 pt-10">
            Play Flippando
      </div>
      {createPlayCard("https://evm.flippando.xyz/flip", "On EVM", "Flippando is now live on a variety of chains. Click to play and select your Flipping Territory.")}

      <div className="text-[3vw] font-semibold leading-none text-center text-shadow-lg mt-10 pt-10">
                Live Dashboard
      </div>
      <div className="text-lg font-italic text-center text-shadow-sm mt-10 mb-10 mr-40 ml-40">
            Flippando is a "user first, chain later" project. We built the same game, with the same features, on top of different VMs. And then deployed on a variety of blockchains.
            It's up to the user to decide which chain they want to play their favorite game on.
      </div>
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

  const dynamicClasses = 'bg-purple-900 hover:bg-purple-500';

  return (
    <a href={url} className={`group rounded-lg border ${dynamicClasses} border-transparent px-5 py-4 mt-6 mb-1 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
      <h2 className="mb-4 text-4xl font-bold">
        {title}
      </h2>
      <p className="m-0 mb-1 max-w-[30ch] text-2xl">
        {copy}
      </p>
    </a>
  );
}
