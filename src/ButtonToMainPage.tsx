import { useNavigate } from "react-router-dom";

export default function ButtonToMainPage() {
    const navigate = useNavigate();
    return (
        <div className="fixed bottom-4 left-4">
            <button
                onClick={() => { navigate("/") }}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
                ⬅ Main page
            </button>
        </div>
    );
}