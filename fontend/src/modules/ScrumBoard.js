import * as api from "./api.js";
import Task from "./Task.js";

export default class ScrumBoard {
  constructor() {
    this.toDoCont = document.querySelector(".boards to-do");
    this.inProgressCont = document.querySelector(".boards in-progress");
    this.doneCont = document.querySelector(".boards done");
  }

  async addTask(newTask) {
    await api.post(newTask);

    window.location = "/";
  }

  async displayTasks() {
    const tasks = await api.get();

    for (const task of tasks) {
      new Task(task);
    }

    document.querySelector(".boards").addEventListener("submit", (e) => {
      e.preventDefault();

      if (e.target.name == "assign") {
        const assigned = new FormData(e.target).get("assigned");

        this.assignTask(e.target.id, assigned).then((r) => this.updateGUI(r));
      } else if (e.target.name == "done") {
        this.markTaskDone(e.target.id).then((r) => this.updateGUI(r));
      } else {
        this.deleteTask(e.target.id).then((r) => this.updateGUI(r));
      }
    });
  }

  updateGUI(response) {
    console.log(response);
    if (response.id) {
      window.location = "/";
    } else {
      window.alert("An error has occurred!");
    }
  }

  async assignTask(id, assigned) {
    const taskUpdate = {
      assigned,
      status: "in progress",
    };

    // to return the response from api
    return api.patch(id, taskUpdate).then((r) => {
      console.log(r);

      return r;
    });
  }

  async markTaskDone(id) {
    const taskUpdate = {
      status: "done",
    };

    return api.patch(id, taskUpdate).then((r) => {
      console.log(r);
      return r;
    });
  }

  async deleteTask(id) {
    const taskUpdate = {
      status: "delete",
    };

    return api.del(id, taskUpdate).then((r) => {
      console.log(r);

      return r;
    });
  }
}
