const assert = require("assert");
const diceSugar = require('../diceFormat')
describe('diceSugar', function() {
    it('should format basic dice', function() {
        assert.equal(diceSugar([1,2,3,4,5,6], 4, 0), "[1, 2, 3, **4**, **5**, **6**]");
        assert.equal(diceSugar([1,2,3,4,5,6], 3, 0), "[1, 2, **3**, **4**, **5**, **6**]");
        assert.equal(diceSugar([1,2,3,4,5,6], 2, 0), "[1, **2**, **3**, **4**, **5**, **6**]");
    });
    it('should handle open 6\'s', function open() {
        assert.equal(diceSugar([6,1], 4, 1), "[__**6, 1**__]")
    })
    it('should handle open 1\'s', function open() {
        assert.equal(diceSugar([1,2], 4, 2), "[~~1, 2~~]")
    })
});