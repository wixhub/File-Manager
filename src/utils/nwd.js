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
            if (fs.statSync(filePath).isDirectory()) {
                Iparams.currentDir = destination;
                return;
            }
        } catch (error) {}
    }
    console.log("No such directory");
};

export const list = async () => {
    try 
    {
        const alls = await fs.promises.readdir(Iparams.currentDir, { withFileTypes: true });
        let arr = [];
        for (let el of alls) {
            let type = 'File';
            const ar = path.join(Iparams.currentDir, el.name);
        
            if (fs.statSync(ar).isDirectory())
            { type = 'Directory'; }

            arr.push({ Name: el.name, Type: type });
        }
        console.table(arr.sort(function(a, b) {
            return a.Name.localeCompare(b.Name) && a.Type.localeCompare(b.Type);
        }));
    }
    catch (error) {
        throw new Error("FS operation failed");
    }
};