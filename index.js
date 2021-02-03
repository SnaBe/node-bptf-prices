const axios = require('axios');

class EconomyWrapper {
    constructor(options) {
        this.apiKey = options && options.apiKey || null;
    }

    /**
     * Get currency data for Team Fortress 2.
     * @param { Number } raw If set to 1, adds a value_raw to the priceindex objects which represents the value of the item in the lowest currency without rounding. If a high value is set, the raw value will be an average between the low and high value. Setting raw to 2 prevents this behaviour by adding a new field, value_raw_high.
     * @param { Function } callback Optional parameter. Called when a response is available. 
     */
    getCurrencies(raw, callback) {
        return axios.get(`https://backpack.tf/api/IGetCurrencies/v1?raw=${raw}&key=${this.apiKey}`).then(response => {
            if (typeof callback === 'function') {
                callback(null, response.data.response);
            }
            
            return response.data.response;
        }).catch(error => {
            if (typeof callback === 'function') {
                callback(error);
            } else {
                throw error;
            }
        });
    }

    /**
     * Gets the price history for an item that corresponds to the parameters.
     * @param { String } appid The Steam application ID of the game for which you want the price history.
     * @param { String } item 
     * @param { String } quality 
     * @param { String } tradable 
     * @param { String } craftable 
     * @param { String } priceindex 
     * @param { Function } callback Optional parameter. Called when a response object is available. 
     */
    getPriceHistory(appid, item, quality, tradable, craftable, priceindex, callback) {
        return axios.get(`https://backpack.tf/api/IGetPriceHistory/v1?appid=${appid}&item=${item}&quality=${quality}&tradable=${tradable}&craftable=${craftable}&priceindex=${priceindex}&key=${this.apiKey}`).then(response => {
            if (typeof callback === 'function') {
                callback(null, response.data.response);
            }

            return response.data.response;
        }).catch(error => {
            if (typeof callback === 'function') {
                callback(error);
            } else {
                throw error;
            }
        });
    }

    /**
     * Get price schema. Won't work for games that aren't TF2. The response from this API is cached globally for 900 seconds. 
     * @param { Number } raw 
     * @param { Number } since If set, returns prices that have a `last_update` value greater than or equal to this UNIX time.
     * @param { Function } callback Optional parameter. Called when a response is available. 
     */
    getPrices(raw, since, callback) {
        return axios.get(`https://backpack.tf/api/IGetPrices/v4?raw=${raw}&since=${since}&key=${this.apiKey}`).then(response => {
            if (typeof callback === 'function') {
                callback(null, response.data.response);
            }

            return response.data.response;
        }).catch(error => {
            if (typeof callback === 'function') {
                callback(error);
            } else {
                throw error;
            }
        });
    }

    /**
     * Get Backpack.tf's internal item placeholders that corresponds to the `appid` parameter.
     * @param { Number } appid 
     * @param { Function } callback Optional parameter, if omitted returns a promise. Called when a response is available. 
     */
    getSpecialItems(appid, callback) {
        return axios.get(`https://backpack.tf/api/IGetSpecialItems/v1?appid=${appid}&key=${this.apiKey}`).then(response => {
            if (typeof callback === 'function') {
                callback(null, response.data.response);
            }

            return response.data.response;
        });
    }
}

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