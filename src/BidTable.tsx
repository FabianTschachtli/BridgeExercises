type BidTableProps = {
    onBidClick: (bid: string) => void;
    lastBid: string;
};

const levels = [1, 2, 3, 4, 5, 6, 7];


const suits = ["NT", "♠", "♥", "♦", "♣"];

const specialBids = [
    {text: "Pass", bgColor: "bg-green-700", hoverColor: "bg-green-600"},
    {text: "X", bgColor: "bg-red-600", hoverColor: "bg-red-400"},
    {text: "XX", bgColor: "bg-blue-700", hoverColor: "bg-blue-500"}];

const getSuitColor = (s: string): string => {
    switch (s) {
        case "NT":
            return "text-gray-800";
        case "♠":
            return "text-blue-600";
        case "♥":
            return "text-red-600";
        case "♦":
            return "text-red-500";
        case "♣":
            return "text-green-600";
        default:
            return "";
    }
};


const isDisabled =
    (level: number, rank: number, lastLevel: number, lastRank: number): boolean => {
        if (level > lastLevel) {
            return false;
        } else if (level < lastLevel) {
            return true;
        } else {
            return rank <= lastRank;
        }
    }


const BidTable: React.FC<BidTableProps> = ({onBidClick, lastBid}) => {
    const lastLevel = parseInt(lastBid.substring(0, 1));
    const lastRank = suits.indexOf(lastBid.substring(1, 2));
    return (
        <div className="p-4">

            <div className="flex justify-center gap-6 mb-4">
                {specialBids.map((bid) => (
                    <button
                        key={bid.text}
                        className={bid.bgColor + ' no-border rounded-xl px-4 py-2 font-semibold ' +
                            'hover:' + bid.hoverColor + ' transition'}
                        onClick={() => onBidClick(bid.text)}
                    >
                        {bid.text}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-5 gap-1 mb-4">
                {levels.flatMap((level) =>
                    suits.map((suit, index) => {
                        const bid = `${level}${suit}`;
                        const suitOnly = suit.replace(/\d/g, ""); // Just the suit char
                        return (
                            <button
                                key={bid}
                                disabled={isDisabled(level, index, lastLevel, lastRank)}
                                className={`
                                  bg-gray-50 
                                  hover:bg-gray-100 
                                  disabled:bg-gray-200 
                                  ${getSuitColor(suitOnly)} 
                                  rounded-md 
                                  px-3 py-2 
                                  font-semibold 
                                  transition
                                `}
                                onClick={() => onBidClick(bid)}
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