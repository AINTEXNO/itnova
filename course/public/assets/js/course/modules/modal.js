import Course from "../course.js";
import Settings from "../settings.js";

export default class Modal {
    constructor(trigger, main) {
        this.main = document.querySelector(main)
        this.triggerClass = trigger
        this.currencies = Course.getCurrencies()

        this.main.addEventListener('click', this.handler.bind(this))
    }

    /**
     * Обработка нажатия по области виджета
     * @param event
     */
    handler(event) {
        const target = event.target

        if(target.closest(this.triggerClass)) {
            this.render()
        }

        if(target.closest('.courses-modal')
            && !target.closest('.courses-modal__container')) {
                this.close()
            }
    }

    /**
     * Отрисовка модального окна
     */
    render() {
        this.currencies.then(
            response => {
                this.main.insertAdjacentHTML('beforeend', this.template(response.data))
                this.modal = document.querySelector('.courses-modal')
                document.body.style.overflow = 'hidden'

                const settings = new Settings(this.modal)
                settings.setSettings()
            })
    }

    /**
     * Закрытие модального окна
     */
    close() {
        this.modal.remove()
        document.body.style.overflow = 'auto'
    }

    /**
     * Вывод курсов на страницу
     * @param currencies
     * @param mod
     * @returns {string}
     */
    viewCurrency(currencies, mod) {
        let html = ``;
        for(let i in currencies) {
            let currency = currencies[i]
            html +=
                `
                 <li class="courses-settings__item">
                    <input type="checkbox" id="course-${mod}-${currency.id}" data-mod="${mod}" class="course-settings__input" value="${currency.id}">
                    <label for="course-${mod}-${currency.id}" class="course-settings__label">${currency.char_code}</label>
                </li>
                `
        }

        return html;
    }

    /**
     * Шаблон модального окна
     * @param courses
     * @returns {string}
     */
    template(courses) {
        return `
             <section class="courses-modal">
                <div class="container courses-modal__container">
                    <h2>Настройки</h2>
                    <div class="modal-settings">
                        <div class="modal-settings__item">
                            <h5 class="modal-settings__title">Валюты с ЦБ</h5>
                            <ul class="courses-settings">
                                ${this.viewCurrency(courses, 'cb')}
                            </ul>
                        </div>
                        <div class="modal-settings__item">
                            <h5 class="modal-settings__title">Выводимые валюты</h5>
                            <ul class="courses-settings">
                                ${this.viewCurrency(courses, 'view')}
                            </ul>
                        </div>
                        <div class="modal-settings__item">
                            <h5 class="modal-settings__title">Время обновления виджета</h5>
                            <select class="form-select settings-select" id="widget-timeout-select">
                                <option value="1">1 минута</option>
                                <option value="3">3 минуты</option>
                                <option value="5">5 минут</option>
                                <option value="10">10 минут</option>
                                <option value="30">30 минут</option>
                            </select>
                        </div>
                    </div>
                    <div class="courses-modal__bottom">
                        <button class="btn btn-primary" id="save-button">Сохранить</button>
                    </div>
                </div>
             </section>
        `
    }
}
