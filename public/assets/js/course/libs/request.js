
export default class Request {
    /**
     * Обертка для метода fetch
     * @param uri
     * @param params
     * @returns {Promise<any>}
     */
    static async send(uri, params = {}) {
        return await (await fetch(uri, params)).json()
    }
}
