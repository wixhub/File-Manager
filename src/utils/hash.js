import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Iparams } from "./interfaces.js";

// Calculate hash for file

export const getHash = async (fileName) => {

    const file = path.resolve(Iparams.currentDir, fileName);

    if (!fileName || !fs.promises.exist(file) || !fs.promises.stat(file).isFile()) {
        return console.log("Invalid input");
    }

    return new Promise((resolve) => {
        try {
            const stream = fs.createReadStream(file);
            const hash = crypto.createHash('sha256');

            stream.on('data', (data) => {
                hash.update(data);
                console.log(`Hash for file is ${hash.digest('hex')}`);
                resolve();
            });

            stream.on('error', () => {
                console.log("Operation failed");
                resolve();
            });

            stream.on('end', () => {
                resolve();
            });
            
        } catch (error) {
            console.log("Operation failed");
            resolve();
        }
    });
};