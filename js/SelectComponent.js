class SelectComponent extends Component {
	constructor(options) {
		super(options);

		this._element.classList.add("select");

		let labelElement = null;
		if (options.label) {
			labelElement = this._element.appendChild(document.createElement("label"));
			labelElement.textContent = options.label;

			options.label = null;
		}

		this._selectElement = (labelElement || this._element).appendChild(document.createElement("select"));
		this._selectElement.addEventListener("change", event => this._valueChanged(this.value));

		for (let option of options.options)
			this._applyAttributes(this._selectElement.appendChild(document.createElement("option")), option);

		options.options = null;

		this._applyAttributes(this._selectElement, options);
	}

	get value() {
		return this._selectElement.value;
	}
}
