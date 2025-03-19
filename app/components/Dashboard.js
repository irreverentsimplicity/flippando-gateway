"use client";
import { useState, useEffect } from "react";

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

    const formatFLIPND = (value) => {
        if (!value) return "0";
        return (parseFloat(value) / 1e18).toLocaleString(); // Convert from 18 decimals
    };

    return (
        <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Chain</th>
                        <th className="p-2 border">Locked FLIPND</th>
                        <th className="p-2 border">Unlocked FLIPND</th>
                        <th className="p-2 border">Total FLIPBB</th>
                        <th className="p-2 border">Total FLIPAG</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        Object.keys(data).map((chain) => (
                            <tr key={chain} className="border">
                                <td className="p-2 border font-bold capitalize">{chain}</td>
                                <td className="p-2 border">{formatFLIPND(data[chain].totalLockedFLIPND)}</td>
                                <td className="p-2 border">{formatFLIPND(data[chain].totalUnlockedFLIPND)}</td>
                                <td className="p-2 border">{data[chain].totalFLIPBB}</td>
                                <td className="p-2 border">{data[chain].totalFLIPAG}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
