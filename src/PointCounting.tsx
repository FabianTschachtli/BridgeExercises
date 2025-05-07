
import './App.css'
import Hand from './Hand.tsx';
import { highCardAnalyse, highCardPoints} from './calculation/pointsCalc.tsx';
import {generateSingleHand} from './bridgehand.js';
import {useState} from "react";

function PointCounting() {

    const [inputText, setInputText] = useState("");
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(0);

    const [hand, setHand] = useState(generateSingleHand());
    const points = highCardPoints(hand);


    const handleBack = () => {

    };
    const handleCheck = () => {
        if (parseInt(inputText) === points) {
            setMessage("Correct!");
            setCountdown(10);

            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setHand(generateSingleHand());
                        setInputText("");
                        setMessage("");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setMessage("False");
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    };
    console.log(points);

    return (
        <div>
            <Hand cardList={hand.join(",")} active={true} flow="horizontal" spacing={2}></Hand>
            <div style={{ margin: "1rem 0" }}>
                <input
                    type="text"
                    placeholder="Enter points..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                        padding: "8px",
                        width: "100%",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "16px"
                    }}
                />
            </div>
            <div style={{ display: "flex" }} className="result-message">
                <div>
                    {message === "False" && (
                        <>
                            <div className="false-message">
                                {message}
                            </div>
                        </>
                    )}
                    {message === "Correct!" && (
                        <>
                            <div className="correct-message">
                                {message}
                            </div>
                            <>
                                <p  style={{ textAlign: 'left' }}>Points: {points}</p>
                                <p  style={{ textAlign: 'left' }}>High card analyse: {highCardAnalyse(hand)}</p>
                            </>
                        </>
                    )}
                    {countdown > 0 && (
                        <div style={{
                            marginTop: '1rem',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#379139',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            boxShadow: '0 0 5px rgba(0,0,0,0.2)'
                        }}>
                            {countdown}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handleBack}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition"
                >
                    Back
                </button>
                <button
                    onClick={handleCheck}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                >
                    Submit
                </button>
            </div>
        </div>
  );}
export default PointCounting
