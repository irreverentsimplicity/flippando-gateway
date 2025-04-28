const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/quickswap/exchange-v3-polygon";

const FLIPND_ADDRESS = "0x19caf9cd83ac869874d36025d8683e7180da4ef0".toLowerCase();
const POL_ADDRESS = "0x708b528ab3c2c3c7f1fc4874bf2fcd2384f4b6cd".toLowerCase();
const USDC_ADDRESS = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174".toLowerCase();

async function querySubgraph(query, variables = {}) {
  const res = await fetch(SUBGRAPH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data } = await res.json();
  return data;
}

// Fetch the pool between two tokens
async function getPoolAddress(token0, token1) {
  const query = `
    query($token0: Bytes!, $token1: Bytes!) {
      pools(
        where: {
          token0_in: [$token0, $token1]
          token1_in: [$token0, $token1]
        }
        first: 1
      ) {
        id
        token0 { id symbol }
        token1 { id symbol }
        feeTier
        sqrtPrice
      }
    }
  `;
  const variables = { token0, token1 };
  const data = await querySubgraph(query, variables);
  if (!data.pools.length) throw new Error(`No pool found between ${token0} and ${token1}`);
  return data.pools[0];
}

// Convert sqrtPriceX96 to price
function sqrtPriceX96ToPrice(sqrtPriceX96, token0Decimals, token1Decimals) {
  const sqrtPrice = BigInt(sqrtPriceX96);
  const price = (sqrtPrice * sqrtPrice * BigInt(10 ** token0Decimals)) / (BigInt(10 ** token1Decimals) * BigInt(2) ** BigInt(192));
  return Number(price.toString());
}

// 🎯 Main function
export async function getFlipndPriceInUSDC() {
  try {
    // Step 1: FLIPND/POL
    const flipndPolPool = await getPoolAddress(FLIPND_ADDRESS, POL_ADDRESS);
    const priceFlipndInPol = flipndPolPool.token0.id.toLowerCase() === FLIPND_ADDRESS
      ? sqrtPriceX96ToPrice(flipndPolPool.sqrtPrice, 18, 18)
      : 1 / sqrtPriceX96ToPrice(flipndPolPool.sqrtPrice, 18, 18);

    // Step 2: POL/USDC
    const polUsdcPool = await getPoolAddress(POL_ADDRESS, USDC_ADDRESS);
    const pricePolInUsdc = polUsdcPool.token0.id.toLowerCase() === POL_ADDRESS
      ? sqrtPriceX96ToPrice(polUsdcPool.sqrtPrice, 18, 6)
      : 1 / sqrtPriceX96ToPrice(polUsdcPool.sqrtPrice, 6, 18);

    // Step 3: Multiply
    const priceFlipndInUsdc = priceFlipndInPol * pricePolInUsdc;

    return priceFlipndInUsdc;
  } catch (err) {
    console.error("Error fetching FLIPND price via Subgraph:", err);
    return null;
  }
}
