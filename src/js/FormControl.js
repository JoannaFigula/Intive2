export default class FormControl {
    constructor( type, id, labelText, validateMethod, parent, errorMessage) {
        this.id = id;
        this.type = type;
        this.labelText = labelText;
        this.validateMethod = validateMethod;
        this.hasError = false;
        this.errorMessage = errorMessage;
    }

    validate = (e) => {
        const { value } = e.target;
        this.hasError = !this.validateMethod(value);
        const el = this.parent.querySelector(`#${this.id} + p`);
        if (this.hasError) {
            el.innerText = this.errorMessage
        } else {
            el.innerText = ''
        }
    }

    get isValid() {
        return !this.hasError
    }

    init(parent) {
        this.div = document.createElement('div');
        this.div.classList.add("newDiv");
        this.div.innerHTML = `
            <label>${this.labelText}</label>
            <input type="${this.type}" name="${this.id}" id="${this.id}" placeholder="Enter ${this.labelText.toLowerCase()}"/>
            <p></p>
        `
        parent.appendChild(this.div)

        this.parent = parent;

        console.log(parent.querySelector(`#${this.id}`))

        parent.querySelector(`#${this.id}`).addEventListener('change', this.validate)

    }
}
