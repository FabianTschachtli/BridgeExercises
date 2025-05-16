import {JSX, useState} from "react";
import "../../css/PointCounting.css";
import Hand from "../organisms/Hand.tsx";
import { highCardAnalyse, highCardPoints } from "../../calculation/pointsCalc.tsx";
import { generateSingleHand } from "../../calculation/bridgehand";
import ButtonToMainPage from "../atoms/ButtonToMainPage.tsx";
import ButtonExerciseSet from "../organisms/ButtonExerciseSet.tsx";
import ResultMessage from "../molecules/ResultMessage.tsx";
import Progressbar from "../organisms/Progressbar.tsx";
import ResultInputText from "../molecules/ResultInputText.tsx";

function PointCounting() {

    document.body.classList.add('exercise');
    document.body.classList.remove('landingpage');

    // History of hands with reveal state
    type HandState = {
        cards: string[];
        revealed: boolean;
        correct: boolean;
    };

    // State hooks
    const [inputText, setInputText] = useState("");
    const [history, setHistory] = useState<HandState[]>([
        { cards: generateSingleHand(), revealed: false, correct: false },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Current hand and points
    const hand = history[currentIndex].cards;
    const points = highCardPoints(hand);

    // Progress stats
    const correctCount = history.filter((h) => h.revealed && h.correct).length;
    const incorrectCount = history.filter((h) => h.revealed && !h.correct).length;
    const total = history.length;
    const correctPercent = (correctCount / total) * 100;
    const incorrectPercent = (incorrectCount / total) * 100;

    // Helper to format analysis
    const suitMap: Record<string, string> = {
        S: "Spades",
        H: "Hearts",
        D: "Diamonds",
        C: "Clubs",
    };
    const analyseStr = Array.from(highCardAnalyse(hand))
        .map(([suit, pts]) => `${suit}${pts}`)
        .join("");
    const parsePointSummary = (code: string): string[] =>
        code.match(/([SHDC])(\d)/g)?.map((entry) => {
            const suit = entry[0];
            const pts = entry.slice(1);
            return `${pts} Points in ${suitMap[suit]}`;
        }) || [];

    // Handlers
    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setInputText("");
        }
    };
    const handleNext = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const newHand = { cards: generateSingleHand(), revealed: false, correct: false };
            setHistory([...history, newHand]);
            setCurrentIndex(currentIndex + 1);
        }
        setInputText("");
    };
    const handleCheck = () => {
        if (history[currentIndex].revealed) return;
        const updated = [...history];
        updated[currentIndex].revealed = true;
        updated[currentIndex].correct = parseInt(inputText) === points;
        setHistory(updated);
    };
    function resultAnalyse(): JSX.Element {
        return(
            <>High card analysis:
                <ul className="list-disc list-inside mt-1">
                    {parsePointSummary(analyseStr).map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul></>);
    }

    return (
        <div>
            <Progressbar
                correctPercent={correctPercent}
                incorrectPercent={incorrectPercent}
                correctCount={correctCount}
                total={total}
                incorrectCount={incorrectCount}
            />

            <ResultMessage solution={"Points: " + points} explanation={resultAnalyse()} currentState={history[currentIndex]} />

            <section style={{ marginTop: "2rem" }}>
                <Hand cardList={hand.join(",")} active={true} flow="horizontal" spacing={2} />

                <ResultInputText onUpdate={setInputText} inputText={inputText} currentState={history[currentIndex]} />
                <ButtonExerciseSet
                    handleBack={handleBack}
                    handleCheck={handleCheck}
                    handleNext={handleNext}
                    disabled={history[currentIndex].revealed || inputText.length === 0}
                    disabledNext={!history[currentIndex].revealed}
                />
            </section>

            <ButtonToMainPage />
        </div>
    );
}

export default PointCounting;
