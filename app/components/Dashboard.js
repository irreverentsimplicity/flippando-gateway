"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import GameMechanics from "./GameMechanics";
import { AnimatedFLIPNDStats } from "./AnimatedFLIPNDStats"


export default function Dashboard() {
    const [data, setData] = useState(null);
    const [price, setPrice] = useState(null);
    const ChainId = {
        MATIC: 137
      };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/flippandoDashboard");
            const result = await response.json();
            console.log("result ", JSON.stringify(result));
            setData(result);
        }
        fetchData();
        getFLIPNDPriceOnPolygon();
        const interval = setInterval(fetchData, 300000); // Refresh every 5 min
        return () => clearInterval(interval);
    }, []);

    
    const getFLIPNDPriceOnPolygon = async () => {
        /**
         * revisit after new liquidity pool
         */
        /*
        const res = await fetch("/api/flipnd-price");
        if (!res.ok) {
        const error = await res.json();
        console.error("API failed:", error);
        setPrice(null);
        } else {
        const { price } = await res.json();
        setPrice(price);
        console.log("FLIPND price in USDC:", price);
        }*/
    
    }
    

    if (!data) return <div>Loading...</div>;

    const chains = Object.keys(data);

    const totalLockedFLIPND = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalLockedFLIPND || 0), 0);
    const totalUnlockedFLIPND = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalUnlockedFLIPND || 0), 0);
    const totalFLIPBB = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalFLIPBB || 0), 0);
    const totalFLIPAG = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalFLIPAG || 0), 0);

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    const lockedFLIPNDData = chains.map((chain, index) => ({
        name: chain,
        value: parseFloat(data[chain].totalLockedFLIPND || 0),
        color: colors[index % colors.length]
    }));

    const unlockedFLIPNDData = chains.map((chain, index) => ({
        name: chain,
        value: parseFloat(data[chain].totalUnlockedFLIPND || 0),
        color: colors[index % colors.length]
    }));

    const flipbbData = chains.map((chain, index) => ({
        name: chain,
        value: parseFloat(data[chain].totalFLIPBB || 0),
        color: colors[index % colors.length]
    }));

    const flipagData = chains.map((chain, index) => ({
        name: chain,
        value: parseFloat(data[chain].totalFLIPAG || 0),
        color: colors[index % colors.length]
    }));

    return (
        <div className="p-4 overflow-x-auto mb-5 mt-5">
            {price !== null &&
            <p className="p-4 mb-5 mt-3 text-center font-bold text-3xl overflow-x-auto">
                1 $FLIPND = {price}
            </p>
            }

            {/* FLIPND stats */}
            <AnimatedFLIPNDStats 
                totalUnlockedFLIPND={totalUnlockedFLIPND} 
                totalLockedFLIPND={totalLockedFLIPND}
                totalFLIPAG={totalFLIPAG} />

            {/* Game mechanics */}
            <GameMechanics />
            
            {data.message === undefined &&
            <div>
                <div className="text-[4vw] text-center mt-10 pt-10">
                    Live Dashboard
                </div>
                <div className="text-lg font-italic text-center text-shadow-sm mt-10 mb-10 mr-40 ml-40">
                        Flippando is a "user first, chain later" project. We built the same game, with the same features, on top of different VMs. And then deployed on a variety of blockchains.
                        It's up to the user to decide which chain they want to play their favorite game on.
                </div>
                <div className="flex flex-wrap justify-center pt-8 gap-8">
                    {[ 
                        { title: "Locked $FLIPND", data: lockedFLIPNDData },
                        { title: "Liquid $FLIPND", data: unlockedFLIPNDData },
                        { title: "Artworks", data: flipagData }
                    ].map(({ title, data }, index) => (
                        <div key={index} className="flex flex-col items-center w-[300px]">
                        <h3 className="text-center text-[1.2vw]">{title}</h3>
                        <PieChart width={300} height={300}>
                            <Pie data={data} dataKey="value" paddingAngle={2} innerRadius={60} outerRadius={95} fill="#8884d8">
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <hr className="w-full border-gray-300 mt-4" />
                        <div className="mt-4 w-full">
                            {data.filter(entry => entry.value > 0)
                            .sort((a, b) => b.value - a.value)
                            .map((entry) => (
                                <div key={entry.name} className="flex items-center gap-3 mb-2">
                                <img src={`/assets/${entry.name.toLowerCase()}-logo.png`} alt={entry.name} className="w-6 h-6 rounded-full" />
                                <div className="text-sm">
                                    {entry.name}: {entry.value}{" "}
                                    {title.includes("Locked $FLIPND") ? (
                                        <>
                                        <b><u>locked</u></b> $FLIPND
                                        </>
                                    ) : title.includes("Liquid $FLIPND") ? (
                                        <>
                                        <b><u>liquid</u></b> $FLIPND
                                        </>
                                    ) : (
                                        <>
                                        <u>unique art NFTs</u>
                                        </>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            }


        </div>
            
    );
}
