import React from "react";

import FormComponent from "./js/FormComponent.js";
import InputFormComponent from "./js/InputFormComponent.js";
import SelectFormComponent from "./js/SelectFormComponent.js";
import TickFormComponent from "./js/TickFormComponent.js";

export default class FormGenerator extends React.Component {
	render() {
		return FormGenerator.generate(this.props.json);
	}

	static generate(string) {
		let json = JSON.parse(string);
		if (!json)
			return;

		function createComponent(type, data) {
			switch (type) {
			case "checkbox":
			case "radio":
				return new TickFormComponent(type, data);

			case "date":
			case "email":
			case "file":
			case "range":
			case "url":
				return new InputFormComponent(type, data);

			case "select":
				return new SelectFormComponent(data);

			default:
				return null;
			}
		}

		let formElement = document.createElement("form");
		formElement.setAttribute("action", json.action);
		formElement.setAttribute("method", json.method);
		formElement.setAttribute("enctype", "multipart/form-data");

		let components = [];
		for (let item of json.items) {
			let type = item.type;
			item.type = null;

			let condition = item.condition;
			item.condition = null;

			let component = createComponent(type, item);

			if (condition && !isNaN(condition.index)) {
				let conditionComponent = components[condition.index];
				conditionComponent.addEventListener(FormComponent.Event.ValueChanged, event => {
					if (JSON.stringify(conditionComponent.value) === JSON.stringify(condition.value))
						conditionComponent.element.insertAdjacentElement("afterend", component.element);
					else
						component.element.remove();
				});
			} else
				formElement.appendChild(component.element);

			component.addEventListener(FormComponent.Event.ValueChanged, event => console.log(event));

			components.push(component);
		}

		formElement.appendChild(document.createElement("button")).textContent = "Submit";

		return formElement;
	}
}
