'use client'
import { Link } from '@chakra-ui/next-js'

export default function Achievements() {

    return (        
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center content-center text-xs ml-40 mr-40">
            <div className={`group bg-purple-900 rounded-lg border border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
                <span className="text-2xl inline-flex align-middle mr-2">🏆</span> Winner of the Polygon track - Glitch Seoul hackathon, May 2023
            </div>
            <div className={`group bg-purple-900 rounded-lg border border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
                <span className="text-2xl inline-flex align-middle mr-2">🏆</span> Winner of the runner up prize - Saga Hackathon, September 2023
            </div>    
            <div className={`group bg-purple-900 rounded-lg border border-transparent px-5 py-4 mx-2 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}>
                <span className="text-2xl inline-flex align-middle mr-2">📜</span> Recipient of the first Gno.land grant program, November 2023
            </div>
        </div>
    );
}