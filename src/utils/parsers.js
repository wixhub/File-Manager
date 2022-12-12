import { Icommands } from "./interfaces.js";
import { goUpper } from "./nwd.js";

export const parseLoginInput = () => {
    const arr = process.argv.slice(2)[0].split("=");
    return arr.length == 2? arr : null;
};

export async function parseCommandsInput(input) {
    const arr = input.split(" ")
    switch (arr[0]) {
        case Icommands.exit:
            process.exit();
        case Icommands.up:
            goUpper();
            break;
        default:
            console.log(`Invalid input: ${input}`);
    }
}