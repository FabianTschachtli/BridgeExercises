import React from "react";

type HandState = {
    cards: string[];
    revealed: boolean;
    correct: boolean;
};

type ResultMessageProps = {
    currentState: HandState;
    onUpdate: (s: string) => void;
    inputText: string;
}


const ResultMessage: React.FC<ResultMessageProps> = ({currentState, onUpdate, inputText}) => {
    return (

        <div style={{ margin: "1rem 0" }}>
            <input
                type="text"
                placeholder={
                    currentState.revealed
                        ? currentState.correct
                            ? "Correct"
                            : "Incorrect"
                        : "Enter points..."
                }
                value={inputText}
                onChange={(e) => onUpdate(e.target.value)}
                disabled={currentState.revealed}
                className={
                    currentState.revealed
                        ? currentState.correct
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
   )
}
export default ResultMessage;