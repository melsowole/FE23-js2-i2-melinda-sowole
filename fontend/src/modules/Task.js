import { create, stringToKebab } from "./auxi.js";

export default class Task {
  constructor({ task, category, status, assigned, id }) {
    this.task = task;
    this.status = status;
    this.category = category;
    this.assigned = assigned;
    this.id = id;

    this.DOM = this.createComponent();
  }

  createComponent() {
    const wrapper = create("li");

    const article = create("article", ["task", this.category], 0, wrapper);

    create("h3", "task-title", this.task, article);

    if (this.status !== "to do") {
      article.append(assignedSection(this.assigned));
    }

    const form = create("form", 0, 0, article);
    form.id = this.id;
    //decides function of form submission
    const formInfo = formType(this.status);
    form.name = formInfo.name;

    if (this.status == "to do") {
      form.append(assignedToInput());
    }

    // all tasks have button
    const buttonWrapper = create("div", "button-wrapper", 0, form);
    const button = create("button", 0, formInfo.text, buttonWrapper);

    document
      .querySelector(`.boards .${stringToKebab(this.status)}`)
      .append(wrapper);

    return wrapper;
  }
}

function assignedSection(assigned) {
  return create("div", "assigned", " — " + assigned);
}

function assignedToInput() {
  const label = create("label", 0, "Assign to");
  const input = create("input", 0, 0, label);
  input.type = "text";
  input.required = true;
  input.name = "assigned";

  return label;
}

function formType(status) {
  switch (status) {
    case "to do":
      return { name: "assign", text: "Assign" };
    case "in progress":
      return { name: "done", text: "Mark as Done" };
    case "done":
      return { name: "delete", text: "Delete" };
  }
}
