// Mocha & Chai are used for testing
const expect = require('chai').expect;

// Replace this with const bptfprices = require('bptf-prices'); if used outside of the module directory
const bptfprices = require('../index');

// 
const bptf = new bptfprices({ apiKey: '58b447a30e2cad7d006d878b' });

// Perform the tests
describe('bptf-prices tests', () => {
    // Class constructor test
    describe('instance of constructor', () => {
        // Instance should match class
        it('should be instance of bptf-prices', () => {
            // Expect that the target is an instance of the given constructor
            expect(bptf).to.be.an.instanceof(bptfprices);
        });
    });


    describe('getCurrencies', () => {
        it('should return currency data from Team Fortress 2', (done) => {
            try {
                // Get currency data for Team Fortress 2
                bptf.getCurrencies({ raw: 2 }, (err, data) => {
                    // Error getting currency data
                    if (err) throw err; console.log(err);

                    // The response should have status code 200 (ok),
                    // it should also be an object
                    // and must have a property named error 
                    expect(data).to.be.an('object');
                    expect(data).to.have.property('currencies');
                    expect(data.currencies).to.be.an('array');
                    expect(data.currencies).to.have.length(3);

                    done();
                });
            } catch (error) {
                // Throw the error that was caught 
                throw error;
            }
        });
    });


    describe('getPriceHistory', () => {
        it('should return the price history of an item', (done) => {
            try {
                // Get the price history for a Unique Team Captain
                bptf.getPriceHistory({ item: 'Team Captain', quality: 'Strange' }, (err, item) => {
                    // Error getting the item's price history
                    if (err) throw err;

                    // The response should have status code 200 (ok),
                    // it should also be an object
                    // and must have a property named error 
                    expect(item).to.be.an('object');
                    expect(item).to.have.property('history');
                    expect(item.history).to.be.an('array');

                    done();
                });
            } catch (error) {
                // Throw the error that was caught 
                throw error;
            }
        });
    });


    describe('getPrices', () => {
        it('should return currency data from Team Fortress 2', (done) => {
            try {
                // Perform the getCurrencies request
                bptf.getPrices({ raw: 1, since: 1611752400 }, (err, prices) => {
                    // Error getting prices
                    if (err) throw err;

                    // The response should have status code 200 (ok),
                    // it should also be an object
                    // and must have a property named error 
                    expect(prices).to.be.an('object');
                    expect(prices).to.have.property('items');

                    done();
                });
            } catch (error) {
                // Throw the error that was caught 
                throw error;
            }
        });
    });

    
    describe('getSpecialItems', () => {
        it('should return currency data from Team Fortress 2', (done) => {
            try {
                // Perform the getCurrencies request
                bptf.getSpecialItems({appid: 440 }, (err, items) => {
                    // Error getting Backpack.tf's special items
                    if (err) throw err;

                    // The response should have status code 200 (ok),
                    // it should also be an object
                    // and must have a property named error 
                    expect(items).to.be.an('object');
                    expect(items).to.have.property('response');

                    done();
                });
            } catch (error) {
                // Throw the error that was caught 
                throw error;
            }
        });
    });
});