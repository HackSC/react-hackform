class Component {
	constructor(data) {
		this._listeners = new Map;

		this._element = document.createElement("div");
		this._element.classList.add("component");

		if (data.description) {
			this._element.appendChild(document.createElement("p")).textContent = data.description;

			data.description = null;
		}

		this._inputContainer = this._element.appendChild(document.createElement("div"));
		this._inputContainer.classList.add("input-container");
	}

	static create(type, data) {
		switch (type) {
		case "checkbox":
			return new TickComponent("checkbox", data);

		case "date":
			return new InputComponent("date", data);

		case "email":
			return new InputComponent("email", data);

		case "radio":
			return new TickComponent("radio", data);

		case "range":
			return new InputComponent("range", data);

		case "select":
			return new SelectComponent(data);

		case "url":
			return new InputComponent("url", data);

		default:
			return null;
		}
	}

	get element() { return this._element; }

	get value() {
		// Implemented by subclasses.
		return null;
	}

	addEventListener(eventType, listener) {
		let listeners = this._listeners.get(eventType);
		if (!listeners) {
			listeners = new Set;
			this._listeners.set(eventType, listeners);
		}

		listeners.add(listener);
	}

	_dispatchEventToListeners(eventType, eventData) {
		let listeners = this._listeners.get(eventType)
		if (!listeners)
			return;

		for (let listener of listeners)
			listener({target: this, data: eventData});
	}

	_applyChangeListener(element) {
		element.addEventListener("change", event => {
			this._dispatchEventToListeners(Component.Event.ValueChanged, this.value);
		});
	}

	_applyInputListener(element) {
		element.addEventListener("input", event => {
			this._dispatchEventToListeners(Component.Event.ValueInput, this.value);
		});
	}

	_applyAttributes(element, attributes) {
		for (let key in attributes) {
			let type = typeof attributes[key];
			if (type === "string" || type === "number" || type === "boolean")
				element.setAttribute(key, attributes[key]);
		}
	}
}

Component.Event = {
	ValueChanged: "component-value-changed",
	ValueInput: "component-value-input",
};
