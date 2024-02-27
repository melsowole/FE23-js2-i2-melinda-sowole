import Err from "./Err.js";
import { readFromDB, writeToDB } from "./dataAccess.js";

export function get(req, res, next) {
  readFromDB().then((r) => {
    if (req.params.id) {
      const match = r.find((o) => o.id == req.params.id);

      if (match) {
        res.json(match);
      } else {
        next(new Err(404, "User not found"));
        return;
      }
    } else {
      res.json(r);
    }
  });
}

export function post(req, res, next) {
  readFromDB().then((r) => {
    req.body.id = Date.now();
    r.push(req.body);

    writeToDB(r);

    res.json(req.body);
  });
}

export function patch(req, res, next) {
  if (!Object.keys(req.body).length) {
    next(new Err(400, "Request body is missing!"));
    return;
  }

  readFromDB().then((r) => {
    const match = r.find((o) => o.id == req.params.id);

    if (match) {
      for (const key in req.body) {
        if (key == "id") continue; // send error message?
        match[key] = req.body[key];
      }

      writeToDB(r);

      res.json(match);
    } else {
      next(new Err(404, "User not Found!"));
    }
  });
}

export function del(req, res, next) {
  readFromDB().then((r) => {
    const matchIndex = r.findIndex((o) => o.id == req.params.id);

    if (matchIndex >= 0) {
      r.splice(matchIndex, 1);

      writeToDB(r);
      res.json(req.params.id);
    } else {
      next(new Err(404, "User not Found!"));
    }
  });
}
