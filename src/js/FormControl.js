export default class FormControl {
    constructor( name, labelInfo,classNameP, validateMethod, parent, errorMessage) {
        this.name = name;
        this.labelInfo = labelInfo;
        this.classNameP = classNameP;
        this.validateMethod = validateMethod;
        this.parent = document.querySelector(parent);
        this.hasError = false;
        this.errorMessage = errorMessage;
    }

    validate = (e) => {
        const { value } = e.target;
        this.hasError = this.validateMethod(value);
    }

    get isValid() {
        return this.hasError
    }

    init() {
        const div = document.createElement('div');
        div.innerHTML = `
            <label>${this.labelInfo}</label>
            <input name="${this.name}" />
            <p class="${this.classNameP}">${this.errorMessage}</p>
        `
        return div;
    }
}
