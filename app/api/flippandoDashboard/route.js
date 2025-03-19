import { ethers } from "ethers";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Import ABIs
import FLIPPANDO_CONTRACT_ABI from "../../components/abis/Flippando.json";
import FLIPPANDO_BUNDLER_CONTRACT_ABI from "../../components/abis/FlippandoBundler.json";
import FLIP_CONTRACT_ABI from "../../components/abis/FLIPND.json";

const RPC_URLS = {
    base: process.env.BASE_RPC_URL,
    polygon: process.env.POLYGON_RPC_URL,
    sonic: process.env.SONIC_RPC_URL,
    saga: process.env.SAGA_RPC_URL
};

const CONTRACTS = {
    FLIPND: {
        base: process.env.FLIPND_BASE,
        polygon: process.env.FLIPND_POLYGON,
        sonic: process.env.FLIPND_SONIC,
        saga: process.env.FLIPND_SAGA
    },
    FLIPBB: {
        base: process.env.FLIPBB_BASE,
        polygon: process.env.FLIPBB_POLYGON,
        sonic: process.env.FLIPBB_SONIC,
        saga: process.env.FLIPBB_SAGA
    },
    FLIPAG: {
        base: process.env.FLIPAG_BASE,
        polygon: process.env.FLIPAG_POLYGON,
        sonic: process.env.FLIPAG_SONIC,
        saga: process.env.FLIPAG_SAGA
    }
};

const providers = Object.fromEntries(
    Object.entries(RPC_URLS).map(([chain, url]) => [chain, new ethers.JsonRpcProvider(url)])
);

async function fetchChainData(chain, provider) {
    try {
        const flipndContract = new ethers.Contract(CONTRACTS.FLIPND[chain], FLIP_CONTRACT_ABI.abi, provider);
        const flipbbContract = new ethers.Contract(CONTRACTS.FLIPBB[chain], FLIPPANDO_CONTRACT_ABI.abi, provider);
        const flipagContract = new ethers.Contract(CONTRACTS.FLIPAG[chain], FLIPPANDO_BUNDLER_CONTRACT_ABI.abi, provider);

        const [totalLockedFLIPND, totalUnlockedFLIPND, totalFLIPBB, totalFLIPAG] = await Promise.all([
            flipndContract.getTotalLockedSupply(),
            flipndContract.getTotalUnlockedSupply(),
            flipbbContract.totalSupply(),
            flipagContract.totalSupply()
        ]);

        return {
            totalLockedFLIPND: totalLockedFLIPND.toString(),
            totalUnlockedFLIPND: totalUnlockedFLIPND.toString(),
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
            const data = await fetchChainData(chain, provider);
            return data ? [chain, data] : null;
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
    const data = cache.get("dashboardData");
    return Response.json(data || { message: "Data not available yet. Try again later." });
}
