const fs = require("fs");
const path = require("path");

const CACHE_FILE = path.join(process.cwd(), "cache/dashboard-data.json");
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

function readCache() {
    try {
        if (!fs.existsSync(CACHE_FILE)) {
            return null;
        }
        
        const cacheContent = fs.readFileSync(CACHE_FILE, "utf8");
        const cacheData = JSON.parse(cacheContent);
        
        // Check if cache is still valid (less than 5 minutes old)
        const now = Date.now();
        const cacheAge = now - cacheData.timestamp;
        
        if (cacheAge > CACHE_TTL) {
            console.log("📅 Cache expired, age:", Math.round(cacheAge / 1000), "seconds");
            return null;
        }
        
        console.log("✅ Using cached data, age:", Math.round(cacheAge / 1000), "seconds");
        return cacheData.data;
        
    } catch (error) {
        console.error("❌ Error reading cache:", error.message);
        return null;
    }
}

// Next.js API route handler
export async function GET() {
    try {
        const data = readCache();
        
        if (data) {
            return Response.json(data);
        } else {
            return Response.json({ 
                message: "Data not available yet. Cache is being refreshed by cron job. Try again in a few minutes." 
            });
        }
    } catch (error) {
        console.error("❌ API error:", error.message);
        return Response.json({ 
            message: "Error reading cached data. Please try again later." 
        }, { status: 500 });
    }
}
