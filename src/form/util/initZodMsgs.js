//*change forms error messages with selected language
export function initZodMsgs(language) {
    if (language) {
        const required = language.validationMsgs.required;
        const length = language.validationMsgs.length;
        const valid = language.validationMsgs.valid;
        const unknown = language.validationMsgs.unknown;
        const fileSize = language.validationMsgs.fileSize;
        return {
            required: required,
            length: {
                less: (input, num) => input + " " + length.less.middle + " " + num + " " + length.less.last,
                more: (input, num) => input + " " + length.more.middle + " " + num + " " + length.more.last,
            },
            valid: (input) => valid.first + " " + input + " " + valid.last,
            unknown: (input) => unknown.first + " " + input,
            fileSize: (size) => fileSize.first + " " + size + fileSize.last
        }
    } else {
        return {
            required: "This is a required field",
            length: { less: (input, num) => `${input} less than ${num} chars`, more: (input, num) => `${input} more than ${num} chars` },
            valid: (input) => `this ${input} is not valid`,
            unknown: (input) => `unknown ${input}`,
            fileSize: (size) => `file is bigger than ${size}MB`
        }
    }
}
