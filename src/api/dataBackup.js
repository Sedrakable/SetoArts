import { createClient } from "@sanity/client";
import fs from "fs";
import { generateQueries } from "./generateSanityQueries.js";

const client = createClient({
  projectId: "9mwoew4a",
  dataset: "production", // Usually 'production'
  useCdn: true, // Set to true for production
  apiVersion: "2024-01-31",
});


const backupData = async (query, lang = "en") => {
  try {
    const data = await client.fetch(query);

    // Check if data is an array
    if (Array.isArray(data)) {
      // Iterate over each element of the array
      data.forEach((element, index) => {
        const backupFilePath = `src/api/backups/${lang}/backup-${
          element._type
        }-${index}.json`;
        fs.writeFileSync(backupFilePath, JSON.stringify(element, null, 2));
      });
    } else {
      // If data is not an array, create a single JSON file
      const backupFilePath = `src/api/backups/${lang}/backup-${
        data._type
      }.json`;
      fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Update loading state when fetching is done
  }
};

const backupDataForLang = (lang) => {
  const {
    navbarQuery,
    aboutQuery,
    contactQuery,
    footerQuery,
    homeQuery,
    legalQuery,
    notFoundQuery,
    serviceQuery,
  } = generateQueries(lang);
  
  backupData(navbarQuery, lang);
  backupData(aboutQuery, lang);
  backupData(contactQuery, lang);
  backupData(footerQuery, lang);
  backupData(homeQuery, lang);
  backupData(legalQuery, lang);
  backupData(notFoundQuery, lang);
  backupData(serviceQuery, lang);
};

const langs = ["en", "fr"];
langs.forEach((lang) => backupDataForLang(lang));