import { dirname } from 'path';
import { Iparams } from "./interfaces.js";

export const goUpper = () => {

    if (Iparams.rootDir == Iparams.currentDir) {
        console.log("You can't go upper than root directory");
    } else {
        Iparams.currentDir = dirname(Iparams.currentDir);
    }
};