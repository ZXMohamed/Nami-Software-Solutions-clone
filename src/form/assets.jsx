//*mui
import { Box, InputLabel } from "@mui/material";

export const pattern = {
    name:(name)=>name.match(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
    phone:(phone)=>phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
}

export function initZodMsgs(language) {console.log(language);
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

export function setFormAdditionalInputs(defaultContent, additionalInputs) {

    let schema = {};
    let inputs = [];

    for (let input of additionalInputs) {
        schema[input.name] = input.schema(defaultContent);
        inputs.push((key, register, errors) =>
            <Box key={ key }>
                <InputLabel htmlFor={ "form" + input.name } className='inputTitle'>{ defaultContent.form.inputs[input.name] } { input.inputSettings.required && <span className='requiredSymbol'>*</span> }</InputLabel>
                <input.input id={ "form" + input.name } color={ errors?.[input.name] ? "error" : "primary" } helperText={ errors?.[input.name]?.message }  {...register(input.name,input.inputSettings)} />
            </Box>
        );
    }

    return { inputs, schema }
}