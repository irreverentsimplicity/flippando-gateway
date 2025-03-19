
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve(__dirname);
        config.module.rules.push({
            test: /\.json$/,
            type: "json",
        });
        return config;
    },
};

module.exports = nextConfig;


