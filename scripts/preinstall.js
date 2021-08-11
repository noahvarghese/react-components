const fs = require("fs");
const cp = require("child-process");

(() => {
    if (!fs.existsSync("./lib")) {
        cp.execSync("yarn build");
    }

    cp.execSync("cp ./lib/esm/assets/scss/default.scss ../../../../components.config.scss")
})();