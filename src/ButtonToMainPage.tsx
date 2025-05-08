
export default function ButtonToMainPage() {
    return (
        <div className="fixed bottom-4 left-4">
            <button
                onClick={() => window.location.href = "/index.html"}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
                ⬅ Main page
            </button>
        </div>
    );
}