import assert from "assert";

function interpret(command: string): string {
    const resultStringArr: string[] = [];
    let i = 0;
    while (i < command.length) {
        if (command[i] === '(') {
            if (command[i + 1] === 'a') {
                resultStringArr.push('al');
                i += 4;
            } else {
                resultStringArr.push('o');
                i += 2;
            }
        } else {
            resultStringArr.push('G');
            i++;
        }
    }
    return resultStringArr.join("")
}

//TODO