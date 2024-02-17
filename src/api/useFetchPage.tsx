import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "9mwoew4a",
  dataset: "production", // Usually 'production'
  useCdn: true, // Set to true for production
  apiVersion: "2024-01-31",
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const urlFor = (source: any) => {
  return builder.image(source);
};

export const useFetchPage = (query: string) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(query);
        setPage(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [query]);

  return page;
};
