class InputComponent extends Component {
	constructor(type, options) {
		super(options);

		this._element.classList.add(type);

		let labelElement = null;
		if (options.label) {
			labelElement = this._element.appendChild(document.createElement("label"));
			labelElement.textContent = options.label;

			options.label = null;
		}

		this._inputElement = (labelElement || this._element).appendChild(document.createElement("input"));
		this._inputElement.type = type;
		this._inputElement.addEventListener("change", event => this._valueChanged(this.value));

		this._applyAttributes(this._inputElement, options);
	}

	get value() {
		return this._inputElement.value;
	}
}
