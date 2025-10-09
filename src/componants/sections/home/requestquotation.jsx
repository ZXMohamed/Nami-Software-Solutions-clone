//*react
import { useState } from "react";
//*mui
import { TextField } from "@mui/material";
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*component
import RequestButton from "../../shared/buttons/requestbutton";
import RequestForm from "../../forms/requestform";
//*queries
import { useRequestQuotationMutation } from '../../../redux/server state/requestquotation';
//*form
import zod from "zod";


const RequestQuotation = () => {
    console.log("homeRQ");

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                zodMsgs: content.zodMsgs,
                buttons: {
                    requestQuotation: content.home.buttons.requestQuotation
                },
                form: {
                    title: "",
                    inputs: {
                        name: content.requestQuotation.form.inputs.name,
                        email: content.requestQuotation.form.inputs.email,
                        phone: content.requestQuotation.form.inputs.phone,
                        description: content.requestQuotation.form.inputs.description
                    },
                    alert: {
                        success: content.requestQuotation.form.alert.success,
                        error: content.requestQuotation.form.alert.error,
                        reCaptcha: content.requestQuotation.form.alert.reCaptcha
                    },
                    submit: content.requestQuotation.form.submit
                }
            }
        } else {
            return { ...firstContent, zodMsgs: content.zodMsgs };
        }
    })();

    const [requestFormOpen, setRequestFormOpen] = useState(false);

    const [requestQuotation, { isSuccess: requestQuotation_isSuccess, isLoading: requestQuotation_isLoading, isError: requestQuotation_isError, reset: requestQuotation_reset }] = useRequestQuotationMutation();

    return (
        <>
            <RequestButton title={ defaultContent.buttons.requestQuotation } className="homeRequestButton" onClick={ () => setRequestFormOpen(true) } />
            { requestFormOpen && <RequestForm defaultContent={ defaultContent } formAdditionalInputs={ formAdditionalInputs } closeButton={ () => {setRequestFormOpen(false); requestQuotation_reset();} } form_isLoading={ requestQuotation_isLoading } form_isSuccess={ requestQuotation_isSuccess } form_isError={ requestQuotation_isError } submit={ requestQuotation } /> }
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

const firstContent = {
    direction: "ltr",
    language: "en",
    buttons: {
        requestQuotation:  "Request for Quotation"
    },
    form: {
        title: "",
        inputs: {
            name:  "Name",
            email: "Email",
            phone:  "Phone",
            description:"Description"
        },
        alert: {
            success: "Request Sent Successfully.",
            error:  "Request Failed.",
            reCaptcha:"Please verify that you're not a robot."
        },
        submit: "Send"
    }
}