// bridgehand.js
/*jshint esversion: 6 */

// Define suits and ranks
const suits = ['S', 'H', 'D', 'C'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const suitsOrder = new Map([
    ['S', ['S', 'H', 'C', 'D']],
    ['H', ['H', 'S', 'D', 'C']],
    ['D', ['D', 'S', 'H', 'C']],
    ['C', ['C', 'D', 'H', 'S']],
]);

// Create the deck
function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`${rank}${suit}`);
        }
    }
    return deck;
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Draw a single hand of given size
function getHand(deck, size) {
    for (let i = deck.length - 1; i >= deck.length - size; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck.slice(deck.length - size).sort(sortCard);
}

// Sort cards within a hand
function sortCard(a, b) {
    const order = suitsOrder.get('S');
    const suitComp = order.indexOf(a.slice(-1)) - order.indexOf(b.slice(-1));
    if (suitComp !== 0) {
        return suitComp;
    } else {
        return ranks.indexOf(a[0]) > ranks.indexOf(b[0]) ? -1 : 1;
    }
}

// Deal the deck into four hands
function dealHands(deck) {
    const hands = { North: [], East: [], South: [], West: [] };
    const players = Object.keys(hands);
    for (let i = 0; i < deck.length; i++) {
        hands[players[i % 4]].push(deck[i]);
    }
    // Sort each hand
    for (const player of players) {
        hands[player].sort(sortCard);
    }
    return hands;
}

// Main functions

function generateBridgeHands() {
    const deck = createDeck();
    shuffle(deck);
    const hands = dealHands(deck);
    console.log(
        Object.entries(hands)
            .map(([p, h]) => `${p}: ${h.join(', ')}`)
            .join('\n')
    );
    return hands;
}

function generateSingleHand() {
    const deck = createDeck();
    return getHand(deck, 13);
}

export { generateSingleHand, generateBridgeHands };
