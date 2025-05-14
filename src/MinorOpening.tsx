import React, { useEffect, useState} from 'react';
import './index.css';
import './App.css';
import Hand from './Hand';
import BidTable from './BidTable';
import BridgeAuction from './BridgeAuction';
import {generateSingleHand} from "./bridgehand";
import Progressbar from "./Progressbar.tsx";
import ResultMessage from "./ResultMessage.tsx";
import ButtonExerciseSet from "./ButtonExerciseSet.tsx";
import ButtonToMainPage from "./ButtonToMainPage.tsx";
import {highCardPoints} from "./calculation/pointsCalc.tsx";

function App() {
    type HandState = {
        cards: string[];
        revealed: boolean;
        correct: boolean;
        solution: string;
    };
    document.body.classList.add('exercise');
    document.body.classList.remove('landingpage');

    const [history, setHistory] = useState<HandState[]>([
        { cards: generateSingleHand(), revealed: false, correct: false, solution: "" },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [explanation, setExplanation] = useState("");

    // Current hand and points
    const hand: string[] = history[currentIndex].cards;
    const explanationMessage =  React.createElement("div", {children: explanation});

    const sampleBids = [
            [" ", " ", "1♣","Pass"],
            ["?", " ", " ", " "]];

    // Progress stats
    const correctCount = history.filter((h) => h.revealed && h.correct).length;
    const incorrectCount = history.filter((h) => h.revealed && !h.correct).length;
    const total = history.length;
    const correctPercent = (correctCount / total) * 100;
    const incorrectPercent = (incorrectCount / total) * 100;

    useEffect(() => {
    }, []);

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    const handleNext = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const newHand = { cards: generateSingleHand(), revealed: false, correct: false, solution: "" };
            setHistory([...history, newHand]);
            setCurrentIndex(currentIndex + 1);
        }
    };
    const handleCheck = () => {
        if (history[currentIndex].revealed) return;
        const updated = [...history];
        updated[currentIndex].revealed = true;
        updated[currentIndex].correct = true;
        setHistory(updated);
    };

    const solution = () => {
        const hcp = highCardPoints(hand);
        const spadeCount = hand.filter(card => card.substring(1,2) === "S").length;
        const heartCount = hand.filter(card => card.substring(1,2) === "H").length;
        const diamondCount = hand.filter(card => card.substring(1,2) === "D").length;
        const clubCount = hand.filter(card => card.substring(1,2) === "C").length;

        if (hcp < 6) {
            return { bid: "Pass", explanation: "Pass with less than 6 points" }
        }
        if (hcp >= 13 && diamondCount > 4 && diamondCount > heartCount && diamondCount > spadeCount) {
            return {bid: "1♦", explanation: "Bid ♦ with 13+ Points and shorter majors"}
        }
        if (heartCount >= 4 && heartCount > spadeCount) {
            return {bid: "1♥", explanation: "Bid your longest major"}
        }
        if (spadeCount >= 4 && heartCount < spadeCount) {
            return {bid: "1♠", explanation: "Bid your longest major"}
        }
        if (spadeCount > 4 && heartCount === spadeCount) {
            return {bid: "1♠", explanation: "With long majors start with spades"}
        }
        if (heartCount >= 4 && heartCount === spadeCount) {
            return {bid: "1♥", explanation: "With 4-4 start with hearts"}
        }
        if (hcp <= 10) {
            if (clubCount >= 5) {
                return {bid: "2♣", explanation: "2♣ with 6-10 HCP and long clubs"}
            } else {
                return {bid: "1NT", explanation: "1NT with 6-10 HCP and a balanced hand"}
            }
        }
        if (hcp < 13) {
            if (clubCount >=5 ) {
                return {bid: "3♣", explanation: "3♣ with 11-12 HCP and long clubs"}
            } else {
                return {bid: "2NT", explanation: "2 NT with 11-12 HCP and a balanced hand"}
            }
        }
        if (hcp >= 13 && hcp <= 15 && clubCount < 5) {
            return {bid: "3NT", explanation: "3 NT with 13-15 HCP and a balanced hand"}
        } else {
            return {bid: "1♦", explanation: "If you have to, lie in a minor"}
        }
    }

    function handleBidClick(bid: string) {
        console.log(bid);
        console.log(bid);
        if (history[currentIndex].revealed) return;
        const updated = [...history];
        const solution1 = solution();
        updated[currentIndex].revealed = true;
        updated[currentIndex].solution = solution1.bid;
        setExplanation(solution1.explanation);
        updated[currentIndex].correct = bid === solution().bid;
        setHistory(updated);
    }

    return (
        <>
            <Progressbar
                correctPercent={correctPercent}
                incorrectPercent={incorrectPercent}
                correctCount={correctCount}
                total={total}
                incorrectCount={incorrectCount}
            />
            <ResultMessage solution={history[currentIndex].solution} explanation={explanationMessage} currentState={history[currentIndex]} />
            <BridgeAuction bids={sampleBids} />
            <section style={{ marginTop: "3rem" }}>
                <Hand cardList={hand.join(",")} active={true} flow="horizontal" spacing={2} />

                <div className="max-w-md mx-auto mt-2">
                    <BidTable onBidClick={handleBidClick} lastBid={'1♣'} />
                </div>
                <ButtonExerciseSet
                    handleBack={handleBack}
                    handleCheck={handleCheck}
                    handleNext={handleNext}
                    disabled={true}
                    disabledNext={!history[currentIndex].revealed}
                />
            </section>

            <ButtonToMainPage />
        </>
    );
}

export default App;
