import { client } from "./client";

export const fetchPage = async (query: string) => {
  try {
    if (!client) return [];

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
