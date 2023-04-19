// Axios is a promise based HTTP client for Node.js
const axios = require('axios')

/** Wrapper class for the Backpack.tf economy Web API */
class EconomyWrapper {
    // The user's API key stored in a private field
    #apiKey

    /**
     * Constructs a new bptf-prices instance.
     * @param { EconomyOptions } options An object containing valid constructor options.
     * @param { string } options.apiKey A Backpack.tf developer API key.
     */
    constructor({ apiKey = null } = {}) {
        // A Backpack.tf API key is required to make requests
        this.#apiKey = apiKey
    }

    /**
     * (`Private method`) - Make a `GET` request to the `endpoint` parameter.
     * @param { string } endpoint The API endpoint for which to submit the request.
     * @param { void } callback Optional, called when a response is available. If omitted the function returns a promise.
     */
    #GET(endpoint, callback) {
        // Return a promise if no callback is supplied
        return axios.get(endpoint).then(response => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the response data
                callback(null, response.data.response)
            } else {
                // Return the response data
                return response.data.response
            }
        }).catch(error => {
            // The callback parameter must be a function
            if (typeof callback === 'function') {
                // Callback with the caught error
                callback(error, null)
            } else {
                // Throw the error if no callback was supplied
                throw error
            }
        })
    }

    /**
     * Get currency data for Team Fortress 2.
     * @param { GetCurrenciesParameters } params An object of valid arguments for the IGetCurrencies/v1 endpoint.
     * @param { number } params.raw If set, modifies the raw value for the price index objects.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetCurrenciesResponse> | void } An object with Backpack.tf's internal currency data for Team Fortress 2.
     */
    getCurrencies({ raw = 1, callback } = {}) {
        // Type check the raw parameter
        if (typeof raw !== 'number' || [1, 2].indexOf(raw) === -1) {
            throw new Error(`Unexpected value "${raw}" for the "raw" parameter. Expected a numeric integer between 1 and 2.`)
        }

        // Return the response from the IGetCurrencies endpoint
        return this.#GET(`https://backpack.tf/api/IGetCurrencies/v1?raw=${raw}&key=${this.#apiKey}`, callback)
    }

    /**
     * Gets the price history for an item that corresponds to the parameters. If none, returns the price history for The Team Captain.
     * @param { GetPriceHistoryParameters } params An object of valid arguments for the v1 IGetPriceHistory endpoint. All are "optional" and have default values.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { string } params.item The item's base name, defaults to Team Captain.
     * @param { string } params.quality The item's quality property, defaults to Unique.
     * @param { number } params.tradable The item's tradeable state, defaults to Tradable.
     * @param { number } params.craftable The item's craftable state, defaults to Craftable.
     * @param { number } params.priceindex The item's price index as a number.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetPriceHistoryResponse> | void } An object with the price history that correspond to the `item` parameter.
     */
    getPriceHistory({ appid = 440, item = 'Team Captain', quality = 'Unique', tradable = 'Tradable', craftable = 'Craftable', priceindex = 0, callback } = {}) {
        // Type check the appid parameter is a number
        if (typeof appid !== 'number' || appid !== 440) {
            throw new Error(`Unexpected value "${appid}" for the "appid" parameter. Expected a numeric value of 440.`)
        }

        // Type check the item parameter
        if (typeof item !== 'string' || item.length === 0) throw new Error('The item parameter is not a valid string or missing.')

        // Type check the quality parameter
        if (typeof quality !== 'string' || ['Normal', 'Unique', 'Vintage', 'Genuine', 'Strange', 'Unusual', 'Haunted', 'Collector\'s', 'Decorated', 'Community', 'Self-Made', 'Valve'].indexOf(quality) === -1) {
            throw new Error(`Unexpected value "${quality}" for the "quality" parameter. Expected a string for the quality property of the item.`)
        }

        // Type check the tradable parameter
        if (typeof tradable !== 'string' || ['Tradable', 'Non-Tradable'].indexOf(tradable) === -1) {
            throw new Error(`Unexpected value "${tradable}" for the "tradable" parameter. Expected a string of "Tradable" or "Non-Tradable".`)
        }

        // Type check the craftable parameter
        if (typeof craftable !== 'string' || ['Craftable', 'Non-Craftable'].indexOf(craftable) === -1) {
            throw new Error(`Unexpected value "${craftable}" for the "craftable" parameter. Expected a string of "Craftable" or "Non-Craftable".`)
        }

        // Type check the priceindex parameter
        if (typeof priceindex !== 'number') throw new Error('The "priceindex" parameter is not a number or missing.')

        // Return the response from the IGetPriceHistory endpoint
        return this.#GET(`https://backpack.tf/api/IGetPriceHistory/v1?appid=${appid}&item=${item}&quality=${quality}&tradable=${tradable}&craftable=${craftable}&priceindex=${priceindex}&key=${this.#apiKey}`, callback)
    }

    /**
     * Gets the price schema. Won't work for games that aren't TF2, with the response being cached globally for 900 seconds.
     * @param { GetPricesParameters } params An object of valid arguments for the IGetSpecialItems endpoint. All are optional and have default values.
     * @param { number } params.raw If set, modifies the raw value for the price index objects.
     * @param { number } params.since If set, only returns prices that have a last_update value greater than or equal to this Unix time.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetPricesResponse> | void } An object with the Team Fortress 2 price schema.
     */
    getPrices({ raw = 1, since = 1607000400, callback } = {}) {
        // Type check the raw parameter
        if (typeof raw !== 'number' || [1, 2].indexOf(raw) === -1) {
            throw new Error(`Unexpected value "${raw}" for the "raw" parameter. Expected a numeric integer between 1 and 2.`)
        }
        
        // Type check the since parameter
        if (typeof since !== 'number' || !(since > 0)) {
            throw new Error('The "since" parameter is an invalid number or missing.')
        }

        // Return the response from the IGetPrices endpoint
        return this.#GET(`https://backpack.tf/api/IGetPrices/v4?raw=${raw}&since=${since}&key=${this.#apiKey}`, callback)
    }

    /**
     * Get Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
     * @param { GetSpecialItemsParameters } params An object of valid arguments for the IGetPrices endpoint.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetSpecialItemsResponse> | void } An object with Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
    */
    getSpecialItems({ appid = 440, callback } = {}) {
        // Type check the appid parameter and ensure that the id is valid
        if (typeof appid !== 'number' || appid !== 440) {
            throw new Error(`Unexpected value "${appid}" for the "appid" parameter. Expected a numeric value of 440.`)
        }
        
        // Return the response from the v1 IGetSpecialItems endpoint
        return this.#GET(`https://backpack.tf/api/IGetSpecialItems/v1?appid=${appid}&key=${this.#apiKey}`, callback)
    }
}

// Export the EconomyWrapper class
module.exports = EconomyWrapper
