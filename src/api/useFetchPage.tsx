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
  return builder.image(source).auto("format");
};

export const useFetchPage = (query: string) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(query);
        setPage(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Update loading state when fetching is done
      }
    };

    fetchData();
  }, [query]);
  useEffect(() => {
    if (!loading) {
      if (!page) {
        console.error("Error fetch page data: ", query, page);
      } else {
        console.log("Fetched Page data: ", page);
      }
    }
  }, [loading, page, query]);
  return page;
};
