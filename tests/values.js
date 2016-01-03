"use strict";
const hamt = require('../hamt');
const assert = require('chai').assert;

describe('values', () => {
    it('should return empty for empty map', () => {
        assert.deepEqual([], hamt.values(hamt.empty));
    });
    
    it('should return single key for single element map', () => {
        assert.deepEqual([3], hamt.values(hamt.set('a', 3, hamt.empty)));
        assert.deepEqual([5], hamt.values(hamt.set('b', 5, hamt.empty)));
    });
    
    it('should return all values for collision', () => {
        const h1 = hamt.setHash(0, 'b', 5, hamt.setHash(0, 'a', 3, hamt.empty));
        assert.sameMembers([5, 3], hamt.values(h1));
    });
    
    it('should return duplicate values', () => {
        const h = hamt.set('b', 3, hamt.set('a', 3, hamt.empty));
        assert.deepEqual([3, 3], hamt.values(h));
    });
    
    it('return correct values while items are added', () => {
        const insert = [
            "n", "U", "p", "^", "h", "w", "W", "x", "S", "f", "H", "m", "g",
            "l", "b", "_", "V", "Z", "G", "o", "F", "Q", "a", "k", "j", "r",
            "B", "A", "y", "\\", "R", "D", "i", "c", "]", "C", "[", "e", "s",
            "t", "J", "E", "q", "v", "M", "T", "N", "L", "K", "Y", "d", "P",
            "u", "I", "O", "`", "X"];
    
        let h = hamt.empty;
        insert.forEach(x => {
            h = hamt.set(x, x, h);
        });
    
        assert.sameMembers(insert, hamt.values(h));
    });
});

