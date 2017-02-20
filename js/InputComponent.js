class InputComponent extends Component {
	constructor(type, data) {
		super(data);

		this._element.classList.add(type);

		let labelElement = null;
		if (data.label) {
			labelElement = this._inputContainer.appendChild(document.createElement("label"));
			labelElement.textContent = data.label;

			data.label = null;
		}

		this._inputElement = (labelElement || this._inputContainer).appendChild(document.createElement("input"));
		this._inputElement.type = type;
		this._applyInputListener(this._inputElement);
		this._applyChangeListener(this._inputElement);
		this._applyAttributes(this._inputElement, data);
	}

	get value() {
		return this._inputElement.value;
	}
}
