//*react
import { useState } from "react";
//*mui
import { Box, Typography } from "@mui/material";

function FileInput(props) {

    const [fileName, setFileName] = useState(props.no_file);

    const fileNameChange = (e, setFileName) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0]?.name);
        } else if (e.target.files.length == 0) {
            setFileName(props.no_file);
        }
    }


    return (
        <Box className={ "fileInput " + (props.color=="error"?"fileInputError": "")} >
            <input type="file" id="cvUpload" hidden { ...props } onChange={ (e) => {  props.onChange(e); fileNameChange(e, setFileName); } } />
            <label htmlFor="cvUpload" className='fileInputBody'>
                <div variant='contained' className='fileInputTitle'>{ props.title }</div>
                <Typography component={'span'} className='selectedFileName'>{fileName}</Typography>
            </label>
        </Box>
    )
}
export default FileInput;