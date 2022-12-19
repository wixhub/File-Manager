import fs from 'fs';
import path from 'path';
import { Iparams } from "./interfaces.js";

// Working with files

export const catFile = async (fileName) => {

  if (!fileName || !fs.existsSync(fileName) || !fs.statSync(fileName).isFile()) {
    return console.log("Invalid input");
  }

  return new Promise((resolve) => {
      try {
        const stream = fs.createReadStream(fileName, { encoding: 'utf8' });
        stream.on('data', (data) => {
          console.log(data);
          resolve();
        });
        stream.on('error', (err) => {
          console.log(err);
          resolve();
        });
        stream.on('end', () => {
          resolve();
        });
      } catch (e) {
        console.log("Operation failed");
        resolve();
      }
    });
};

export const addFile = async (fileName) => {

  if (!fileName || fs.existsSync(fileName)) {
    return console.log("Invalid input");
  }

  try {
    const file = path.resolve(Iparams.currentDir, fileName);
    fs.createWriteStream(file);
  } catch (error) {
    console.log("Operation failed");
  }
};

export const renameFile = async (oldFileName, newFileName) => {

  if (!oldFileName ||  !fs.existsSync(oldFileName) || !fs.statSync(oldFileName).isFile()) {
    return console.log("Invalid input");
  }

  if (fs.existsSync(newFileName)) {
    return console.log("Invalid input");
  }

  try {
    const oldFile = path.resolve(Iparams.currentDir, oldFileName);
    const newPath = path.dirname(oldFile);
    const newFile = path.resolve(newPath, newFileName);
    await fs.promises.rename(oldFile, newFile);
  } catch (error) {
    console.log("Operation failed");
  }
};

export const copyFile = async (fileName, destination) => {

  if (!fileName ||  !fs.existsSync(fileName) || !fs.statSync(fileName).isFile()) {
    return console.log("Invalid input");
  }

  if (!destination || !fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
    return console.log("Invalid input");
  }

  try {
    await fs.promises.access(fileName);
  } catch (error) {
    console.log("Operation failed");
  }
  
  try {
    const readStream = fs.createReadStream(fileName).setEncoding('utf8');
    const writeStream = fs.createWriteStream(path.resolve(destination, path.basename(fileName)));
    readStream.on('data', (data) => {
      writeStream.write(data);
    });
    return true;
  } catch (error) {
    console.log("Operation failed");
  }
};

export const removeFile = async (fileName) => {
  try {
    await fs.promises.rm(path.resolve(Iparams.currentDir, fileName), { recursive: true });
  } catch (error) {
    console.log("Operation failed");
  }
};

export const moveFile = async (fileName, destination) => {

  if (!fileName ||  !fs.existsSync(fileName) || !fs.statSync(fileName).isFile()) {
    return console.log("Invalid input");
  }

  if (!destination || !fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
    return console.log("Invalid input");
  }

  if (await copyFile(fileName, destination)) {
    try {
      await fs.promises.rm(fileName);
    } catch (error) {
      console.log("Operation failed");
    }
  }
};