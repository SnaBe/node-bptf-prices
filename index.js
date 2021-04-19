// Axios is a promise based HTTP client for Node.js
const axios = require('axios');

// Wrapper class for the Backpack.tf economy Web API
class EconomyWrapper {
    // The user's API key stored in a private field
    #apiKey;
    /**
     * Constructs a new bptf-prices instance.
     * @param { Object } options An object containing valid constructor options.
     * @param { String } options.apiKey A Backpack.tf API key.
     */
    constructor(options) {
        // A Backpack.tf API key is required to make requests
        this.#apiKey = options && options.apiKey || null;
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
     * @param { Object } params An object of valid arguments for the IGetCurrencies/v1 endpoint. 
     * @param { Number } params.raw If set, modifies the raw value for the price index objects.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Object } An object with Backpack.tf's internal currency data for Team Fortress 2.
     */
    getCurrencies({ raw = 1, callback } = {}) {
        // Return the response from the IGetCurrencies endpoint
        return this.#GET(`https://backpack.tf/api/IGetCurrencies/v1?raw=${raw}&key=${this.#apiKey}`, callback);
    }

    /**
     * Gets the price history for an item that corresponds to the parameters. If none, returns the price history for The Team Captain.
     * @param { Object } params An object of valid arguments for the v1 IGetPriceHistory endpoint. All are "optional" and have default values.
     * @param { Number } params.appid The appid of the item, defaults 440 (Team Fortress 2).
     * @param { String } params.item The item's base name, defaults to Team Captain
     * @param { String } params.quality The item's quality property, defaults to Unique.
     * @param { Number } params.tradable The item's tradeable state, defaults to Tradable.
     * @param { Number } params.craftable The item's craftable state, defaults to Craftable.
     * @param { Number } params.priceindex The item's price index as a number.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Object } An object with the price history that correspond to the `item` parameter.
     */
    getPriceHistory({ appid = 440, item = 'Team Captain', quality = 'Unique', tradable = 'Tradable', craftable = 'Craftable', priceindex = 0, callback } = {}) {
        // Return the response from the IGetPriceHistory endpoint
        return this.#GET(`https://backpack.tf/api/IGetPriceHistory/v1?appid=${appid}&item=${item}&quality=${quality}&tradable=${tradable}&craftable=${craftable}&priceindex=${priceindex}&key=${this.#apiKey}`, callback);
    }

    /**
     * Gets the price schema. Won't work for games that aren't TF2, with the response being cached globally for 900 seconds. 
     * @param { Object } params An object of valid arguments for the IGetSpecialItems endpoint. All are optional and have default values.
     * @param { Number } params.raw If set, modifies the raw value for the price index objects.
     * @param { Number } params.since If set, only returns prices that have a last_update value greater than or equal to this UNIX time.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Object } An object with the Team Fortress 2 price schema.
     */
    getPrices({ raw = 1, since = 1607000400, callback } = {}) {        
        // Return the response from the IGetPrices endpoint
        return this.#GET(`https://backpack.tf/api/IGetPrices/v4?raw=${raw}&since=${since}&key=${this.#apiKey}`, callback);
    }

    /**
     * Get Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
     * @param { Object } params An object of valid arguments for the IGetPrices endpoint. 
     * @param { Number } params.appid The appid of the item, defaults 440 (Team Fortress 2).
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Object } An object with Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
    */
    getSpecialItems({ appid = 440, callback } = {}) {
        console.log(appid);
        // Return the response from the v1 IGetSpecialItems endpoint
        return this.#GET(`https://backpack.tf/api/IGetSpecialItems/v1?appid=${appid}&key=${this.#apiKey}`, callback);
    }
}

// Export the EconomyWrapper class
module.exports = EconomyWrapper;