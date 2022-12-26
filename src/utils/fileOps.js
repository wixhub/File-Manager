import fs from 'fs';
import path from 'path';
import { Iparams } from "./interfaces.js";
import { validateFile } from "./validators.js";

// Working with files

export const catFile = async (fileName) => {

  const pathToFile = validateFile(fileName);

  if (!pathToFile) {
    return;
  }

  return new Promise((resolve) => {
        const stream = fs.createReadStream(pathToFile);

        stream.on('data', (data) => {
          console.log(data);
          resolve();
        });

        stream.on('error', () => {
          console.log("Operation failed");
          resolve();
        });

        stream.on('end', () => {
          resolve();
        });
    });
};

export const addFile = async (fileName) => {
  const pathToFile = validateFile(fileName);

  if (!pathToFile) {
    return;
  }

  try {
    fs.createWriteStream(pathToFile);
  } catch (error) {
    console.log("Operation failed");
  }
};

export const renameFile = async (oldFileName, newFileName) => {
  const pathToOldFile = validateFile(oldFileName);
  const pathToNewFile = validateFile(newFileName);

  if (!pathToOldFile || !pathToNewFile) {
    return;
  }

  try {
    await fs.promises.rename(pathToOldFile, newFile);
  } catch (error) {
    console.log("Operation failed");
  }
};

export const copyFile = async (fileName, destination) => {

  const pathToFile = validateFile(fileName);

  if (!pathToFile) {
    return;
  }
  
  try {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(path.resolve(destination, path.basename(pathToFile)));

    readStream.on('data', (data) => {
      writeStream.write(data);
    });

    return true;

  } catch (error) {
    console.log("Operation failed");
  }
};

export const removeFile = async (fileName) => {
  const pathToFile = validateFile(fileName);

  if (!pathToFile) {
    return;
  }

  try {
    await fs.promises.rm(pathToFile, { recursive: true });
  } catch (error) {
    console.log("Operation failed");
  }
};

export const moveFile = async (fileName, destination) => {

  const pathToFile = validateFile(fileName);

  if (!pathToFile) {
    return;
  }

  if (await copyFile(pathToFile, destination)) {
    try {
      await fs.promises.rm(pathToFile);
    } catch (error) {
      console.log("Operation failed");
    }
  }
};