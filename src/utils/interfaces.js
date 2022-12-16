import { createInterface } from "readline";

export const Iparams = {
    currentDir: '',
    flag: '',
    rootDir: '',
    userName: '',
};

export const Icommands = {
    cd: 'cd',
    exit: '.exit',
    up: 'up',
};

export const Istd = createInterface({
    input: process.stdin,
    output: process.stdout,
});