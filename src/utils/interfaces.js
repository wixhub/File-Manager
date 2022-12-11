import { createInterface } from "readline";

export const Iparams = {
    currentPath: '',
    flag: '',
    userName: '',
};

export const Icommands = {
    exit: '.exit',
};

export const Istd = createInterface({
    input: process.stdin,
    output: process.stdout,
});