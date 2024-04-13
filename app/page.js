import Footer from "./components/Footer";
import './globals.css';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-gradient-to-tr from-purple-500 to-purple-900 text-white p-10">
      {/* Title */}
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-[8vw] font-semibold leading-none text-center text-shadow-lg">
          Flippando
        </h1>
      </div>

      {/* Cards container */}
      <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 justify-items-center content-start">
        {/* Card Links */}
        {createLinkCard("https://gno.flippando.xyz", "Gno", "GNOVM", "live on testnet", "✅ public beta")}
        {createLinkCard("https://saga.flippando.xyz", "Saga", "EVM", "deployed on testnet", "🔒 closed beta")}
        {createLinkCard("https://evmos.flippando.xyz", "Evmos", "EVM", "deployed on testnet", "🔒 closed beta")}
        {createLinkCard("https://polygon.flippando.xyz", "Polygon", "EVM", "deployed on testnet", "🔒 closed beta")}
        {createLinkCard("https://near.flippando.xyz", "NEAR / Aurora", "EVM", "deployed on testnet", "🔒 closed beta")}
        {createLinkCard("https://arbitrum.flippando.xyz", "Arbitrum", "EVM", "deployed on testnet", "🔒 closed beta")}
        {createLinkCard("https://optimism.flippando.xyz", "Optimism", "EVM", "deployed on testnet", "🔒 closed beta")}
        {createLinkCard("https://ethereum.flippando.xyz", "Ethereum", "EVM", "deployed on testnet", "🔒 closed beta")}
      </div>

      <Footer />
    </main>
  );
}

// Helper function to create link card
function createLinkCard(url, title, engine, status, access) {
  return (
    <a href={url} className="group rounded-lg border bg-purple-800 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className="mb-3 text-2xl font-bold">
        {title}
      </h2>
      <p className="m-0 max-w-[30ch] text-sm">
        <b>Engine:</b> {engine}
      </p>
      <p className="m-0 max-w-[30ch] text-sm">
        <b>Status:</b> {status}
      </p>
      <p className="m-0 max-w-[30ch] text-sm">
        <b>Access:</b> <span role="img" aria-label="checkmark">{access}</span>
      </p>
    </a>
  );
}
