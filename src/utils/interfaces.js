import { createInterface } from "readline";

export const Iparams = {
    currentDir: '',
    flag: '',
    rootDir: '',
    userName: '',
};

export const Istd = createInterface({
    input: process.stdin,
    output: process.stdout,
});