"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import GameMechanics from "./GameMechanics";

export default function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/flippandoDashboard");
            const result = await response.json();
            console.log("result ", JSON.stringify(result));
            setData(result);
        }
        fetchData();
        const interval = setInterval(fetchData, 300000); // Refresh every 5 min
        return () => clearInterval(interval);
    }, []);

    if (!data) return <div>Loading...</div>;

    const chains = Object.keys(data);

    const totalLockedFLIPND = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalLockedFLIPND || 0), 0);
    const totalUnlockedFLIPND = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalUnlockedFLIPND || 0), 0);
    const totalFLIPBB = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalFLIPBB || 0), 0);
    const totalFLIPAG = chains.reduce((sum, chain) => sum + parseFloat(data[chain].totalFLIPAG || 0), 0);

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

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
            <div className="text-[2vw] mt-0 text-center font-normal">
                {totalUnlockedFLIPND} liquid $FLIPND rewarded across chains
            </div>
            <div className="text-[2vw] mt-1 text-center font-normal mb-1">
                {totalLockedFLIPND} locked $FLIPND across chains
            </div>
            <div className="text-[2vw] mt-1 text-center font-normal mb-20">
                {totalFLIPAG} artworks minted across chains
            </div>

            {/* Game mechanics */}
            <GameMechanics />
            
            <div className="flex flex-wrap justify-center pt-8 gap-8">
                <div>
                    <h3 className="text-center font-normal">Locked $FLIPND & basic flips</h3>
                    <PieChart width={300} height={300}>
                        <Pie 
                            data={lockedFLIPNDData} 
                            dataKey="value" 
                            paddingAngle={2} 
                            innerRadius={60} 
                            outerRadius={75} 
                            fill="#8884d8">
                            {lockedFLIPNDData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Pie 
                            data={flipbbData} 
                            dataKey="value" 
                            paddingAngle={2} 
                            innerRadius={80} 
                            outerRadius={100} 
                            fill="#82ca9d">
                            {flipbbData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
                <div>
                    <h3 className="text-center font-normal">Liquid $FLIPND</h3>
                    <PieChart width={300} height={300}>
                        <Pie data={unlockedFLIPNDData} 
                            dataKey="value" 
                            paddingAngle={2} 
                            innerRadius={60} 
                            outerRadius={100} fill="#8884d8">
                            {unlockedFLIPNDData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
                <div>
                    <h3 className="text-center font-normal">Art created</h3>
                    <PieChart width={300} height={300}>
                        <Pie 
                            data={flipagData} 
                            dataKey="value" 
                            paddingAngle={2} 
                            innerRadius={60} 
                            outerRadius={100} fill="#8884d8">
                            {flipagData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}
