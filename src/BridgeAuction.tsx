import React from 'react';

const players = ['South', 'West', 'North', 'East'];

interface Bid {
    player: number;
    value: string;
}

interface BridgeAuctionProps {
    bids: Bid[];
}

const BridgeAuction: React.FC<BridgeAuctionProps> = ({ bids }) => {
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
        <div
            className="bg-green-800 text-white rounded-2xl shadow-2xl px-10 py-6 w-fit mx-auto mb-10 border-[6px] border-green-400 scale-[1.1]">
            <h2 className="text-3xl font-bold text-center tracking-wider mb-4">Bridge Auction</h2>
            <div className="grid grid-cols-4 gap-x-8 text-center text-base md:text-lg font-semibold">

                {players.map((player) => (
                    <div key={player}>
                        <div className="font-semibold text-green-200 mb-1">{player}</div>
                        {groupedBids[player].map((bid, i) => (
                            <div key={i} className="text-white">{bid}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BridgeAuction;
