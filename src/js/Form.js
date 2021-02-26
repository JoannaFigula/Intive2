export default class Form {
    constructor(rootSelector, controls) {
        this.root = document.querySelector(rootSelector);
        this.controls = controls;
        this.register();
    }

    register = () => {
        this.controls.forEach(control => control.init())
    }

    init() {
        const form = document.createElement('form');
        this.root.appendChild(form);
        this.controls.forEach(control => {
            this.root.querySelector('form').appendChild(control.init())
        })
    }
}
