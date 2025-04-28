import { ethers } from "ethers";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Import ABIs
import FLIPPANDO_CONTRACT_ABI from "../../components/abis/Flippando.json";
import FLIPPANDO_BUNDLER_CONTRACT_ABI from "../../components/abis/FlippandoBundler.json";
import FLIP_CONTRACT_ABI from "../../components/abis/FLIPND.json";

const BASE_RPC_URL="https://mainnet.base.org"
const POLYGON_RPC_URL="https://polygon-rpc.com"
const SONIC_RPC_URL="https://rpc.soniclabs.com"
const SAGA_RPC_URL="https://flippandomainnet-2737273595554000-1.jsonrpc.sagarpc.io"
const BERACHAIN_RPC_URL ="https://rpc.berachain.com"

const FLIPND_BASE="0x9d0be34D28Db0b707B4498cD51F2b33D66FF95B5"
const FLIPND_POLYGON="0xbE39287279900ce1a7204A396Baaf6cd27532725"
const FLIPND_SONIC="0x29206754263485240146357Bfd475fc282cd27D3"
const FLIPND_SAGA="0xDF24547D9C7C0D94929AbD405Fe0434F8c00d9cd"
const FLIPND_BERACHAIN="0xd7291acF405b62B523456C87d07F2dBcaf0E2899"

const FLIPBB_BASE="0x2fDee266438B31e25888c65c05f9b666d46D8F39"
const FLIPBB_POLYGON="0x2497e4115375100ee5D918bd3F2Ff9D4304e0d90"
const FLIPBB_SONIC="0x49241a3c19C7C54176F866aB3A9e6E628010ba5D"
const FLIPBB_SAGA="0x0a46c47647B3E7f90c4ccB385939D685100191d8"
const FLIPBB_BERACHAIN="0xb1B64e2191b4f0302A8886A4239C78FE9a971d14"

const FLIPAG_BASE="0xf4CbA6BaEdbBD72BC23E5b1CfaC07D8125423528"
const FLIPAG_POLYGON="0x45b3336a1624ECfB95E638172C3c2d8e2fd67889"
const FLIPAG_SONIC="0xa5eab5fc0A1d9EFc8AE0Ad828aB243c9c36c78dD"
const FLIPAG_SAGA="0x7498bFe9E83ae618097c17Caa8F7a1680cDC8708"
const FLIPAG_BERACHAIN="0xFBd0d98cD92387f420D27f4339Db3C8Cea934674"



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
