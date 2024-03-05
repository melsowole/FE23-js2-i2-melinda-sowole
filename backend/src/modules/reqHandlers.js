import CustomError from "./CustomError.js";
import { readFromDB, writeToDB } from "./dataAccess.js";
import {
  postRequestValidation,
  patchRequestValidation,
  deleteRequestValidation,
} from "./reqDataValidationHandler.js";

export async function getTasks(req, res, next) {
  try {
    const tasks = await readFromDB();

    // if only one task is requested
    if (req.params.id) {
      const match = tasks.find((task) => task.id == req.params.id);

      if (match) {
        res.json(match);
      } else {
        throw new CustomError(404, "User not found");
      }
    } else {
      // all tasks
      res.json(tasks);
    }
  } catch (err) {
    next(err);
  }
}

export async function addTask(req, res, next) {
  try {
    postRequestValidation(req);

    const tasks = await readFromDB();

    const newTask = {
      id: Date.now(),
      task: req.body.task,
      category: req.body.category,
      status: "to do",
      assigned: false,
      lastModified: Date.now(),
    };

    tasks.push(newTask);

    console.log("added task");
    writeToDB(tasks);

    res.json(newTask);
  } catch (err) {
    next(err);
    return;
  }
}

export async function updateTask(req, res, next) {
  try {
    patchRequestValidation(req);

    const tasks = await readFromDB();

    const match = tasks.find((o) => o.id == req.params.id);

    if (match) {
      for (const key in req.body) {
        match[key] = req.body[key];
      }

      match.lastModified = Date.now();

      writeToDB(tasks);

      res.json(match);
    } else {
      throw new CustomError(404, "User not Found!");
    }
  } catch (err) {
    next(err);
    return;
  }
}

export async function deleteTask(req, res, next) {
  try {
    deleteRequestValidation(req);

    const tasks = await readFromDB();

    const matchIndex = tasks.findIndex((o) => o.id == req.params.id);

    if (matchIndex >= 0) {
      tasks.splice(matchIndex, 1);

      writeToDB(tasks);
      res.json({ id: req.params.id });
    } else {
      throw new CustomError(404, "User not Found!");
    }
  } catch (err) {
    next(err);
  }
}
