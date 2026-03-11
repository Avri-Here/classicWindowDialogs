



const path = require('path');
const os = require('os');
const { extract } = require('file-icon-extractor');

/**
 * Extracts an icon from an executable file and saves it as a PNG in the user's home directory.
 * @param {string} appPath - The path to the executable file.
 * @returns {string} The path to the extracted PNG icon.
 * @throws {Error} If extraction fails.
 */
const extractFromExe = (appPath) => {
    console.log(`Starting icon extraction for: ${appPath}`);

    try {
        const tempDestPath = os.homedir();
        const basename = path.basename(appPath, path.extname(appPath));

        console.log(`Extracting icon to: ${tempDestPath}`);
        extract(appPath, tempDestPath);

        const iconPath = path.join(tempDestPath, `${basename}.png`);
        console.log(`Icon extracted successfully: ${iconPath}`);

        return iconPath;
    } catch (error) {
        console.error(`Failed to extract icon from ${appPath}: ${error.message}`);
        throw error;
    }
};

module.exports = { extractFromExe };


