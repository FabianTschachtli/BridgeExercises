import './cards.css';
import CardDisplay from './CardDisplay.tsx';
import {ReactNode} from "react";
const Hand: ({cardList}: { cardList: string, active:boolean, flow: string, spacing: number }) => ReactNode = ({ cardList, active, flow, spacing }) => {
    // You can now safely use cardList as a string
    const cards = cardList.split(",");


    return (
        <p id="firstHand" className={(active?'active-hand ':'') + calculateClasses(flow, spacing)} data-hand="flow: horizontal; cards: 7S,QH,TH,8H,2H,JC,9C,8C,7C,3C,2C,JD,9D">
            {cards.map((card: string, i) => (
            <CardDisplay cardShort={card} index={i} key={card}/>
        ))}
        </p>
    )

    function calculateClasses( flow: string, spacing: number ) {

        if (flow === 'vertical' && spacing >= 1.0) {
            return('vhand');
        } else if (flow === 'horizontal' && spacing >= 1.0) {
            return('hhand');
        } else if (flow === 'vertical') {
            return('vhand-compact');
        } else {
            return('hhand-compact');
        }
    }

}

//         console.log(options.cards);
//
//         addCardImages($hand, options.cards);
//
//         cards = $hand.find('img.card');
//         if (cards.length === 0) {
//             return;
//         }
//         if (options.width) {
//             cards.width(options.width);
//         }
//         width = options.width || cards[0].clientWidth || 70; // hack: for a hidden hand
//         height = cards[0].clientHeight || Math.floor(width * 1.4); // hack: for a hidden hand
//         if (options.flow === 'vertical' && options.spacing < 1.0) {
//             cards.slice(1).css('margin-top', -height * (1.0 - options.spacing));
//             cards.slice(1).css('margin-left', 0);
//         } else if (options.flow === 'horizontal' && options.spacing < 1.0) {
//             cards.slice(1).css('margin-left', -width * (1.0 - options.spacing));
//             cards.slice(1).css('margin-top', 0);
//         }
//     }
// ,


export default Hand;