const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const newConfigPath = "../../../components.config.scss";

(async () => {
    let skip = false;

    // Run only if not part of CI
    if (!fs.existsSync("./lib")) {
        return;
    }

    if (!fs.existsSync(newConfigPath)) {
        // Copy current stable config to new location for use
        const res = await fetch("https://raw.githubusercontent.com/noahvarghese/react-components/main/default.config.scss");
        const text = await res.text();
        try {
            fs.writeFileSync(newConfigPath, text);
        } catch (e) {
            if (process.env.NODE_ENV === "ci" || process.NODE_ENV === "cd") {
                skip = true;
            } else throw e;
        }
    }

    if (!skip) {
        // Modify reference to files
        const importPaths = [path.resolve(__dirname, "../lib/esm/assets/scss/_index.scss"), path.resolve(__dirname, "../lib/cjs/assets/scss/_index.scss")]

        for (let file of importPaths) {
            // rewrite both files
            fs.unlinkSync(file);
            fs.writeFileSync(file, '@import "../../../../../../../components.config.scss";\n@import "./core/";\n');
        }
    }
})();