"use client";
import { useEffect, useState } from "react";

export function AnimatedFLIPNDStats({ totalUnlockedFLIPND, totalLockedFLIPND, totalFLIPAG }) {
  const [animatedValues, setAnimatedValues] = useState({
    unlocked: 0,
    locked: 0,
    artworks: 0,
  });

  useEffect(() => {
    if (totalUnlockedFLIPND > 0 || totalLockedFLIPND > 0 || totalFLIPAG > 0) {
      let start = 0;
      const duration = 1500; // Animation duration in ms
      const stepTime = 15; // Interval step
      const steps = duration / stepTime;

      const incrementUnlocked = totalUnlockedFLIPND / steps;
      const incrementLocked = totalLockedFLIPND / steps;
      const incrementArtworks = totalFLIPAG / steps;

      const interval = setInterval(() => {
        start++;
        setAnimatedValues((prev) => ({
          unlocked: Math.min(totalUnlockedFLIPND, prev.unlocked + incrementUnlocked),
          locked: Math.min(totalLockedFLIPND, prev.locked + incrementLocked),
          artworks: Math.min(totalFLIPAG, prev.artworks + incrementArtworks),
        }));

        if (start >= steps) clearInterval(interval);
      }, stepTime);
    }
  }, [totalUnlockedFLIPND, totalLockedFLIPND, totalFLIPAG]);

  if (totalUnlockedFLIPND === 0 && totalLockedFLIPND === 0 && totalFLIPAG === 0) {
    return null;
  }

  return (
    <div className="flex justify-center w-full">
        <div className="text-start max-w-xxl">
        {totalUnlockedFLIPND > 0 && (
            <div className="text-[2vw] mt-0 font-normal mt-2">
            <span className="text-[2.8vw] text-white font-bold bg-purple-500 rounded-md px-3 py-2 mr-2">{Math.floor(animatedValues.unlocked)}</span>{" "}
                <b>
                <u>liquid $FLIPND</u>
                </b>{" "}
                rewarded across chains
            </div>
        )}
        {totalLockedFLIPND > 0 && (
            <div className="text-[2vw] mt-1 font-normal mt-2">
                <span className="text-[2.8vw] text-white font-bold bg-purple-500 rounded-md px-3 py-2 mr-2">{Math.floor(animatedValues.locked)}</span>{" "}
                <b>
                <u>locked $FLIPND</u>
                </b>{" "}
                available across chains
            </div>
        )}
        {totalFLIPAG > 0 && (
            <div className="text-[2vw] mt-1 font-normal mb-20 mt-2">
            <span className="text-[2.8vw] text-white font-bold bg-purple-500 rounded-md px-3 py-2 mr-2">{Math.floor(animatedValues.artworks)}</span>{" "}
                <b>
                <u>unique art NFTs</u>
                </b>{" "}
                minted across chains
            </div>
        )}
        </div>
    </div>
  );
}