import React from 'react';

type BidTableProps = {
    onBidClick: (bid: string) => void;
    lastBid: string;
};

const levels = [1, 2, 3, 4, 5, 6, 7] as const;
type Level = typeof levels[number];

type Suit = "NT" | "♠" | "♥" | "♦" | "♣";
const suits: Suit[] = ["♣", "♦", "♥", "♠", "NT", ];

const suitBgColors: Record<Suit, string> = {
    "NT": "bg-gray-100 hover:bg-gray-200",
    "♠": "bg-blue-100 hover:bg-blue-200",
    "♥": "bg-red-100 hover:bg-red-200",
    "♦": "bg-orange-100 hover:bg-orange-200",
    "♣": "bg-green-100 hover:bg-green-200"
};

const getSuitColor = (s: Suit): string => {
    switch (s) {
        case "NT": return "text-gray-800";
        case "♠":  return "text-blue-600";
        case "♥":  return "text-red-600";
        case "♦":  return "text-orange-600";
        case "♣":  return "text-green-600";
    }
};

const specialBids = [
    { text: 'Pass', bgColor: 'bg-green-700', hoverColor: 'bg-green-600' },
    { text: 'X',    bgColor: 'bg-red-600',   hoverColor: 'bg-red-500' },
    { text: 'XX',   bgColor: 'bg-blue-700',  hoverColor: 'bg-blue-500' },
];

const isDisabled = (
    level: Level,
    rank: number,
    lastLevel: number,
    lastRank: number
): boolean => {
    if (level > lastLevel)      return false;
    else if (level < lastLevel) return true;
    return rank <= lastRank;
};

const BidTable: React.FC<BidTableProps> = ({ onBidClick, lastBid }) => {
    const lastLevel = parseInt(lastBid.substring(0, 1)) || 0;
    const lastSuit  = lastBid.substring(1) as Suit;
    const lastRank  = suits.indexOf(lastSuit);

    return (
        <div className="p-4">
            {/* Special action buttons: Pass, X, XX */}
            <div className="mb-6 flex justify-center gap-4">
                {specialBids.map(({ text, bgColor, hoverColor }) => (
                    <button
                        key={text}
                        onClick={() => onBidClick(text)}
                        className={`
              ${bgColor} hover:${hoverColor} text-white
              text-xl px-6 py-1 rounded-xl shadow-lg font-bold tracking-wide
              transition transform duration-150 hover:scale-105
            `}
                    >
                        {text}
                    </button>
                ))}
            </div>

            {/* Grid of level+suit buttons */}
            <div className="grid grid-cols-5 gap-1 mb-4">
                {levels.flatMap((level) =>
                    suits.map((suit, index) => {
                        const bid = `${level}${suit}`;
                        const disabled = isDisabled(level, index, lastLevel, lastRank);
                        return (
                            <button
                                key={bid}
                                disabled={disabled}
                                onClick={() => onBidClick(bid)}
                                className={`
                  ${suitBgColors[suit]}
                  ${getSuitColor(suit)}
                  ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.03]'}
                  rounded-xl text-base md:text-2xl font-extrabold
                  py-1 md:py-0.5 text-center
                  transition duration-150 ease-in-out shadow-sm
                `}
                            >
                                {bid}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BidTable;
