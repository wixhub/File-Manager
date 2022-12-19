import { createInterface } from "readline";

export const Iparams = {
    currentDir: '',
    flag: '',
    rootDir: '',
    userName: '',
};

export const Icommands = {
    add: 'add',
    cat: 'cat',
    cd: 'cd',
    cp: 'cp',
    hash: 'hash',
    exit: '.exit',
    ls: 'ls',
    mv: 'mv',
    os: 'os',
    rm: 'rm',
    rn: 'rn',
    up: 'up',
};

export const Istd = createInterface({
    input: process.stdin,
    output: process.stdout,
});