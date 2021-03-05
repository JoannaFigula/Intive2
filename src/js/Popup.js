export default class Popup {
    constructor(element, openBtnSelector, callback) {
        this.root = document.querySelector(element);
        this.openBtnSelector = openBtnSelector;
        this.closeBtn = this.root.querySelector('.btnCancel');
        this.init()
    }

    open = () => {
        this.root.style.display = 'flex';
    }

    close = () => {
        this.root.style.display='none';
    }

    init() {
        this.root.addEventListener('click', (e) => {
            if (e.target.classList.contains('btnCancel')) {
                this.close()
            }
        });
        document.querySelector(this.openBtnSelector).addEventListener('click', this.open);

    }
}
