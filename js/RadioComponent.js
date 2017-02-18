class RadioComponent extends Component {
	constructor(data) {
		super(data);

		this._element.classList.add("radio");

		let containerElement = this._element.appendChild(document.createElement("div"));

		this._inputs = data.options.map(option => {
			let labelElement = null;
			if (option.label) {
				labelElement = containerElement.appendChild(document.createElement("label"));
				labelElement.textContent = option.label;

				option.label = null;
			}

			if (!option.name) // Radio buttons allow multiple selections unless they all have the same "name".
				option.name = data.name;

			let inputElement = (labelElement || containerElement).appendChild(document.createElement("input"));
			inputElement.type = "radio";
			inputElement.addEventListener("change", event => this._valueChanged(this.value));
			this._applyAttributes(inputElement, option);

			return inputElement;
		});
	}

	get value() {
		for (let input of this._inputs) {
			if (input.checked)
				return input.value;
		}
		return null;
	}
}
