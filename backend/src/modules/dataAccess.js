import fs from "fs/promises";

const DBPath = "./src/db.json";

export async function readFromDB() {
  const db = await fs.readFile(DBPath);

  const dbObj = db == "" ? [] : JSON.parse(db);

  return dbObj;
}

export function writeToDB(arr) {
  // latest modified always displays first
  const sortedData = arr.sort((a, b) => b.lastModified - a.lastModified);

  fs.writeFile(DBPath, JSON.stringify(sortedData, null, 2));
}
