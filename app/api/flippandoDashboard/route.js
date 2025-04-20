import { ethers } from "ethers";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Import ABIs
import FLIPPANDO_CONTRACT_ABI from "../../components/abis/Flippando.json";
import FLIPPANDO_BUNDLER_CONTRACT_ABI from "../../components/abis/FlippandoBundler.json";
import FLIP_CONTRACT_ABI from "../../components/abis/FLIPND.json";

const BASE_RPC_URL="https://mainnet.base.org"
const POLYGON_RPC_URL="https://polygon.llamarpc.com"
const SONIC_RPC_URL="https://rpc.soniclabs.com"
const SAGA_RPC_URL="https://flippandomainnet-2737273595554000-1.jsonrpc.sagarpc.io"
const BERACHAIN_RPC_URL ="https://rpc.berachain.com"

const FLIPND_BASE="0x6daCbB7686a95Fb7D8e439dF0B53F889B81a68B5"
const FLIPND_POLYGON="0x19Caf9cd83AC869874D36025d8683e7180da4EF0"
const FLIPND_SONIC="0x3F466870F207f817f5Da6eBd4F57ba932330e241"
const FLIPND_SAGA="0x648680502ae4950B16aF6329C767260652bc6a9F"
const FLIPND_BERACHAIN="0xE16C8b4E4e0bf36Ed7Bfbf16C321AdE7d598E818"

const FLIPBB_BASE="0x6E65A10e0fba39eDeAD0e227ac673640221bbEa0"
const FLIPBB_POLYGON="0xCC2C917c8929136a9387063AFB0A0deFD2B58FB4"
const FLIPBB_SONIC="0xb74485d624A4a2A1DC8500148258381d96D2EbA2"
const FLIPBB_SAGA="0x2F2C84AB38733B328ccf7CB067d12B9Edc5C9E65"
const FLIPBB_BERACHAIN="0x2Db8A2BBC39cE4b181Bc279B1503477F358B2A88"

const FLIPAG_BASE="0x3edF0a700dF61AD20069E497F5203094624F5999"
const FLIPAG_POLYGON="0x1e2361E62A54a3cf4a96DBFA9c27302b9E995496"
const FLIPAG_SONIC="0x754Ba3200ACe3283BCDD52cbd9C23c3e801add03"
const FLIPAG_SAGA="0xAaA7007Cfb01E70bf7Eab22205dF99eedb0FE633"
const FLIPAG_BERACHAIN="0x62bAa48C3aD8953A52A44935B1f53801Ae90E8Eb"

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
