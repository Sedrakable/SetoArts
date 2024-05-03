import { client } from "./client";

export const useFetchPage = async (query: string, destName: string) => {
  try {
    // const data = null; // This is to test
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    const data = require(`./backups/en/backup-${destName}.json`);
    console.error("Error:", error);
    return data;
  }
};
