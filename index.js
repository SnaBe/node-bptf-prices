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
     * Get currency data for Team Fortress 2.
     * @param { Number } raw 
     * @param { Function } callback Optional, called when a response is available. If omitted the function returns a promise.
     */
    getCurrencies(raw, callback) {
        // Return the response from the IGetCurrencies endpoint
        return this.#GET(`https://backpack.tf/api/IGetCurrencies/v1?raw=${raw}&key=${this.apiKey}`, callback);
    }

    /**
     * Gets the price history for an item that corresponds to the parameters.
     * @param { Number } appid The item's appid.
     * @param { String } item The item's base name.
     * @param { String } quality The item's quality. 
     * @param { String | Number } tradable The item's tradable state. Tradable, Non-Tradable, 1, 0
     * @param { String | Number } craftable The item's craftable state. Craftable, Non-Craftable, 1, 0
     * @param { Number } priceindex Priceindex.  
     * @param { Function } callback Optional, called when a response is available. If omitted the function returns a promise. 
     */
    getPriceHistory(appid, item, quality, tradable, craftable, priceindex, callback) {
        // Return the response from the IGetPriceHistory endpoint
        return this.#GET(`https://backpack.tf/api/IGetPriceHistory/v1?appid=${appid}&item=${item}&quality=${quality}&tradable=${tradable}&craftable=${craftable}&priceindex=${priceindex}&key=${this.apiKey}`, callback);
    }

    /**
     * Get price schema. Won't work for games that aren't TF2. The response from this API is cached globally for 900 seconds. 
     * @param { Number } raw 
     * @param { Number } since If set, returns prices that have a `last_update` value greater than or equal to this UNIX time.
     * @param { Function } callback Optional, called when a response is available. If omitted the function returns a promise.
     */
    getPrices(raw, since, callback) {
        // Return the response from the IGetPrices endpoint
        return this.#GET(`https://backpack.tf/api/IGetPrices/v4?raw=${raw}&since=${since}&key=${this.apiKey}`, callback);
    }

    /**
     * Get Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
     * @param { Number } appid The item placeholder's appid.
     * @param { Function } callback Optional, called when a response is available. If omitted the function returns a promise.
     */
    getSpecialItems(appid, callback) {
        // Return the response from the IGetSpecialItems endpoint
        return this.#GET(`https://backpack.tf/api/IGetSpecialItems/v1?appid=${appid}&key=${this.apiKey}`, callback);
    }
}

// Export the EconomyWrapper class
module.exports = EconomyWrapper;

const prices = new EconomyWrapper({ apiKey: '58b447a30e2cad7d006d878b' });

(async () => {
    try {
        const res = await prices.getCurrencies(2);

        console.log(res.currencies.keys);
    } catch (error) {
        console.error(error.message);
    }
})();