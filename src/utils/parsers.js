import { Icommands } from "./interfaces.js";
import { readArg } from "./osInfo.js";
import { goToDirectory, goUpper, printList } from "./nwd.js";
import { addFile, catFile, copyFile, moveFile, renameFile, removeFile } from './fileOps.js';

export const parseLoginInput = () => {
    const arr = process.argv.slice(2)[0].split("=");
    return arr.length == 2? arr : null;
};

export async function parseCommandsInput(input) {
    const arr = input.split(" ")
    switch (arr[0]) {
        case Icommands.add:
            await addFile(arr[1]);
            break;
        case Icommands.cat:
            await catFile(arr[1]);
            break;
        case Icommands.cd:
            await goToDirectory(arr[1]);
            break;
        case Icommands.cp:
            await copyFile(arr[1], arr[2]);
            break;
        case Icommands.exit:
            process.exit();
        case Icommands.ls:
            await printList();
            break;
        case Icommands.mv:
            await moveFile(arr[1], arr[2]);
            break;
        case Icommands.os:
            readArg(arr[1].slice(2));
            break;
        case Icommands.rm:
            await removeFile(arr[1]);
            break;
        case Icommands.rn:
            await renameFile(arr[1], arr[2]);
            break;
        case Icommands.up:
            goUpper();
            break;
        default:
            console.log(`Invalid input: ${input}`);
    }
}