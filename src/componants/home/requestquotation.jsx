//*react
import { memo, useContext, useMemo, useState } from "react";
//*mui
import { TextField } from "@mui/material";
//*component
import RequestButton from "../buttons/requestbutton";
import RequestQuotationForm from "../requestform";
//*queries
import { useRequestQuotationMutation } from '../../redux/server state/requestquotation';
//*scripts
import { Language } from "../../languages/languagesContext";
//*form
import zod from "zod";


const RequestQuotation = () => {
    console.log("homeRQ");

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    // console.log(language);
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        zodMsgs: language.zodMsgs,
        buttons: {
            requestQuotation: language_isSuccess ? language.home.buttons.requestQuotation : "Request for Quotation"
        },
        form: {
            title: "",
            inputs: {
                name: language_isSuccess ? language.requestQuotation.form.inputs.name : "Name",
                email: language_isSuccess ? language.requestQuotation.form.inputs.email : "Email",
                phone: language_isSuccess ? language.requestQuotation.form.inputs.phone : "Phone",
                description: language_isSuccess ? language.requestQuotation.form.inputs.description : "Description"
            },
            alert: {
                success: language_isSuccess ? language.requestQuotation.form.alert.success : "Request Sent Successfully.",
                error: language_isSuccess ? language.requestQuotation.form.alert.error : "Request Failed.",
                reCaptcha: language_isSuccess ? language.requestQuotation.form.alert.reCaptcha : "Please verify that you're not a robot."
            },
            submit: language_isSuccess ? language.requestQuotation.form.submit : "Send"
        }
    }), [language, language_isSuccess]);

    const [requestFormOpen, setRequestFormOpen] = useState(false);

    const [requestQuotation, { isSuccess: requestQuotation_isSuccess, isLoading: requestQuotation_isLoading, isError: requestQuotation_isError }] = useRequestQuotationMutation();

    return (
        <>
            <RequestButton title={ defaultContent.buttons.requestQuotation } className="homeRequestButton" onClick={ () => setRequestFormOpen(true) } />
            { requestFormOpen && <RequestQuotationForm defaultContent={ defaultContent } formAdditionalInputs={ formAdditionalInputs } closeButton={ () => setRequestFormOpen(false) } form_isLoading={ requestQuotation_isLoading } form_isSuccess={ requestQuotation_isSuccess } form_isError={ requestQuotation_isError } submit={ requestQuotation } /> }
        </>
    );
};

export default RequestQuotation


const formAdditionalInputs = [
    {
        name: "description",
        inputSettings: {
            required: true
        },
        schema: (defaultContent) => {

            const required = defaultContent.zodMsgs.required;
            const length = defaultContent.zodMsgs.length;

            const description = defaultContent.form.inputs.description;

            return zod.string().nonempty(required).max(500, { message: length.more(description, 500) })
        },
        input: (props) => <TextField multiline maxRows={ 6 } minRows={ 2 } { ...props } /> 
        
    }
]