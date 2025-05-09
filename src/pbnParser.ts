function parsePbnHands(pbnHands: string): string[][] {
    let countSuit: number = 0;
    let countHand: number = 0;
    const validCards = "AKQJT98765432";
    const allCards = pbnHands.split("");

    const hand1: string[] = [];
    const hand2: string[] = [];
    const hand3: string[] = [];
    const hand4: string[] = [];

    const allHands: string[][] = [hand1, hand2, hand3, hand4];

    for (const character of allCards) {

        if (!validCards.includes(character.toUpperCase()) &&
            character !== "." &&
            character !== " ") {
            continue;
        }

        if (character === ".") {
            countSuit++;
            continue;
        }

        if (character === " ") {
            if (countHand >= 3 || countHand < 0) {
                countHand = 0;
                countSuit = 0;
                continue;
            }
            countHand++;
            countSuit = 0;
            continue;
        }

        switch (countSuit) {
            case 0:
                allHands[countHand].push("S" + character);
                break;
            case 1:
                allHands[countHand].push("H" + character);
                break;
            case 2:
                allHands[countHand].push("D" + character);
                break;
            case 3:
                allHands[countHand].push("C" + character);
                break;
            default:
                break;
        }
    }

    return allHands;

}

export default parsePbnHands;