class Component {
	constructor(options) {
		this._listeners = new Map;

		this._element = document.createElement("div");
		this._element.classList.add("component");

		if (options.description) {
			this._element.appendChild(document.createElement("p")).textContent = options.description;

			options.description = null;
		}
	}

	static create(type, options) {
		switch (type) {
		case "checkbox":
			return new CheckboxComponent(options);

		case "date":
			return new DateComponent(options);

		case "email":
			return new EmailComponent(options);

		case "radio":
			return new RadioComponent(options);

		case "select":
			return new SelectComponent(options);

		case "url":
			return new URLComponent(options);

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

	dispatchEventToListeners(eventType, eventData) {
		let listeners = this._listeners.get(eventType)
		if (!listeners)
			return;

		for (let listener of listeners)
			listener({target: this, data: eventData});
	}

	_valueChanged(event) {
		this.dispatchEventToListeners(Component.Event.ValueChanged, event);
	}

	_applyAttributes(element, attributes) {
		for (let key in attributes) {
			if (attributes[key] !== null)
				element.setAttribute(key, attributes[key]);
		}
	}
}

Component.Event = {
	ValueChanged: "component-value-changed",
};
