/**
 * Wrapper class for the Backpack.tf economy Web API.
 */
export declare class EconomyWrapper {
    /**
     * Constructs a new bptf-prices instance.
     * @param { any } options An object containing valid constructor options.
     * @param { string } options.apiKey A Backpack.tf developer API key.
     */
    constructor(options: any);
    /**
     * Get currency data for Team Fortress 2.
     * @param { any } params An object of valid arguments for the IGetCurrencies/v1 endpoint.
     * @param { number } params.raw If set, modifies the raw value for the price index objects.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<any> | Function } An object with Backpack.tf's internal currency data for Team Fortress 2.
     */
    getCurrencies({ raw, callback }?: any): Promise<any> | Function;
    /**
     * Gets the price history for an item that corresponds to the parameters. If none, returns the price history for The Team Captain.
     * @param { any } params An object of valid arguments for the v1 IGetPriceHistory endpoint. All are "optional" and have default values.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { string } params.item The item's base name, defaults to Team Captain
     * @param { string } params.quality The item's quality property, defaults to Unique.
     * @param { number } params.tradable The item's tradeable state, defaults to Tradable.
     * @param { number } params.craftable The item's craftable state, defaults to Craftable.
     * @param { number } params.priceindex The item's price index as a number.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<any> | Function } An object with the price history that correspond to the `item` parameter.
     */
    getPriceHistory({ appid, item, quality, tradable, craftable, priceindex, callback }?: any): Promise<any> | Function;
    /**
     * Gets the price schema. Won't work for games that aren't TF2, with the response being cached globally for 900 seconds.
     * @param { any } params An object of valid arguments for the IGetSpecialItems endpoint. All are optional and have default values.
     * @param { number } params.raw If set, modifies the raw value for the price index objects.
     * @param { number } params.since If set, only returns prices that have a last_update value greater than or equal to this UNIX time.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<any> | Function } An object with the Team Fortress 2 price schema.
     */
    getPrices({ raw, since, callback }?: any): Promise<any> | Function;
    /**
     * Get Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
     * @param { any } params An object of valid arguments for the IGetPrices endpoint.
     * @param { number } params.appid The appid of the item, defaults to 440 (Team Fortress 2).
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<any> | Function } An object with Backpack.tf's internal item placeholders that correspond to the `appid` parameter.
    */
    getSpecialItems({ appid, callback }?: any): Promise<any> | Function;
}
