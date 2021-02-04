// Mocha & Chai are used for testing
const expect = require('chai').expect;

// Replace this with const bptfprices = require('bptf-prices'); if used outside of the module directory
const bptfprices = require('../index');

// Perform the tests
describe('bptf-prices tests', () => {
    describe('instance of constructor', () => {
        it('should be instance of bptf-prices', () => {
            expect(new bptfprices({ apiKey: process.argv[2] })).to.be.an.instanceof(bptfprices);
        });
    });

    describe('getCurrencies', () => {
        it('should return currency data from Team Fortress 2', () => {
            

            try {
                const bptf = new bptfprices({ apiKey: process.argv[2] });

                const res = bptf
            } catch (error) {
                throw error;
            }
        });
    });

    describe
});