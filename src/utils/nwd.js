import fs from "fs";
import path from 'path';
import { Iparams } from "./interfaces.js";

// Navigation & working directory

export const goUpper = () => {

    if (Iparams.rootDir == Iparams.currentDir) {
        console.log("You can't go upper than root directory");
    } else {
        Iparams.currentDir = path.dirname(Iparams.currentDir);
    }
};

export const goToDirectory = async (destination) => {
    
    if (destination) {
        if (destination.toLocaleLowerCase() == Iparams.currentDir.toLocaleLowerCase()) {
            return;
        }
        if (destination.toLocaleLowerCase() == Iparams.rootDir.toLocaleLowerCase()) {
            Iparams.currentDir = Iparams.rootDir;
            return;
        }
        if (Iparams.rootDir.toLocaleLowerCase().indexOf(destination.toLocaleLowerCase()) == 0) {
            console.log("You can't go upper than root directory");
            return;
        }
        try {
            destination = path.resolve(Iparams.currentDir, destination);
            await fs.promises.access(destination);
            if (fs.stat(filePath).isDirectory()) {
                Iparams.currentDir = destination;
                return;
            }
        } catch (error) {}
    }
    console.log("No such directory");
};