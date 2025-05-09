function parsePbnHands(pbnHands: string): string[][] {
    let countSuit: number = 0;
    let countHand: number = 0;
    const validCards = "AKQJT98765432";
    const suits = ['S', 'H', 'D', 'C'];
    const allHands: string[][] = [];

    pbnHands.split(" ").forEach((hand:string) => {
        allHands.push([]);
        hand.split(".").forEach((suit:string) => {
            suit.split("")
                .map((symbol:string) => symbol.toUpperCase())
                .filter((symbol:string) => validCards.includes(symbol))
                .forEach((symbol:string) => {
                    allHands[countHand].push(symbol + suits[countSuit]);
                });
            countSuit++;
        })
        countHand++;
        countSuit = 0;
    })
    return allHands;
}

export default parsePbnHands;