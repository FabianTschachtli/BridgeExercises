import React from 'react';

const players = ['South', 'West', 'North', 'East'];

interface Bid {
    player: number;  // 0 = South, 1 = West, 2 = North, 3 = East
    value: string;   // e.g. "1♣", "2NT", "Pass", "Double"
}

interface BridgeAuctionProps {
    bids: Bid[];
}

const BridgeAuction: React.FC<BridgeAuctionProps> = ({ bids }) => {
    // Group bids by player name
    const groupedBids: Record<string, string[]> = {
        South: [],
        West: [],
        North: [],
        East: [],
    };
    bids.forEach(bid => {
        const playerName = players[bid.player];
        groupedBids[playerName].push(bid.value);
    });

    return (
        <div className="p-4 rounded-xl bg-green-800 text-white font-mono max-w-lg mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Bridge Auction</h2>
            <div className="grid grid-cols-4 gap-4 text-center">
                {/* Player headers */}
                {players.map(player => (
                    <div key={player} className="font-semibold text-green-200">
                        {player}
                    </div>
                ))}

                {/* Bids grid: four columns, each player's bids in order */}
                {players.map(player => (
                    <div key={player}>
                        {groupedBids[player].map((bid, i) => (
                            <div key={i} className="py-1">
                                {bid}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BridgeAuction;
