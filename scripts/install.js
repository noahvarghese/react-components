const fs = require("fs");
const path = require("path");
const readline = require("readline");

(async () => {
    if (!fs.existsSync("./lib")) {
        // cp.execSync("yarn build");
        console.error("lib does not exist");
        process.exit(50);
        return;
    }

    const relativePath = "../../../../components.config.scss";
    const scssFile = path.resolve(__dirname, relativePath);

    if (!fs.existsSync(scssFile)) {
        console.error("SCSS config file not found");
        return;
    }

    const contents = fs.readFileSync(scssFile);
    const newFirstLine = `@import "${relativePath};`;

    const rl = readline.createInterface({ input: contents, crlfDelay: Infinity });

    let counter = 0;
    let newContents = "";

    for await (const line of rl) {
        if (counter === 1) {
            newContents += newFirstLine;
        } else {
            newContents += line
        }

        newContents += '\r\n';
        counter++;
    }
})();