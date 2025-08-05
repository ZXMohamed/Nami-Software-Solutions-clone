export const pattern = {
    name:(name)=>name.match(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
    phone:(phone)=>phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
}

export function initZodMsgs(language) {
    if (language) {
        const required = language.page.form.validationMsgs.required;
        const length = language.page.form.validationMsgs.length;
        const valid = language.page.form.validationMsgs.valid;
        const unknown = language.page.form.validationMsgs.unknown;
        const fileSize = language.page.form.validationMsgs.fileSize;
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