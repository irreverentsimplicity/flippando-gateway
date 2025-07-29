#!/usr/bin/env node

const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// Import ABIs
const FLIPPANDO_CONTRACT_ABI = require("../app/components/abis/Flippando.json");
const FLIPPANDO_BUNDLER_CONTRACT_ABI = require("../app/components/abis/FlippandoBundler.json");
const FLIP_CONTRACT_ABI = require("../app/components/abis/FLIPND.json");

const BASE_RPC_URL="https://1rpc.io/base"
const POLYGON_RPC_URL="https://polygon-rpc.com"
const SONIC_RPC_URL="https://rpc.soniclabs.com"
const SAGA_RPC_URL="https://flippandomainnet-2737273595554000-1.jsonrpc.sagarpc.io"
const BERACHAIN_RPC_URL ="https://rpc.berachain.com"

const FLIPND_BASE="0xC2263C21AC2259bB43eFecE0c4911e2F359E317e"
const FLIPND_POLYGON="0x55be1AfFf62240dCb9e672A9cc5Cb0844C7E8f07"
const FLIPND_SONIC="0xbc5f3543b96C8Dc9E004408aE69c3506A75f4Bc2"
const FLIPND_SAGA="0x4c6886B1a5b717Aa567D5F51332934fA0422eC48"
const FLIPND_BERACHAIN="0xAe94e6CF63FcDB84fd949B9B581a3884792FbC3c"

const FLIPBB_BASE="0xbBad34C56F49E42ADeC00386e77686c661226C70"
const FLIPBB_POLYGON="0xEF2E93acdCcf10953A3eaF1eFE447A724eCB9aDe"
const FLIPBB_SONIC="0xF347fD85ccb7843bA44411206842D2Ac9707D408"
const FLIPBB_SAGA="0x6892149654c4746Ae04A3e3eD853248BC9003544"
const FLIPBB_BERACHAIN="0x2b9aA0bcD45B4EC2aF9f600ac1D935d13616b69F"

const FLIPAG_BASE="0xA052ea918423b6317a54B3d2142a1E9098593853"
const FLIPAG_POLYGON="0x6626d128cB9cdB275caD63af565dE894fcE40991"
const FLIPAG_SONIC="0x49263E855c4d44748b17FF6735378fD578bA2317"
const FLIPAG_SAGA="0xAac74A62a5AfE51E6885A32f9f5af7617C9Cf838"
const FLIPAG_BERACHAIN="0x6ab5409D5E5EEC485A521EbC3Ed8A35e8394D6E8"

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

const CACHE_FILE = path.join(__dirname, "../cache/dashboard-data.json");

async function fetchWithRetry(contract, method, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await contract[method]();
        } catch (error) {
            console.warn(`⚠️ RPC call failed (${method}) - Retry ${i + 1}/${retries}:`, error.message);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error(`❌ Failed to fetch ${method} after ${retries} retries.`);
}

async function fetchChainData(chain, provider) {
    try {
        console.log(`📡 Fetching data for ${chain}...`);
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
        console.error(`❌ Error fetching data for ${chain}:`, error.message);
        return null;
    }
}

async function refreshCache() {
    console.log(`🔄 Starting cache refresh at ${new Date().toISOString()}`);
    
    try {
        const results = await Promise.all(
            Object.entries(providers).map(async ([chain, provider]) => {
                const formattedChain = chain.charAt(0).toUpperCase() + chain.slice(1);
                const data = await fetchChainData(chain, provider);
                return data ? [formattedChain, data] : null;
            })
        );

        const validResults = Object.fromEntries(results.filter(Boolean));
        
        // Ensure cache directory exists
        const cacheDir = path.dirname(CACHE_FILE);
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        // Write cache with timestamp
        const cacheData = {
            data: validResults,
            timestamp: Date.now(),
            lastUpdated: new Date().toISOString()
        };

        fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
        console.log(`✅ Cache refreshed successfully with ${Object.keys(validResults).length} chains`);
        
    } catch (error) {
        console.error(`❌ Cache refresh failed:`, error.message);
        process.exit(1);
    }
}

// Run the refresh
refreshCache();