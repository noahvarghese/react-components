const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const newConfigPath = "../../../components.config.scss";

(async () => {
    // Run only if not part of CI
    if (!fs.existsSync("./lib")) {
        return;
    }

    if (!fs.existsSync(newConfigPath)) {
        // Copy current stable config to new location for use
        const res = await fetch("https://raw.githubusercontent.com/noahvarghese/react-components/main/default.config.scss");
        const text = await res.text();
        fs.writeFileSync(newConfigPath, text);
    }

    // Modify reference to files
    const importPaths = [path.resolve(__dirname, "../lib/esm/assets/scss/_index.scss"), path.resolve(__dirname, "../lib/cjs/assets/scss/_index.scss")]

    for (let file of importPaths) {
        // rewrite both files
        fs.unlinkSync(file);
        fs.writeFileSync(file, '@import "../../../../../../../components.config.scss";\n@import "./core/";\n');
    }
})();