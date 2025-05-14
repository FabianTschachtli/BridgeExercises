import { describe, it, expect } from 'vitest'
import parsePbnHands from "./pbnParser.js";

describe('Testing the conversion from pbn hand notation to card list', () => {
    it('Test with all cards downwards in four suits', () => {
        const hand = parsePbnHands("AKQ.JT9.87.65432")[0]
        expect(hand.length).toBe(13);
        expect(hand.join(',')).toBe("AS,KS,QS,JH,TH,9H,8D,7D,6C,5C,4C,3C,2C");
    })
    it('Test with all cards downwards in just two suits', () => {
        const hand = parsePbnHands("..765432.AKQJT98")[0]
        expect(hand.length).toBe(13);
        expect(hand.join(',')).toBe("7D,6D,5D,4D,3D,2D,AC,KC,QC,JC,TC,9C,8C");
    })
})