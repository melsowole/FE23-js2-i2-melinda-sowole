import Err from "./Err.js";

// EXPORTS
export function postRequestValidation(req) {
  if (reqEmpty(req.body)) {
    throw new Err(400, "Request body missing!");
  }

  if (reqKeyMissing(req.body, ["task", "category"])) {
    throw new Err(400, "Request must contain keys 'task' and 'category'.");
  }

  if (reqUnsupportedKeys(req.body, ["task", "category"])) {
    throw new Err(
      400,
      "Request body contains unsupported keys. Post requests only accept 'task' and 'category' in body."
    );
  }

  if (reqValNotString(req.body)) {
    throw new Err(400, "Request values must be of type string.");
  }
}

export function patchRequestValidation(req) {
  if (reqEmpty(req.params)) {
    throw new Err(400, "Patch request missing 'id' parameter.");
  }

  if (reqEmpty(req.body)) {
    throw new Err(
      400,
      "Missing request body with keys 'status' and/or 'assigned'."
    );
  }

  if (reqUnsupportedKeys(req.body, ["status", "assigned"])) {
    throw new Err(
      400,
      "Request body contains unsupported keys. Patch requests may only contain keys 'status' and/or 'assigned."
    );
  }

  if (
    keyUnsupportedVals("status", req.body.status, [
      "to do",
      "in progress",
      "done",
    ])
  ) {
    throw new Err(
      400,
      "Value of status must be 'to do', 'in progress', or 'done'."
    );
  }

  if (reqValNotString(req.body)) {
    throw new Err(400, "Values of 'status' and/or 'assigned' must be a string");
  }
}

export function deleteRequestValidation(req) {
  if (reqEmpty(req.params)) {
    throw new Err(400, "Delete request missing 'id' parameter.");
  }
}

// VALIDATOR FUNCTIONS
function reqEmpty(req) {
  console.log(req);

  return !Object.keys(req).length;
}

function reqKeyMissing(req, keys) {
  let missingKey = false;
  for (const key of keys) {
    if (!req[key]) {
      missingKey = true;
    }
  }

  return missingKey;
}

function reqUnsupportedKeys(req, supportedKeys) {
  let unsupportedKeys = false;
  for (const key in req) {
    if (!supportedKeys.includes(key)) {
      unsupportedKeys = true;
    }
  }

  return unsupportedKeys;
}

function reqValNotString(req) {
  let notString = false;

  for (const key in req) {
    if (typeof req[key] !== "string") {
      notString = true;
    }
  }

  return notString;
}

function keyUnsupportedVals(key, value, supportedValues) {
  const unsupportedValues = !supportedValues.includes(value);

  return unsupportedValues;
}
