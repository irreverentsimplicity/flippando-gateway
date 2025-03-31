import { ethers } from "ethers";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Import ABIs
import FLIPPANDO_CONTRACT_ABI from "../../components/abis/Flippando.json";
import FLIPPANDO_BUNDLER_CONTRACT_ABI from "../../components/abis/FlippandoBundler.json";
import FLIP_CONTRACT_ABI from "../../components/abis/FLIPND.json";

const BASE_RPC_URL="https://mainnet.base.org"
const POLYGON_RPC_URL="https://1rpc.io/matic"
const SONIC_RPC_URL="https://rpc.soniclabs.com"
const SAGA_RPC_URL="https://flippandomainnet-2737273595554000-1.jsonrpc.sagarpc.io"
const BERACHAIN_RPC_URL ="https://rpc.berachain.com"

const FLIPND_BASE="0x2198459D9924b816376EeAd7EE083B6DFF3Bb6FA"
const FLIPND_POLYGON="0x56Fc906D33F49f3BAd0aac73534e85F9059e55AC"
const FLIPND_SONIC="0x2A470e3586e2C6940919CBE567d6866913bC3251"
const FLIPND_SAGA="0x122d730a9b3390565b9e09D213637a1C51B87Fc1"
const FLIPND_BERACHAIN="0x56Fc906D33F49f3BAd0aac73534e85F9059e55AC"

const FLIPBB_BASE="0x8dD88F0f057D4Af175B04867Fe59658c7faa6f95"
const FLIPBB_POLYGON="0x479e6c2fFf8c0F81fEd5801a895bA38A00c08421"
const FLIPBB_SONIC="0x0bAc092F08CF1006DC99bD280615346f06120910"
const FLIPBB_SAGA="0x25739b516111849f1f28cDB1576A9B15650D8467"
const FLIPBB_BERACHAIN="0x479e6c2fFf8c0F81fEd5801a895bA38A00c08421"

const FLIPAG_BASE="0x19Caf9cd83AC869874D36025d8683e7180da4EF0"
const FLIPAG_POLYGON="0x7cC0769F7d234cE9A4903F5d219a1D9f444B3736"
const FLIPAG_SONIC="0x03771E2B42f518E2bF9d70BB4856ca258e487dFf"
const FLIPAG_SAGA="0xD36ECEC516AE1CdF3303aba61adbaf8bB9A5B430"
const FLIPAG_BERACHAIN="0x7cC0769F7d234cE9A4903F5d219a1D9f444B3736"


const RPC_URLS = {
    base: BASE_RPC_URL,
    polygon: POLYGON_RPC_URL,
    sonic: SONIC_RPC_URL,
    saga: SAGA_RPC_URL,
    berachain: BERACHAIN_RPC_URL,
};

const CONTRACTS = {
    FLIPND: {
        base: FLIPND_BASE,
        polygon: FLIPND_POLYGON,
        sonic: FLIPND_SONIC,
        saga: FLIPND_SAGA,
        berachain: FLIPND_BERACHAIN,
    },
    FLIPBB: {
        base: FLIPBB_BASE,
        polygon: FLIPBB_POLYGON,
        sonic: FLIPBB_SONIC,
        saga: FLIPBB_SAGA,
        berachain: FLIPBB_BERACHAIN,
    },
    FLIPAG: {
        base: FLIPAG_BASE,
        polygon: FLIPAG_POLYGON,
        sonic: FLIPAG_SONIC,
        saga: FLIPAG_SAGA,
        berachain: FLIPAG_BERACHAIN,
    }
};

const providers = Object.fromEntries(
    Object.entries(RPC_URLS).map(([chain, url]) => [chain, new ethers.JsonRpcProvider(url)])
);

async function fetchWithRetry(contract, method, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await contract[method]();
        } catch (error) {
            console.warn(`⚠️ RPC call failed (${method}) - Retry ${i + 1}/${retries}:`, error);
            await new Promise(res => setTimeout(res, delay)); // Wait before retrying
        }
    }
    throw new Error(`❌ Failed to fetch ${method} after ${retries} retries.`);
}


async function fetchChainData(chain, provider) {
    try {
        const flipndContract = new ethers.Contract(CONTRACTS.FLIPND[chain], FLIP_CONTRACT_ABI.abi, provider);
        const flipbbContract = new ethers.Contract(CONTRACTS.FLIPBB[chain], FLIPPANDO_CONTRACT_ABI.abi, provider);
        const flipagContract = new ethers.Contract(CONTRACTS.FLIPAG[chain], FLIPPANDO_BUNDLER_CONTRACT_ABI.abi, provider);

        const [totalLockedFLIPND, totalUnlockedFLIPND, totalFLIPBB, totalFLIPAG] = await Promise.all([
            fetchWithRetry(flipndContract, "getTotalLockedSupply"),
            fetchWithRetry(flipndContract, "totalSupply"),
            fetchWithRetry(flipbbContract, "totalSupply"),
            fetchWithRetry(flipagContract, "totalSupply"),
        ]);

        return {
            totalLockedFLIPND: (Number(totalLockedFLIPND) / 1e18).toFixed(2),
            totalUnlockedFLIPND: (Number(totalUnlockedFLIPND) / 1e18).toFixed(2),
            totalFLIPBB: totalFLIPBB.toString(),
            totalFLIPAG: totalFLIPAG.toString(),
            flipbbHolders: 5, // Placeholder values
            flipagHolders: 5,
            totalTransactions: 5,
            avgMovesFLIPBB: 5
        };
    } catch (error) {
        console.error(`Error fetching data for ${chain}:`, error);
        return null;
    }
}

async function fetchData() {
    const results = await Promise.all(
        Object.entries(providers).map(async ([chain, provider]) => {
            const formattedChain = chain.charAt(0).toUpperCase() + chain.slice(1);
            const data = await fetchChainData(chain, provider);
            return data ? [formattedChain, data] : null;
        })
    );

    const validResults = Object.fromEntries(results.filter(Boolean));
    cache.set("dashboardData", validResults);
    return validResults;
}

// Fetch data every 5 minutes
setInterval(fetchData, 300000);
fetchData();

// Next.js API route handler
export async function GET() {
    let data = cache.get("dashboardData");
    // If cache is empty or expired, fetch new data
    if (!data) {
        console.log("⏳ Cache expired. Fetching new data...");
        data = await fetchData();
    }
    return Response.json(data || { message: "Data not available yet. Try again later." });
}
