class CheckboxComponent extends Component {
	constructor(data) {
		super(data);

		this._element.classList.add("checkbox");

		let containerElement = this._element.appendChild(document.createElement("div"));

		this._inputs = data.options.map(option => {
			let labelElement = null;
			if (option.label) {
				labelElement = containerElement.appendChild(document.createElement("label"));
				labelElement.textContent = option.label;

				option.label = null;
			}

			let inputElement = (labelElement || containerElement).appendChild(document.createElement("input"));
			inputElement.type = "checkbox";
			inputElement.addEventListener("change", event => this._valueChanged(this.value));
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
