
import Course from "./course.js";
import Modal from "./modules/modal.js";
import { getLocale } from "./helpers.js";

export default class CourseWidget {
    constructor(selector) {
        this.courses = document.querySelector(`${selector}`)

        new Modal('#courses-settings', '.courses')
        document.addEventListener('DOMContentLoaded', this.reloadHandler.bind(this))
    }

    /**
     * Создание интервала, через который будет обновляться содержимое виджета
     */
    reloadHandler() {
        const ls = getLocale()
        this.render()

        setInterval(this.render.bind(this), +ls.timeout * 1000 * 60)
    }

    /**
     * Вывод шаблона виджета на страницу
     */
    render() {
        const ls = getLocale();
        const currencies = ls.view.join(',');
        const courses = Course.getCourses(currencies + `&cbr=${ls.cb.join(',')}&timeout=${ls.timeout}`)

        courses.then(response => this.courses.innerHTML = this.template(response))
    }

    /**
     * Шаблон виджета
     * @param data
     * @returns {string}
     */
    template(data) {
        let courses = data.data
        let last = data.last

        return `
         <div class="container">
            <div class="courses__top">
                <h2 class="courses__title">Курсы валют</h2>
                <div class="courses__settings-btn" id="courses-settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                    </svg>
                </div>
            </div>
            <p class="courses__subtitle">Центральный банк РФ установил с ${last} следующие курсы иностранных валют к рублю</p>
            <table class="courses-table">
                <thead>
                    <tr>
                        <th>Цифровой код</th>
                        <th>Буквенный код</th>
                        <th>Номинал</th>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="courses">
                    ${Course.render(courses)}
                </tbody>
            </table>
        </div>
        `
    }
}
