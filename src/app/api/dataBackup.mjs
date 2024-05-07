// import { createClient } from "@sanity/client";
// import fs from "fs";
// import { homePageQuery } from "./generateSanityQueries.js";

// const backupData = async (query, lang = "en") => {
//   try {
//     const data = await client.fetch(query);

//     // Check if data is an array
//     if (Array.isArray(data)) {
//       // Iterate over each element of the array
//       data.forEach((element) => {
//         const backupFilePath = `src/api/backups/${lang}/backup-${data?._type}-${element.path}.json`;
//         fs.writeFileSync(backupFilePath, JSON.stringify(element, null, 2));
//       });
//     } else {
//       // If data is not an array, create a single JSON file
//       const backupFilePath = `src/api/backups/${lang}/backup-${data?._type}.json`;
//       fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2));
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     // Update loading state when fetching is done
//   }
// };

// const backupDataForLang = (lang) => {
//   // const {
//   //   navbarQuery,
//   //   aboutQuery,
//   //   contactQuery,
//   //   footerQuery,
//   //   homeQuery,
//   //   legalQuery,
//   //   notFoundQuery,
//   //   serviceQuery,
//   //   blogQuery,
//   // } = generateQueries(lang);

//   backupData(homePageQuery(lang), lang);
//   //   backupData(aboutQuery, lang);
//   //   backupData(contactQuery, lang);
//   //   backupData(footerQuery, lang);
//   //   backupData(homeQuery, lang);
//   //   backupData(legalQuery, lang);
//   //   backupData(notFoundQuery, lang);
//   //   backupData(serviceQuery, lang);
//   //   backupData(blogQuery, lang);
// };

// backupDataForLang("en");
// backupDataForLang("fr");
