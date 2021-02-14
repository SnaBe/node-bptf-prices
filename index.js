// Axios is a promise based HTTP client for Node.js
const axios = require('axios');

// Wrapper class for the Backpack.tf economy Web API
class EconomyWrapper {
    /**
     * Constructs a new bptf-prices instance.
     * @param { Object } options An object containing valid constructor options.
     */
    constructor(options) {
        // A Backpack.tf API key is required to make requests
        this.apiKey = options && options.apiKey || null;
    }

    /**
     * (`Private method`) - Make a `GET` request to the `endpoint` parameter.
     * @param { String } endpoint The API endpoint for which to submit the request.
     * @param { Function } callback Optional, called when a response is available. If omitted the function returns a promise. 
     */
    #GET(endpoint, callback) {
        // Return a promise if no callback is supplied
        return axios.get(endpoint).then(response => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the response data
                callback(null, response.data.response);
            }
            
            // Return the response data
            return response.data.response;
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error);
            } else {
                // Throw the error if no callback was supplied
                throw error;
            }
        });
    }

    /**
     * Get the requests parameters. 
     * @param { Array } args The parameters to parse on for a GET request. 
     */
    #params(args) {
        // Get the request parameters
        const params = args.shift();

        // Check if a callback was supplied, null will result in a promise
        const callback = (typeof args[args.length - 1] === 'function') ? args.pop() : null;

        // The parameters should be an object
        if (typeof params !== 'object') throw new Error('The request parameters must be an object.');

        // Return the request parameters and callback
        return { params, callback };
    }

    /**
     * Get currency data for Team Fortress 2.
     * @param { ...any } args An object of valid arguments for the v1 IGetCurrencies endpoint. 
     */
    getCurrencies(...args) {
        // Get the request parameters and callback
        const { params, callback } = this.#params(args);

        // If the price index should have a high or averate raw value
        params.raw = params.raw || 1;

        // Return the response from the IGetCurrencies endpoint
        return this.#GET(`https://backpack.tf/api/IGetCurrencies/v1?raw=${params.raw}&key=${this.apiKey}`, callback);
    }

    /**
     * Gets the price history for an item that corresponds to the parameters. If none, returns the price history for Mann Co. Keys.
     * @param { ...any } args An object of valid arguments for the v1 IGetPriceHistory endpoint. 
     */
    getPriceHistory(...args) {
        // Get the request parameters and callback
        const { params, callback } = this.#params(args);

        // Assign the appid the supplied value, defaults to 440 (Appid for Team Fortress 2)
        params.appid = params.appid || this.EAppIds.TF2;
        
        // The item's base name.
        params.item = params.item || 'Mann Co. Supply Crate Key';

        // The item's quality, defaults to Unique
        params.quality = params.quality || 'Unique';

        // The item's tradeable state, defaults to Tradable
        params.tradable = params.tradable || 'Tradable';

        // The item's craftable state, defaults to Craftable
        params.craftable = params.craftable || 'Craftable';

        // The item's price index
        params.priceindex = params.priceindex || 0;

        // Return the response from the IGetPriceHistory endpoint
        return this.#GET(`https://backpack.tf/api/IGetPriceHistory/v1?appid=${params.appid}&item=${params.item}&quality=${params.quality}&tradable=${params.tradable}&craftable=${params.craftable}&priceindex=${params.priceindex}&key=${this.apiKey}`, callback);
    }

    /**
     * Gets the price schema. Won't work for games that aren't TF2 with the response being cached globally for 900 seconds. 
     * @param { ...any } args An object of valid arguments for the IGetSpecialItems endpoint. 
     */
    getPrices(...args) {
        // Get the request parameters and callback
        const { params, callback } = this.#params(args);

        // If the price index should have a high or averate raw value
        params.raw = params.raw || 1;
       
        // Sets the provided unix time or gets the current one
        params.since = params.since || Math.round((new Date()).getTime() / 1000);
        
        // Return the response from the IGetPrices endpoint
        return this.#GET(`https://backpack.tf/api/IGetPrices/v4?raw=${params.raw}&since=${params.since}&key=${this.apiKey}`, callback);
    }

    /**
     * Get Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
     * @param {...any} args An object of valid arguments for the v4 IGetPrices endpoint. 
     */
    getSpecialItems(...args) {
        // Get the request parameters and callback
        const { params, callback } = this.#params(args);

        // The appid the supplied value, defaults to 440 (Team Fortress 2)
        params.appid = params.appid || '440';

        // Return the response from the v1 IGetSpecialItems endpoint
        return this.#GET(`https://backpack.tf/api/IGetSpecialItems/v1?appid=${params.appid}&key=${this.apiKey}`, callback);
    }
}

// Export the EconomyWrapper class
module.exports = EconomyWrapper;

const prices = new EconomyWrapper({ apiKey: '58b447a30e2cad7d006d878b' });

(async () => {
    try {
        const res = await prices.getSpecialItems({ appid: prices.EAppIds.TF2 });

        console.log(res);

        /*prices.runExample({ appid: prices.EAppIds.TF2 }, (err, history) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(history);
            }
        }); */
    } catch (error) {
        console.error(error.message);
    }
})();