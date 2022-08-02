/**
 * ======= Helpers =======
 */

/**
 * Получение данных из локального хранилища
 * @returns {any}
 */
function getLocale() {
    const ls = JSON.parse(localStorage.getItem('widget-settings'))
    if(!ls) {
        localStorage.setItem('widget-settings', JSON.stringify({
            cb: [],
            view: [],
            timeout: '1'
        }))
    }
    return JSON.parse(localStorage.getItem('widget-settings'))
}

export { getLocale }
