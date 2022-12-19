import fs from 'fs';
import path from 'path';
import * as zlib from 'zlib';
import { Iparams } from "./interfaces.js";

// Compress and decompress files

export const compressFile = async (
  fileName,
  destination
) => {

    const file = path.resolve(Iparams.currentDir, fileName);

    if (!fileName ||  !fs.existsSync(file) || !fs.statSync(file).isFile()) {
        return console.log("Invalid input");
    }
    
    if (!destination || !fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
        return console.log("Invalid input");
    }

    return new Promise((resolve) => {
        try {
            const fileName = `${path.basename(file)}.br`;
            const reader = fs.createReadStream(file);
            const writer = fs.createWriteStream(path.resolve(destination, fileName));
            const brotli = zlib.createBrotliCompress();
            reader.pipe(brotli).pipe(writer);
            reader.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
            reader.on('end', () => {
                resolve();
            });
            writer.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
            brotli.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
        } catch (e) {
            console.log("Operation failed");
            resolve();
        }
    });
};


export const decompressFile = async (
    fileName,
    destination
  ) => {

    const file = path.resolve(Iparams.currentDir, fileName);

    if (!fileName ||  !fs.existsSync(file) || !fs.statSync(file).isFile()) {
        return console.log("Invalid input");
    }
    
    if (!destination || !fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
        return console.log("Invalid input");
    }

    return new Promise((resolve) => {
        try {
            const fileName = path.basename(file).split('.br')[0];
            const reader = fs.createReadStream(file);
            const writer = fs.createWriteStream(path.resolve(destination, fileName));
            const brotli = zlib.createBrotliDecompress();
            reader.pipe(brotli).pipe(writer);
            reader.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
            writer.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
            reader.on('end', () => {
                resolve();
            });
            brotli.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
        } catch (e) {
            console.log("Operation failed");
            resolve();
        }
    });
  };