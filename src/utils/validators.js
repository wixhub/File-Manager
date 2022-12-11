import { Iparams } from "./interfaces.js";
import { parseLoginInput } from "./parsers.js";

export const validateUserInput = () => {
    if (!!parseLoginInput()) {
        const arr = parseLoginInput();
        if (validateUserNameFlag(arr[0]) && validateStringLength(arr[1])) {
            Iparams.flag = arr[0];
            Iparams.userName = arr[1];
            return true
        } 
    }
    return false
};

export const validateUserNameFlag = (flag) => {
    return flag === "--username";
};

export const validateStringLength = (str) => {
    return str.length > 0;
};