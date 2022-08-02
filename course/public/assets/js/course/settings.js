import Course from "./course.js";
import Alert from "./modules/alert.js";
import { getLocale } from "./helpers.js";

export default class Settings {
    constructor(element) {
        this._element = element
        this.bankCheckboxes = [...this._element.querySelectorAll(`[data-mod='cb']`)]
        this.viewCheckboxes = [...this._element.querySelectorAll(`[data-mod='view']`)]
        this.timeoutSelect = this._element.querySelector('#widget-timeout-select')

        this._element.addEventListener('click', this.handler.bind(this))
    }

    /**
     * Обработка нажатия на кнопку "Сохранить"
     * @param event
     */
    handler(event) {
        const target = event.target

        if(target.closest('#save-button')) {
            this.bankCurrencies = this.getSelectedCheckbox(this.bankCheckboxes).map(item => item.value)
            this.viewCurrencies = this.getSelectedCheckbox(this.viewCheckboxes).map(item => item.value)
            this.timeout = this.timeoutSelect.value

            this.setLocaleData({
                'cb': this.bankCurrencies,
                'view': this.viewCurrencies,
                'timeout': this.timeout
            })

            const courses = Course.getCourses(
                this.viewCurrencies.join(',') + `&cbr=${this.bankCurrencies.join(',')}&timeout=${this.timeout}`)
            courses.then(response => {
                document.querySelector('#courses').innerHTML = Course.render(response.data)

                let alert = new Alert({
                    title: 'Настройки успешно сохранены',
                    bg: 'alert-success',
                })

                alert.render()
            })
        }
    }

    /**
     * Установка настроек
     */
    setSettings() {
        const ls = getLocale()

        this.checkboxesEach(ls, this.bankCheckboxes, 'cb')
        this.checkboxesEach(ls, this.viewCheckboxes, 'view')

        Array.from(this.timeoutSelect.children).forEach(item => {
            if(item.value == ls.timeout) {
                item.setAttribute('selected', 'selected')
            }
        })
    }

    /**
     * Метод отмечает checkbox, данные из которых находятся в настройках
     * @param storage
     * @param data
     * @param property
     */
    checkboxesEach(storage, data, property) {
        data.forEach(item => {
            if(storage[property].includes(item.value)) {
                item.setAttribute('checked', 'checked')
            }
        })
    }

    /**
     * Получение активных checkbox
     * @param data
     * @returns {*}
     */
    getSelectedCheckbox(data) {
        return data.filter(item => item.checked)
    }

    /**
     * Добавление данных в локальное хранилище
     * @param data
     */
    setLocaleData(data) {
        localStorage.setItem('widget-settings', JSON.stringify(data))
    }
}
