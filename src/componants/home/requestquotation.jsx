//*react
import { memo, useContext, useMemo, useState } from "react";
//*component
import RequestButton from "../buttons/requestbutton";
import RequestQuotationForm from "./requestquotationform";
//*scripts
import { Language } from "../../languages/languagesContext";


const RequestQuotation = () => {
    console.log("homeRQ");

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        buttons: {
            requestQuotation: language_isSuccess ? language.home.buttons.requestQuotation : "Request for Quotation"
        }
    }), [language, language_isSuccess]);

    const [requestFormOpen, setRequestFormOpen] = useState(false);
    
    return (
        <>
            <RequestButton title={ defaultContent.buttons.requestQuotation } className="homeRequestButton" onClick={ () => setRequestFormOpen(true) } />
            { requestFormOpen && <RequestQuotationForm closeButton={ () => setRequestFormOpen(false) } /> }
        </>
    );
};

export default RequestQuotation