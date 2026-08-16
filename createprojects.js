import fs from "fs";
import path from "path";

const ROOT_DIR = "./public/projects";
const OUTPUT_FILE = "./projects.json";

function getAllJsonFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, dive deeper
      getAllJsonFiles(filePath, arrayOfFiles);
    } else if (path.extname(file).toLowerCase() === ".json") {
      // If it's a JSON file, save the path
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Reads, parses, and combines the thumbnail, title and year and featured status into one json file.
 */
function mergeJsonFiles() {
  try {
    const jsonPaths = getAllJsonFiles(ROOT_DIR);
    const combinedData = [];

    jsonPaths.forEach((filePath) => {
      const fileData = fs.readFileSync(filePath, "utf8");
      const { thumbnail, title, year, role, featured } = JSON.parse(fileData);

      combinedData.push({
        slug: path.basename(path.dirname(filePath)),
        thumbnail,
        title,
        year,
        role,
        featured,
      });
    });

    combinedData.sort((a, b) => Number(b.year) - Number(a.year));

    // Write the unified data array to the output file with readable spacing
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(combinedData, null, 2),
      "utf8",
    );
    console.log(
      `Success! Combined ${jsonPaths.length} files into ${OUTPUT_FILE}`,
    );
  } catch (error) {
    console.error("An error occurred during execution:", error.message);
  }
}

// Execute the merge
mergeJsonFiles();
