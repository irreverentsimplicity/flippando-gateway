'use-client'

export default function GameMechanics() {

    return (        
            <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-stretch content-start pt-8">
            
            
            <a href="#" className={`group rounded-lg border bg-purple-900 hover:bg-purple-900 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
            <h2 className="mb-4 text-[3vw]">
            Flip
            </h2>
            <hr />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
            }}>
                <img src="/assets/flip.png" alt="airdrop" style={{
                width: '280px',
                height: '270px'
                }}/>
            </div>
            <p className="mt-8">
            Use your attention to solve visual puzzles, and improve your memory. 
            Choose from different colors, gradients or shapes. 
            Mint the solved board as an on-chain NFT.
            </p>
            </a>
            

            <a href="#" className={`group rounded-lg border bg-purple-900 hover:bg-purple-900 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
            <h2 className="mb-4 text-[3vw]">
            Create
            </h2>
            <hr />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
            }}>
                <img src="/assets/create.jpg" alt="airdrop" style={{
                width: '370px',
                height: '260px'
                }}/>
            </div>
            <p className="mt-8">
            Drag and drop other boards and create stunning pixel-based art. 
            When one of your boards is used by someone else, the fungible $FLIPND token locked 
            inside the board  is unlocked and sent to your wallet.
            </p>
            </a>
            <a href="#" className={`group rounded-lg border bg-purple-900 hover:bg-purple-900 border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
            <h2 className="mb-4 text-[3vw]">
            Trade
            </h2>
            <hr />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
            }}>
                <img src="/assets/trade.jpg" alt="airdrop" style={{
                width: '370px',
                height: '260px'
                }}/>
            </div>
            <p className="mt-8">
            Find gems in the marketplace and collect them all. 
            Put your own art on sale or stack up on those fungible $FLIPND tokens!
            </p>
            </a>
            </div>
    );
}