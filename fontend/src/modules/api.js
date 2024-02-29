const url = "http://localhost:3000/api/tasks";

export async function get() {
  const response = await fetch(url);
  const tasks = await response.json();

  return tasks;
}

export async function post(task) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  const reply = await response.json();

  return reply;
}

export async function patch(id, updatedKeys) {
  const response = await fetch(url + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedKeys),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  return await response.json();
}

export async function del(id) {
  const response = await fetch(url + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  return await response.json();
}
