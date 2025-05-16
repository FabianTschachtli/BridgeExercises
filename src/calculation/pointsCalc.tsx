function highCardPoints(cards: string[]) {
    const honneurs = ['J','Q','K','A'];
    let points = 0;
    for (const element of cards) {
        points += honneurs.indexOf(element.substring(0,1)) + 1;
    }
    return points;
}

function highCardAnalyse(cards: string[]) {
    const honneurs = ['J','Q','K','A'];
    const pointDistribution = new Map<string,number>();

    for (const element of cards) {
        const points = honneurs.indexOf(element.substring(0,1)) + 1;
        if (points > 0) {
            const suit = element.substring(1,2);
            pointDistribution.set(suit, (pointDistribution.get(suit) ?? 0) + points);
        }
    }
    return pointDistribution.entries();
}

export {highCardPoints, highCardAnalyse}