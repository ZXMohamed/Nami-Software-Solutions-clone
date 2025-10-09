//*mui
import { Box, InputLabel } from "@mui/material";

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