const fs = require("fs");
const path = require("path");
const os = require("os");
const cp = require("cp");

(async () => {

    console.log(__dirname);
    // accounts for /node_modules/@noahvarghese/react-components/scripts/
    const projectRoot = path.resolve(__dirname, "../../../..");
    const packageJSON = path.join(projectRoot, "package,json")

    if (!fs.existsSync(packageJSON)) {
        console.error("Not root module:", projectRoot);
        return;
    }
    else console.log("Found it", packageJSON);

    // const npmCmd = os.platform().startsWith("win") ? "npm.cmd" : "npm";

    // cp.spawn(npmCmd, [])
})();