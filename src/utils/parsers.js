import { Icommands } from "./interfaces.js";

export const parseLoginInput = () => {
    const arr = process.argv.slice(2)[0].split("=");
    return arr.length == 2? arr : null;
};

export async function parseCommandsInput(input) {
    switch (input.split(" ")[0]) {
        case Icommands.exit:
            process.exit();
        default:
            console.log(`Invalid input: ${input}`);
            console.log("Use command .exit");
    }
}