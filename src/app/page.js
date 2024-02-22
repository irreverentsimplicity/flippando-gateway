import {Text} from "@chakra-ui/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-tr from-purple-400 to-purple-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        
      </div>

      <div className="relative flex place-items-center">
      <Text
        fontSize="16.67vh" 
        fontWeight="semibold"
        lineHeight="shorter"
        color="white"
        textShadow="2px 2px 4px black">
        Flippando
      </Text>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://gno.flippando.xyz"
          className="group rounded-lg border bg-purple-700 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-bold`}>
            Gno{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm `}>
            <b>Status:</b> live on <u>testnet</u>
          </p>
          <p className={`m-0 max-w-[30ch] text-sm`}>
            <b>Access:</b> <span role="img" aria-label="checkmark">✅</span> public beta
          </p>

        </a>

        <a
          href="#"
          className="group rounded-lg border bg-purple-400 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Saga{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm `}>
            <b>Status:</b> deployed on <u>testnet</u>
          </p>
          <p className={`m-0 max-w-[30ch] text-sm`}>
            <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
          </p>

        </a>

        <a
          href="#"
          className="group rounded-lg border bg-purple-400 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Evmos{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm `}>
            <b>Status:</b> deployed on <u>testnet</u>
          </p>
          <p className={`m-0 max-w-[30ch] text-sm`}>
            <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
          </p>

        </a>

        <a
          href="#"
          className="group rounded-lg border bg-purple-400 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:bg-purple-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Polygon{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm `}>
            <b>Status:</b> deployed on <u>testnet</u>
          </p>
          <p className={`m-0 max-w-[30ch] text-sm`}>
            <b>Access:</b> <span role="img" aria-label="locked">🔒</span> closed beta
          </p>

        </a>
      </div>
    </main>
  );
}
