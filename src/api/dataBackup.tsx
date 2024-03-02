const fs = require("fs");
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "9mwoew4a",
  dataset: "production", // Usually 'production'
  useCdn: true, // Set to true for production
  apiVersion: "2024-01-31",
});

const Langs = ["en", "fr"];

// Function to fetch data from Sanity and save as JSON
async function backupData() {
  Langs.forEach(async (lang) => {
    try {
      const data = await client.fetch(
        `*[_type in ["homePage", "aboutPage", "servicePage"] && lang == '${lang}']`
      );
      const backupFilePath = `src/api/backups/${lang}/backup-${lang}-${Date.now()}.json`;
      fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2));
      console.log("Backup saved successfully:", backupFilePath);
    } catch (error) {
      console.error("Error backing up data:", error);
      // Handle error, log, or send notifications
    }
  });
}

// Run backup function
backupData();
