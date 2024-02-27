import Err from "./Err.js";
import { readFromDB, writeToDB } from "./dataAccess.js";
import {
  postRequestValidation,
  patchRequestValidation,
  deleteRequestValidation,
} from "./reqDataValidationHandler.js";

export function get(req, res, next) {
  readFromDB()
    .then((tasks) => {
      if (req.params.id) {
        // if only one task is requested
        const match = tasks.find((task) => task.id == req.params.id);

        if (match) {
          res.json(match);
        } else {
          throw new Err(404, "User not found");
        }
      } else {
        // all tasks
        res.json(tasks);
      }
    })
    .catch((err) => {
      next(err);
    });
}

export function post(req, res, next) {
  try {
    postRequestValidation(req);

    readFromDB().then((tasks) => {
      const newTask = {
        id: Date.now(),
        task: req.body.task,
        category: req.body.category,
        status: "to do",
        assigned: false,
      };

      tasks.push(newTask);

      writeToDB(tasks);

      res.json(newTask);
    });
  } catch (err) {
    next(err);
    return;
  }
}

export function patch(req, res, next) {
  try {
    patchRequestValidation(req);

    readFromDB()
      .then((r) => {
        const match = r.find((o) => o.id == req.params.id);

        if (match) {
          for (const key in req.body) {
            match[key] = req.body[key];
          }

          writeToDB(r);

          res.json(match);
        } else {
          throw new Err(404, "User not Found!");
        }
      })
      .catch((err) => {
        // HOW REMOVE THIS STEP
        next(err);
      });
  } catch (err) {
    next(err);
    return;
  }
}

export function del(req, res, next) {
  try {
    deleteRequestValidation(req);

    readFromDB()
      .then((r) => {
        const matchIndex = r.findIndex((o) => o.id == req.params.id);

        if (matchIndex >= 0) {
          r.splice(matchIndex, 1);

          writeToDB(r);
          res.json({ id: req.params.id });
        } else {
          throw new Err(404, "User not Found!");
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
}
