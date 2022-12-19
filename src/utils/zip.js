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
            const readStream = fs.createReadStream(file);
            const writeStream = fs.createWriteStream(path.resolve(destination, fileName));
            const brotliCompress = zlib.createBrotliCompress();

            readStream.pipe(brotliCompress).pipe(writeStream);

            readStream.on('error', () => {
                console.log("Operation failed");
                resolve();
            });

            readStream.on('end', () => {
                resolve();
            });

            writeStream.on('error', () => {
                console.log("Operation failed");
                resolve();
            });

            brotliCompress.on('error', () => {
                console.log("Operation failed");
                resolve();
            });
            
        } catch (error) {
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
            const readStream = fs.createReadStream(file);
            const writeStream = fs.createWriteStream(path.resolve(destination, fileName));
            const brotliDecompress = zlib.createBrotliDecompress();

            readStream.pipe(brotliDecompress).pipe(writeStream);

            readStream.on('error', () => {
                console.log("Operation failed");
                resolve();
            });

            writeStream.on('error', () => {
                console.log("Operation failed");
                resolve();
            });

            readStream.on('end', () => {
                resolve();
            });

            brotliDecompress.on('error', () => {
                console.log("Operation failed");
                resolve();
            });

        } catch (error) {
            console.log("Operation failed");
            resolve();
        }
    });
  };