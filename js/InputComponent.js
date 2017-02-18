class InputComponent extends Component {
	constructor(type, data) {
		super(data);

		this._element.classList.add(type);

		let labelElement = null;
		if (data.label) {
			labelElement = this._element.appendChild(document.createElement("label"));
			labelElement.textContent = data.label;

			data.label = null;
		}

		this._inputElement = (labelElement || this._element).appendChild(document.createElement("input"));
		this._inputElement.type = type;
		this._inputElement.addEventListener("change", event => this._valueChanged(this.value));

		this._applyAttributes(this._inputElement, data);
	}

	get value() {
		return this._inputElement.value;
	}
}
