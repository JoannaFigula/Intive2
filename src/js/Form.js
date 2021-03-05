
export default class Form {
    constructor(rootSelector, className, controls, callback) {
        this.root = document.querySelector(rootSelector);
        this.controls = controls;
        this.className = className;
        this.callback = callback;
    }

    register = (form) => {
        this.controls.forEach(control => control.init(form))
    }

    isValid() {
       return !this.controls.filter(control => !control.isValid).length
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.isValid()) {
            const result = {};
            for (let el of e.target) {
                if (el.name) {
                    result[el.name] = el.value
                }
            }
            this.callback(result)
        }
    }

    init() {
        const form = document.createElement('form');

        form.classList.add(`${this.className}`);
        this.register(form);
        form.innerHTML += `
             <div class="factorGroup">
                <button type="submit" class="btnSubmit">Add</button>
                <button type="button" class="btnCancel">Close</button>               
            </div>
        `
        this.root.appendChild(form);
        form.addEventListener('submit', this.handleSubmit)
    }
}
