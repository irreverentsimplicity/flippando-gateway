import {Text} from "@chakra-ui/react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gradient-to-tr from-chakra-ui-purple-500 to-chakra-ui-purple-900 text-white">
      <div className="relative flex flex-col items-start">
        <Text
          fontSize="16.67vh" 
          fontWeight="semibold"
          lineHeight="shorter"
          color="white"
          textShadow="2px 2px 4px black">
          Flippando
        </Text>
      </div>

      <div className="relative flex flex-col items-center">
        <Text
          fontSize="4vh" 
          fontWeight="semibold"
          lineHeight="shorter"
          color="white">
          A deceptively simple memory game, enabling a virtual economy of goods.
        </Text>
        
      </div>

      <div className="lg:max-w-5xl lg:w-full lg:mb-0">
        <div className="mb-32 p-2 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://gno.flippando.xyz"
            className="group rounded-lg border bg-purple-800 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-bold`}>
              Gno{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> GNOVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> live on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="checkmark">✅</span> public beta
            </p>

          </a>

          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Saga{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>

          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Evmos{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>

          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Polygon{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>
        </div>

        <div className="mb-32 p-2 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-bold`}>
              NEAR / Aurora{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>

          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Arbitrum{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>

          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Optimism{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>

          <a
            href="#"
            className="group rounded-lg border bg-purple-500 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Ethereum{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Engine:</b> EVM
            </p>
            <p className={`m-0 max-w-[30ch] text-sm `}>
              <b>Status:</b> deployed on <u>testnet</u>
            </p>
            <p className={`m-0 max-w-[30ch] text-sm`}>
              <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
            </p>

          </a>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
