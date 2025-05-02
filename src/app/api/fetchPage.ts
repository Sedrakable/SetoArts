import { client } from "./client";

export const fetchPage = async (query: string) => {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
