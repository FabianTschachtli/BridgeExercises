import React from "react";


type ProgressbarProps = {
    correctPercent: number;
    incorrectPercent: number;
    correctCount: number;
    total: number;
    incorrectCount: number;
}


const ProgressBar: React.FC<ProgressbarProps> = ({correctCount, incorrectCount, correctPercent, incorrectPercent, total}) => {
    return (
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
    );
};

export default ProgressBar;