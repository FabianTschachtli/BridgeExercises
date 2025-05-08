import './PointCounting.css'
import Hand from './Hand.tsx';
import { highCardAnalyse, highCardPoints } from './calculation/pointsCalc.tsx';
import { generateSingleHand } from './bridgehand.js';
import { useState } from "react";

function PointCounting() {
    const [inputText, setInputText] = useState("");


    type HandState = {
        cards: string[],
        revealed: boolean,
        correct: boolean
    };


    const [history, setHistory] = useState<HandState[]>([{
        cards: generateSingleHand(),
        revealed: false,
        correct: false
    }]);


    const [currentIndex, setCurrentIndex] = useState(0);

    const hand = history[currentIndex].cards;
    const points = highCardPoints(hand);


    const correctCount = history.filter(h => h.revealed && h.correct).length;
    const incorrectCount = history.filter(h => h.revealed && !h.correct).length;
    const totalRevealed = correctCount + incorrectCount;
    const total = history.length;
    const correctPercent = (correctCount / total) * 100;
    const incorrectPercent = (incorrectCount / total) * 100;



    const suitMap: Record<string, string> = {
        S: "Spades",
        H: "Hearts",
        D: "Diamonds",
        C: "Clubs"
    };
    const analyseStr = Array.from(highCardAnalyse(hand))
        .map(([suit, points]) => `${suit}${points}`)
        .join('');

    const parsePointSummary = (code: string): string[] =>
        code.match(/([SHDC])(\d)/g)?.map(entry => {
            const suit = entry[0];
            const points = entry.slice(1);
            return `${points} Points in ${suitMap[suit]}`;
        }) || [];

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
            const newHand = {
                cards: generateSingleHand(),
                revealed: false,
                correct: false
            };
            setHistory([...history, newHand]);
            setCurrentIndex(currentIndex + 1);
        }
        setInputText("");
    };

    const handleCheck = () => {
        if (history[currentIndex].revealed) return;

        const updated = [...history];
        updated[currentIndex].revealed = true;

        if (parseInt(inputText) === points) {
            updated[currentIndex].correct = true;
        } else {
            updated[currentIndex].correct = false;
        }

        setHistory(updated);
    };


    return (
        <div>
            <div className="w-full max-w-2xl mb-4">
                <div className="w-full h-4 bg-gray-700 rounded overflow-hidden flex">
                    <div
                        style={{ width: `${correctPercent}%` }}
                        className="bg-green-500 transition-all duration-300"
                    ></div>
                    <div
                        style={{ width: `${incorrectPercent}%` }}
                        className="bg-red-500 transition-all duration-300"
                    ></div>
                </div>

                <div className="flex justify-between text-sm text-white mt-1 font-semibold">
                    <span>✔ {correctCount}</span>
                    <span>Total: {total}</span>
                    <span>❌ {incorrectCount}</span>
                </div>
            </div>

            <section>
                <div className="result-message">
                    <div className="w-full max-w-md flex flex-col items-left" style={{ height: '100px', marginBottom: '1rem' }}>
                        {history[currentIndex].revealed ? (
                            <div style={{ backgroundColor: history[currentIndex].correct ? "darkgreen" : "#8B0000", padding: "20px", borderRadius: "16px" }}>
                                <div className={history[currentIndex].correct ? "correct-message" : "false-message"}>
                                    {history[currentIndex].correct ? "Correct!" : "Incorrect"}
                                </div>
                                <div className="mt-3 text-left space-y-1">
                                    <p className="text-lg font-semibold">Points: {points}</p>
                                    <div className="text-sm text-white">
                                        High card analyse:
                                        <ul className="list-disc list-inside mt-1">
                                            {parsePointSummary(analyseStr).map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ height: '100%', opacity: 0 }}></div>
                        )}
                    </div>
                </div>
            </section>
            <section style={{ marginTop: '8rem' }}>
                <Hand cardList={hand.join(",")} active={true} flow="horizontal" spacing={2} />

                <div style={{ margin: "1rem 0" }}>
                    <input
                        type="text"
                        placeholder={history[currentIndex].revealed
                            ? history[currentIndex].correct
                                ? "Correct"
                                : "Incorrect"
                            : "Enter points..."}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={history[currentIndex].revealed}
                        style={{
                            padding: "8px",
                            width: "100%",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            backgroundColor: history[currentIndex].revealed
                                ? history[currentIndex].correct
                                    ? "#1a3000"
                                    : "#300000"
                                : "#2e2e2e",

                        }}
                    />

                </div>



                <div className="flex justify-between items-center mt-4 gap-2">
                    <button
                        onClick={handleBack}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleCheck}
                        disabled={history[currentIndex].revealed}
                        className={`${
                            history[currentIndex].revealed
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition`}
                    >
                        Submit
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                    >
                        Next
                    </button>
                </div>
            </section>
            <div className="fixed bottom-4 left-4">
                <button
                    onClick={() => window.location.href = "/index.html"}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
                >
                    ⬅ Main page
                </button>
            </div>

        </div>
    );
}

export default PointCounting;
