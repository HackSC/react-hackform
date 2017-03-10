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
		case "radio":
			return new TickComponent(type, data);

		case "date":
		case "email":
		case "file":
		case "range":
		case "url":
			return new InputComponent(type, data);

		case "select":
			return new SelectComponent(data);

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

	_applyValueChangeListener(eventName, element) {
		element.addEventListener(eventName, event => {
			this._dispatchEventToListeners(Component.Event.ValueChanged, this.value);
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
};
