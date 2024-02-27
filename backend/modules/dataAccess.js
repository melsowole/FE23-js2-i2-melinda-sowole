import fs from "fs/promises";

const DBPath = "./db.json";

export async function readFromDB() {
  const db = await fs.readFile(DBPath);

  const obj = JSON.parse(db);

  return obj;
}

export function writeToDB(obj) {
  fs.writeFile(DBPath, JSON.stringify(obj, null, 2));
}
