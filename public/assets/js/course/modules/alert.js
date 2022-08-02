
export default class Alert {
    constructor(props) {
        this.title = props.title || ''
        this.bg = props.bg || 'alert-primary'
        this.timeout = props.timeout || 3000
    }

    /**
     * Отрисовка alert
     */
    render() {
        const customAlert = document.querySelector('#custom-alert-message')

        if(!customAlert) {
            document.body.insertAdjacentHTML('beforeend', this.template())
            document.querySelector('#custom-alert-message').animate([
                {
                    transform: 'translateY(20px)',
                    opacity: 0,
                },
                {
                    transform: 'translateY(0)',
                    opacity: 1,
                }
            ], {
                duration: 300
            })
        }

        this.timeoutDelete()
    }

    /**
     * Задание таймаута, после которого alert исчезнет
     */
    timeoutDelete() {
        setTimeout(() => {
            document.querySelector('#custom-alert-message').remove()
        }, this.timeout)
    }

    /**
     * Шаблон alert
     * @returns {string}
     */
    template() {
        return `<div class="alert ${this.bg}" role="alert" id="custom-alert-message">${this.title}</div>`
    }
}
