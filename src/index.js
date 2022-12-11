import process from 'node:process';
import { homedir } from "os";
import { Iparams, Istd } from "./utils/interfaces.js";
import { parseCommandsInput } from  "./utils/parsers.js";
import { validateUserInput } from "./utils/validators.js";

const start = () => {

    if (validateUserInput()) {
        Iparams.currentPath = homedir();
        console.log(`Welcome to the File Manager, ${Iparams.userName}!`);
        console.log(`You are currently in ${Iparams.currentPath}`);
    } else {
        Istd.close();
        console.log(`Use "npm run start -- --username=Your_UserName" to start the program!`);
    }
}

const flow = async () => {
    
    start();
    
    if (!!Iparams.userName) {

        Istd.on("line", async (input) => {
            await parseCommandsInput(input);
            console.log(`You are currently in ${Iparams.currentPath}`);
        });
        
        process.on("exit", (code) => {
            Istd.close();
            console.log(`Exit with code: ${code}`);
            console.log(`Thank you for using File Manager, ${Iparams.userName}, goodbye!`);
        });
    }
}

flow();