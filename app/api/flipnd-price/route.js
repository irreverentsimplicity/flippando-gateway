import { JsonRpcProvider, Contract } from "ethers";
import { getAddress } from "ethers";

export const dynamic = "force-dynamic";

const FLIPND = getAddress("0xbe39287279900ce1a7204a396baaf6cd27532725");
const USDC = getAddress("0x3c499c542cef5e3811e1192ce70d8cc03d5c3359");
const SUBGRAPH_URL = "https://gateway.thegraph.com/api/f2659fc6ebc1ceb2abd092b63075caa3/subgraphs/id/5AK9Y4tk27ZWrPKvSAUQmffXWyQvjWqyJ2GNEZUWTirU";

const PROVIDER = new JsonRpcProvider("https://polygon-rpc.com");

const POOL_ABI = [
  "function globalState() external view returns (uint160 sqrtPriceX96, int24, uint16, uint16, uint16, uint8, bool)",
  "function token0() view returns (address)",
  "function token1() view returns (address)"
];

function sqrtPriceX96ToPrice(sqrtPriceX96, token0Decimals, token1Decimals) {
  const sqrt = Number(sqrtPriceX96);
  const ratio = (sqrt * sqrt) / 2 ** 192;
  return ratio * 10 ** (token0Decimals - token1Decimals);
}

async function querySubgraph(query, variables = {}) {
  const res = await fetch(SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer f2659fc6ebc1ceb2abd092b63075caa3`
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const { data, errors } = await res.json();
  if (!res.ok || errors) {
    const msg = errors ? errors.map(e => e.message).join(", ") : res.statusText;
    throw new Error(`Subgraph error: ${msg}`);
  }

  return data;
}

async function getPoolAddressFromSubgraph(token0, token1) {
  const query = `
    query($token0: Bytes!, $token1: Bytes!) {
      pools(
        where: {
          token0_in: [$token0, $token1],
          token1_in: [$token0, $token1]
        },
        first: 1,
        orderBy: liquidity,
        orderDirection: desc
      ) {
        id
        token0 { id }
        token1 { id }
      }
    }
  `;

  const varsA = {
    token0: token0.toLowerCase(),
    token1: token1.toLowerCase(),
  };

  const varsB = {
    token0: token1.toLowerCase(),
    token1: token0.toLowerCase(),
  };

  const tryA = await querySubgraph(query, varsA);
  if (tryA.pools.length > 0) return tryA.pools[0].id;

  const tryB = await querySubgraph(query, varsB);
  if (tryB.pools.length > 0) return tryB.pools[0].id;

  throw new Error(`No pool found between ${token0} and ${token1}`);
}

async function getFlipndPriceInUSDC() {
  const poolAddress = await getPoolAddressFromSubgraph(FLIPND, USDC);
  console.log("🟢 Pool address:", poolAddress);

  const pool = new Contract(poolAddress, POOL_ABI, PROVIDER);

  const [sqrtPriceX96] = await pool.globalState();
  console.log("🧮 sqrtPriceX96:", sqrtPriceX96.toString());

  const [token0, token1] = await Promise.all([pool.token0(), pool.token1()]);
  console.log("🔍 token0:", token0);
  console.log("🔍 token1:", token1);

  const token0Decimals = token0.toLowerCase() === USDC.toLowerCase() ? 6 : 18;
  const token1Decimals = token1.toLowerCase() === USDC.toLowerCase() ? 6 : 18;

  const price = sqrtPriceX96ToPrice(sqrtPriceX96, token0Decimals, token1Decimals);
  console.log("💰 Computed price:", price);

  return token0.toLowerCase() === FLIPND.toLowerCase() ? price : 1 / price;
}

export async function GET() {
  try {
    const price = await getFlipndPriceInUSDC();
    const roundedPrice = parseFloat(price.toFixed(2));
    const formatted = `${roundedPrice} USDC`;
    return new Response(JSON.stringify({ price: formatted }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("API error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
