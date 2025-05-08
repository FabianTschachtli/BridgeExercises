
import './App.css'
import Hand from './Hand.tsx';
import BidTable from "./BidTable.tsx";
import BridgeAuction from "./BridgeAuction.tsx";

function App() {

    const sampleBids = [
        { player: 0, value: "1♣" },
        { player: 1, value: "Pass" },
        { player: 2, value: "1♥" },
        { player: 3, value: "Pass" },
        { player: 0, value: "2♥" },
        { player: 1, value: "Pass" },
        { player: 2, value: "Pass" },
        { player: 3, value: "Pass" },
    ];
  return (
      <>
          <BridgeAuction bids={sampleBids} />
          <div className="max-w-md mx-auto mt-10">
              <BidTable onBidClick={handleBidClick} lastBid={'2♥'}/>
          </div>
          <Hand cardList="7S,QH,TH,8H,2H,JC,9C,8C,7C,3C,2C,JD,9D" active={true} flow="horizontal" spacing={2}></Hand>
          <div className='hand' data-hand='flow: horizontal; spacing: 0.2; width: 80; cards: 7S,QH,TH,8H,2H,JC,9C,8C,7C,3C,2C,JD,9D' />

          </>
          )
}

function handleBidClick(bid: string) {
    console.log(bid);
}
export default App
