import fs from "fs/promises";

const DBPath = "./db.json";

export async function readFromDB() {
  const db = await fs.readFile(DBPath);

  const dbObj = db == "" ? [] : JSON.parse(db);

  return dbObj;
}

export function writeToDB(obj) {
  fs.writeFile(DBPath, JSON.stringify(obj, null, 2));
}
