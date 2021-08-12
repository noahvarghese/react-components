const fs = require("fs");
const path = require("path");
const readline = require("readline");
const fetch = require("node-fetch");

const newConfigPath = "../../../components.config.scss";

(async () => {
    if (!fs.existsSync("./lib")) {
        // cp.execSync("yarn build");
        console.error("lib does not exist");
        // process.exit(50);
        return;
    }

    const res = await fetch("https://raw.githubusercontent.com/noahvarghese/react-components/main/default.config.scss");
    const text = await res.text();
    console.log(text);

    fs.writeFileSync(newConfigPath, text);

    const scssFile = path.resolve(__dirname, newConfigPath);

    if (!fs.existsSync(scssFile)) {
        console.error("SCSS config file not found");
        return;
    }

    const contents = fs.readFileSync(scssFile);
    const newFirstLine = `@import "${newConfigPath};`;

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

    fs.writeFileSync(newConfigPath, newContents);
})();