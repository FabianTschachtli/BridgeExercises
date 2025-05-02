import React from 'react';

const players = ['South', 'West','North', 'East'];

interface Bid {
    player: number; // 0 - North, 1 - East, 2 - South, 3 - West
    value: string;  // e.g., "1♣", "2NT", "Pass", "Double"
}

interface BridgeAuctionProps {
    bids: Bid[];
}

const BridgeAuction: React.FC<BridgeAuctionProps> = ({ bids }) => {

    return (
        <div className="p-4 rounded-xl bg-green-800 text-white font-mono max-w-md mx-auto shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">Bridge Auction</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
                {players.map((player) => (
                    <div key={player} className="font-semibold">{player}</div>
                ))}
                {bids.map((bid) => (
                    <div key={bid.value} className="col-span-1">
                        {bid.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BridgeAuction;