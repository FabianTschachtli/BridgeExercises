// bridgeHand.js
/*jshint esversion: 6 */

// Define suits and ranks
const suits = ['S', 'H', 'D', 'C'], ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const suitsOrder = new Map([
    ['S',['S', 'H', 'C', 'D']],
    ['H',['H', 'S', 'D', 'C']],
    ['D', ['D', 'S', 'H', 'C']],
    ['C', ['C', 'D', 'H', 'S']]]);

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

function getHand(deck, size) {
    for (let i = deck.length - 1; i >= deck.length-size; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck.slice(deck.length-size, deck.length);
}

function sortCard(a, b) {
    const order = suitsOrder.get('S');
    const suitComp =  order.indexOf(a.substring(a.length-1)) - order.indexOf(b.substring(b.length-1));
    if (suitComp !== 0 ) {
        return suitComp;
    } else {
        return ranks.indexOf(a.substring(0,1)) > ranks.indexOf(b.substring(0,1)) ? -1 : 1;
    }
}

// Deal the cards into 4 hands
function dealHands(deck) {
    const hands = {
        North: [],
        East: [],
        South: [],
        West: []
    };

    const players = Object.keys(hands);
    for (let i = 0; i < deck.length; i++) {
        hands[players[i % 4]].push(deck[i]);
    }

    return hands;
}

// Main function
function generateBridgeHands() {
    const deck = createDeck();
    shuffle(deck);
    const hands = dealHands(deck);

    for (const [player, hand] of Object.entries(hands)) {
        console.log(`${player}: ${hand.join(', ')}`);
    }
    return hands;
}

function generateSingleHand() {
    const deck = createDeck();
    return getHand(deck, 13).sort(sortCard);
}

export {generateSingleHand, generateBridgeHands}
