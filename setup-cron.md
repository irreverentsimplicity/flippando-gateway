# Flippando Cache Cron Setup

## Add to Crontab

Run the following command to edit your crontab:
```bash
crontab -e
```

Add this line to refresh the cache every 5 minutes:
```bash
*/5 * * * * cd /Users/dragosroua/Documents/Projects/Blockchains/Gno/flippando-gateway && npm run refresh-cache >> logs/cache-refresh.log 2>&1
```

## Create Logs Directory

```bash
mkdir -p /Users/dragosroua/Documents/Projects/Blockchains/Gno/flippando-gateway/logs
```

## Initial Cache Population

Run once manually to populate the cache:
```bash
cd /Users/dragosroua/Documents/Projects/Blockchains/Gno/flippando-gateway
npm run refresh-cache
```

## Verify Cron is Working

Check the log file after a few minutes:
```bash
tail -f logs/cache-refresh.log
```

## Test the API

After cron runs, test the API:
```bash
curl http://localhost:3005/api/flippandoDashboard
```

## PM2 Usage (No Changes)

Continue using PM2 as before:
```bash
pm2 start "npm run dev" --name flippando-gateway
# or
pm2 start flippando-gateway
```