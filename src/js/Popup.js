export default class Popup {
    constructor(element, openBtnSelector, callback) {
        this.root = document.querySelector(element);
        this.openBtnSelector = openBtnSelector;
        this.init()
    }

    open = () => {
        this.root.style.display = 'flex';
    }

    close = () => {
        this.root.style.display='none';
    }

    init() {
        this.root.querySelector('.btnCancel').addEventListener('click', this.close)
        document.querySelector(this.openBtnSelector).addEventListener('click', this.open)
    }
}
