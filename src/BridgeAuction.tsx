import React from 'react';
import { Card, Typography } from "@material-tailwind/react";

const players = ['South', 'West', 'North', 'East'];

interface BridgeAuctionProps {
    bids: string[][];
}

const BridgeAuction: React.FC<BridgeAuctionProps> = ({ bids }) => {

    return (
        <Card className="h-full w-full items-center " placeholder={undefined}
              onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <table className="w-full min-w-max table-auto text-center">
                <thead>
                <tr>
                    {players.map((player) => (
                        <th
                            key={player}
                            className="bg-green-800 text-white font-mono max-w-lg mx-auto shadow-lg"
                        >
                            <Typography
                                variant="paragraph"
                                color="white"
                                className="font-normal leading-none opacity-90"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                                {player}
                            </Typography>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {bids.map(( row: string[] , index) => {
                    const even = index % 2 === 0;
                    const classes = ( even ? "bg-green-700 " : "bg-green-800 ")
                        + "text-white center font-mono max-w-lg mx-auto shadow-lg" ;
                    return (
                        <tr key={ index }>
                            { row.map((bid: string) => {
                            return (<td className={classes}>
                                    {bid}
                            </td>);
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>);
};

export default BridgeAuction;
