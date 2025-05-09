import { useState } from "react";
import "./PointCounting.css";
import Hand from "./Hand";
import { highCardAnalyse, highCardPoints } from "./calculation/pointsCalc";
import { generateSingleHand } from "./bridgehand";
import ButtonToMainPage from "./ButtonToMainPage";
import ButtonExerciseSet from "./ButtonExerciseSet";
import Progressbar from "./Progressbar";

function PointCounting() {
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

    return (
        <div>
            <Progressbar
                correctPercent={correctPercent}
                incorrectPercent={incorrectPercent}
                correctCount={correctCount}
                total={total}
                incorrectCount={incorrectCount}
            />

            <section>
                <div className="result-message">
                    <div
                        className="w-full max-w-md flex flex-col items-left"
                        style={{ height: "100px", marginBottom: "1rem" }}
                    >
                        {history[currentIndex].revealed ? (
                            <div
                                className={`${
                                    history[currentIndex].correct ? "bg-green-900" : "bg-red-800"
                                }`}
                                style={{ padding: "20px", borderRadius: "16px" }}
                            >
                                <div
                                    className={`${
                                        history[currentIndex].correct
                                            ? "bg-green-800 correct-message"
                                            : "bg-red-700 false-message"
                                    }`}
                                >
                                    {history[currentIndex].correct ? "Correct!" : "Incorrect"}
                                </div>
                                <div className="mt-3 text-left space-y-1">
                                    <p className="text-lg font-semibold">Points: {points}</p>
                                    <div className="text-sm text-white">
                                        High card analysis:
                                        <ul className="list-disc list-inside mt-1">
                                            {parsePointSummary(analyseStr).map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ height: "100%", opacity: 0 }} />
                        )}
                    </div>
                </div>
            </section>

            <section style={{ marginTop: "8rem" }}>
                <Hand cardList={hand.join(",")} active={true} flow="horizontal" spacing={2} />

                <div style={{ margin: "1rem 0" }}>
                    <input
                        type="text"
                        placeholder={
                            history[currentIndex].revealed
                                ? history[currentIndex].correct
                                    ? "Correct"
                                    : "Incorrect"
                                : "Enter points..."
                        }
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={history[currentIndex].revealed}
                        className={
                            history[currentIndex].revealed
                                ? history[currentIndex].correct
                                    ? "bg-green-800"
                                    : "bg-red-800"
                                : ""
                        }
                        style={{
                            padding: "8px",
                            width: "100%",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                        }}
                    />
                </div>

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
