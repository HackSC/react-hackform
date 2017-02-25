class TickComponent extends Component {
	constructor(type, data) {
		super(data);

		this._element.classList.add(type);

		this._inputs = data.options.map(option => {
			let labelElement = null;
			if (option.label) {
				labelElement = this._inputContainer.appendChild(document.createElement("label"));
				labelElement.textContent = option.label;

				option.label = null;
			}

			if (!option.hasOwnProperty("name")) // Radio buttons allow multiple selections unless they all have the same "name".
				option.name = data.name;

			let inputElement = (labelElement || this._inputContainer).appendChild(document.createElement("input"));
			inputElement.type = type;
			this._applyValueChangeListener("change", inputElement);
			this._applyAttributes(inputElement, option);

			return inputElement;
		});
	}

	get value() {
		return this._inputs.reduce((current, input) => {
			if (input.checked)
				current.push(input.value)

			return current;
		}, []);
	}
}
