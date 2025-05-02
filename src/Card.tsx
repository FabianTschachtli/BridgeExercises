
const Card = ({ cardShort, index }: { cardShort: string, index: number }) => {
        function removeCard() {
                console.log("Card " + cardShort + " clicked");
        }

        return (
             (
            <button className={"card " + (index == 0 ? "" : "next")} tabIndex={index} onClick={removeCard}>
                    <img  className={"card " + (index == 0 ? "" : "next")}
                         src={"src/assets/cards/" + cardShort + ".svg"}
                         alt="7 of Spades" />
            </button>
        ))
}

export default Card;
