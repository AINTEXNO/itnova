
import Request from "./libs/request.js";

export default class Course {
    /**
     * Получение всех валют
     * @param params
     * @returns {Promise<any>}
     */
    static getCourses(params = '') {
        return Request.send(`/api/courses?view=${params}`)
    }

    /**
     * Получение всех курсов валют
     * @returns {Promise<any>}
     */
    static getCurrencies() {
        return Request.send('/api/currencies')
    }

    /**
     * Вывод полученных курсов на страницу
     * @param data
     * @returns {string|string}
     */
    static render(data) {
        let html = ``
        for(let i in data) {
            let course = data[i]
            html +=
                `
                 <tr class="courses-table__row">
                    <td class="courses-table__cell">${course.currency.num_code}</td>
                    <td class="courses-table__cell">${course.currency.char_code}</td>
                    <td class="courses-table__cell">${course.currency.nominal}</td>
                    <td class="courses-table__cell">${course.currency.name}</td>
                    <td class="courses-table__cell
                        ${course.course_changed === 1 ? 'success-text' : ''}
                        ${course.course_changed === 3 ? 'danger-text' : ''}">
                        ${course.value}</td>
                    <td class="courses-table__cell">
                        ${
                            course.course_changed === 1 ?
                            `
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="courses-table__arrow up-arrow" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                              </svg>
                            ` : ''
                        }
                        ${
                            course.course_changed === 3 ?
                            `
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="courses-table__arrow down-arrow" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                              </svg>
                            ` : ''
                        }
                    </td>
                </tr>
                `
        }

        return html
            ? html
            : `<tr><td colspan="5"><div class="alert alert-primary mt-3">Выберите валюты, курсы которых необходимо выводить в виджете</div></td></tr>`;
    }
}
