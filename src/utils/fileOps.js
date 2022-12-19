import fs from 'fs';
import path from 'path';
import { Iparams } from "./interfaces.js";

// Working with files

export const catFile = async (fileName) => {

  try {
    fileName = path.resolve(Iparams.currentDir, fileName);
  } catch (error) {
    console.log("Operation failed");
  }

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

export const addFile = async (fileName) => {

  try {
    fileName = path.resolve(Iparams.currentDir, fileName);
  } catch (error) {
    console.log("Operation failed");
  }

  if (!fileName || fs.existsSync(fileName)) {
    return console.log("Invalid input");
  }

  try {
    fs.createWriteStream(fileName);
  } catch (error) {
    console.log("Operation failed");
  }
};

export const renameFile = async (oldFileName, newFileName) => {

  const oldFile = path.resolve(Iparams.currentDir, oldFileName);

  if (!oldFileName ||  !fs.existsSync(oldFile) || !fs.statSync(oldFile).isFile()) {
    return console.log("Invalid input");
  }

  const newPath = path.dirname(oldFile);
  const newFile = path.resolve(newPath, newFileName);

  if (fs.existsSync(newFile)) {
    return console.log("Invalid input");
  }

  try {
    await fs.promises.rename(oldFile, newFile);
  } catch (error) {
    console.log("Operation failed");
  }
};

export const copyFile = async (fileName, destination) => {

  const file = path.resolve(Iparams.currentDir, fileName);

  if (!fileName ||  !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return console.log("Invalid input");
  }

  if (!destination || !fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
    return console.log("Invalid input");
  }

  try {
    await fs.promises.access(file);
  } catch (error) {
    console.log("Operation failed");
  }
  
  try {
    const readStream = fs.createReadStream(file).setEncoding('utf8');
    const writeStream = fs.createWriteStream(path.resolve(destination, path.basename(file)));

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

  const file = path.resolve(Iparams.currentDir, fileName);

  if (!fileName ||  !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return console.log("Invalid input");
  }

  if (!destination || !fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
    return console.log("Invalid input");
  }

  if (await copyFile(file, destination)) {
    try {
      await fs.promises.rm(file);
    } catch (error) {
      console.log("Operation failed");
    }
  }
};