import { existsSync } from "fs";
import { execSync } from "child_process";

if (!existsSync("./lib")) {
    execSync("yarn build");
}

execSync("cp ./lib/esm/assets/scss/default.scss ../../../../components.config.scss")