import { getHash } from './hash.js';
import { readArg } from './osInfo.js';
import { goToDirectory, goUpper, printList } from './nwd.js';
import { compressFile, decompressFile } from './zip.js';
import { addFile, catFile, copyFile, moveFile, renameFile, removeFile } from './fileOps.js';

export const parseLoginInput = () => {
    const arr = process.argv.slice(2)[0].split("=");
    return arr.length == 2? arr : null;
};

export async function parseCommandsInput(input) {
    const arr = input.split(" ")
    switch (arr[0]) {
        case 'add':
            await addFile(arr[1]);
            break;
        case 'cat':
            await catFile(arr[1]);
            break;
        case 'cd':
            await goToDirectory(arr[1]);
            break;
        case 'compress':
            await compressFile(arr[1], arr[2]);
            break;
        case 'cp':
            await copyFile(arr[1], arr[2]);
            break;
        case 'decompress':
            await decompressFile(arr[1], arr[2]);
            break;
        case 'hash':
            await getHash(arr[1]);
            break;
        case '.exit':
            process.exit();
        case 'ls':
            await printList();
            break;
        case 'mv':
            await moveFile(arr[1], arr[2]);
            break;
        case 'os':
            readArg(arr[1].slice(2));
            break;
        case 'rm':
            await removeFile(arr[1]);
            break;
        case 'rn':
            await renameFile(arr[1], arr[2]);
            break;
        case 'up':
            goUpper();
            break;
        default:
            console.log(`Invalid input: ${input}`);
    }
}