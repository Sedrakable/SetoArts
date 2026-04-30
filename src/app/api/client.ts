import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import { SanityImageSource } from "@sanity/asset-utils";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const hasSanityConfig = Boolean(projectId && dataset);

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset, // Usually 'production'
      useCdn: false, // Set to true for production
      apiVersion: "2026-01-29",
    })
  : null;

// Get a pre-configured url-builder from your sanity client
const builder = client ? imageUrlBuilder(client) : null;

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    throw new Error(
      "Missing Sanity configuration. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
    );
  }

  return builder.image(source).auto("format");
};
