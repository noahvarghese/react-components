const fs = require("fs");
const cp = require("child-process");

(() => {
    if (!existsSync("./lib")) {
        execSync("yarn build");
    }

    execSync("cp ./lib/esm/assets/scss/default.scss ../../../../components.config.scss")
})();