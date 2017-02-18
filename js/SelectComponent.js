class SelectComponent extends Component {
	constructor(data) {
		super(data);

		this._element.classList.add("select");

		let labelElement = null;
		if (data.label) {
			labelElement = this._element.appendChild(document.createElement("label"));
			labelElement.textContent = data.label;

			data.label = null;
		}

		this._selectElement = (labelElement || this._element).appendChild(document.createElement("select"));
		this._selectElement.addEventListener("change", event => this._valueChanged(this.value));

		for (let option of data.options)
			this._applyAttributes(this._selectElement.appendChild(document.createElement("option")), option);

		data.options = null;

		this._applyAttributes(this._selectElement, data);
	}

	get value() {
		return this._selectElement.value;
	}
}
