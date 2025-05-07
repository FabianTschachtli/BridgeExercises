
import './App.css'
import Hand from './Hand.tsx';
import { highCardAnalyse, highCardPoints} from './calculation/pointsCalc.tsx';
import {generateSingleHand} from './bridgehand.js';

function PointCounting() {
    const hand = generateSingleHand();
    const points = highCardPoints(hand);
    return (
        <>
            <Hand cardList={hand.join(",")} active={true} flow="horizontal" spacing={2}></Hand>
            <div>{points}</div>
            <div>{highCardAnalyse(hand)}</div>
        </>
  );}
export default PointCounting
