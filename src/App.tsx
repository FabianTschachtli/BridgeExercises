import { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import Hand from './Hand';
import BidTable from './BidTable';
import BridgeAuction from './BridgeAuction';

function App() {
    document.body.classList.add('exercise');
    document.body.classList.remove('landingpage');
    const [showIntro, setShowIntro] = useState(true);

    const sampleBids = [
        [" ", " ", "1♣","Pass"],
        ["1♥", "Pass", "2♥", "Pass"]];


    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnd = () => setShowIntro(false);

    if (showIntro) {
        return (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
                <video
                    src="/intro.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="w-screen h-screen object-cover"
                    onEnded={handleVideoEnd}
                />
                <button
                    onClick={() => setShowIntro(false)}
                    className="absolute top-6 right-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
                >
                    Skip
                </button>
            </div>
        );
    }

    return (
        <>
            <BridgeAuction bids={sampleBids} />
            <div className="max-w-md mx-auto mt-10">
                <BidTable onBidClick={handleBidClick} lastBid={'2♥'} />
            </div>
            <Hand cardList="7S,QH,TH,8H,2H,JC,9C,8C,7C,3C,2C,JD,9D" />
            <div
                className="hand"
                data-hand="flow: horizontal; spacing: 0.2; width: 80; cards: 7S,QH,TH,8H,2H,JC,9C,8C,7C,3C,2C,JD,9D"
            />
        </>
    );
}

function handleBidClick(bid: string) {
    console.log(bid);
}

export default App;
