import React from "react";

type ButtonExerciseSetProps = {
    handleBack: () => void;
    handleCheck: () => void;
    handleNext: () => void;
    disabled: boolean;
};

const ButtonExerciseSet: React.FC<ButtonExerciseSetProps> = ({
                                                                 handleBack,
                                                                 handleCheck,
                                                                 handleNext,
                                                                 disabled,
                                                             }) => {
    return (
        <div className="flex justify-between items-center mt-4 gap-2">
            <button
                onClick={handleBack}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition"
            >
                Back
            </button>
            <button
                onClick={handleCheck}
                disabled={disabled}
                className={`disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 
                     text-white font-semibold py-2 px-4 rounded-lg shadow-md transition`}
            >
                Submit
            </button>
            <button
                onClick={handleNext}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            >
                Next
            </button>
        </div>
    );
};

export default ButtonExerciseSet;
