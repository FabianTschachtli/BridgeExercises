import React, {JSX} from "react";

type HandState = {
    cards: string[];
    revealed: boolean;
    correct: boolean;
};

type ResultMessageProps = {
    currentState: HandState;
    solution: string;
    explanation?: JSX.Element;
}


const ResultMessage: React.FC<ResultMessageProps> = ({currentState, solution, explanation}) => {
    return (

    <section>
        <div className="result-message">
            <div
                className="w-full max-w-md flex flex-col items-left"
                style={{minHeight: "160px", marginBottom: "1rem"}}
            >
                {currentState.revealed ? (
                    <div
                        className={`${
                            currentState.correct ? "bg-green-900" : "bg-red-800"
                        }`}
                        style={{padding: "20px", borderRadius: "16px"}}
                    >
                        <div
                            className={`${
                                currentState.correct
                                    ? "bg-green-800 correct-message"
                                    : "bg-red-700 false-message"
                            }`}
                        >
                            {currentState.correct ? "Correct!" : "Incorrect"}
                        </div>
                        <div className="mt-3 text-left space-y-1">
                            <p className="text-lg font-semibold">{solution}</p>
                            <div className="text-sm text-white">
                                {explanation}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{height: "100%", opacity: 0}}/>
                )}
            </div>
        </div>
    </section>
)
}
export default ResultMessage;