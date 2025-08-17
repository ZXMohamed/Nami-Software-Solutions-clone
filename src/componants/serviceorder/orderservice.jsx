//*react
import { memo, useContext, useMemo, useState } from "react";
//*mui
import { FormHelperText, MenuItem, Select, TextField } from "@mui/material";
//*component
import RequestButton from "../buttons/requestbutton";
import RequestForm from "../requestform";
//*queries
import { useGetServicesQuery, useOrderServiceMutation } from '../../redux/server state/services';
//*scripts
import { Language } from "../../languages/languagesContext";
//*form
import zod from "zod";


const OrderService = () => {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    // console.log(language);
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        zodMsgs: language.zodMsgs,
        buttons: {
            orderService: language_isSuccess ? language.serviceOrder.buttons.orderService : "Order The Service now"
        },
        form: {
            title: "",
            inputs: {
                name: language_isSuccess ? language.orderService.form.inputs.name : "Name",
                email: language_isSuccess ? language.orderService.form.inputs.email : "Email",
                phone: language_isSuccess ? language.orderService.form.inputs.phone : "Phone",
                service: language_isSuccess ? language.orderService.form.inputs.service : "Service"
            },
            alert: {
                success: language_isSuccess ? language.orderService.form.alert.success : "Order Sent Successfully.",
                error: language_isSuccess ? language.orderService.form.alert.error : "Order Failed.",
                reCaptcha: language_isSuccess ? language.orderService.form.alert.reCaptcha : "Please verify that you're not a robot."
            },
            submit: language_isSuccess ? language.orderService.form.submit : "Send"
        }
    }), [language, language_isSuccess]);

    const [serviceForm, setServiceForm] = useState(false);

    const [orderService, { isSuccess: orderService_isSuccess, isLoading: orderService_isLoading, isError: orderService_isError, reset: orderService_reset }] = useOrderServiceMutation();

    return (
        <>
            <RequestButton title={ defaultContent.buttons.orderService } className="serviceRequestButton" onClick={ () => setServiceForm(true) } { ...requestButtonAosAnimation } />
            { serviceForm && <RequestForm defaultContent={ defaultContent } formAdditionalInputs={ formAdditionalInputs } closeButton={ () => { setServiceForm(false); orderService_reset(); } } form_isLoading={ orderService_isLoading } form_isSuccess={ orderService_isSuccess } form_isError={ orderService_isError } submit={ orderService }/> }
        </>
    );
};

export default OrderService


const formAdditionalInputs = [
    {
        name: "service",
        inputSettings: {
            required: true
        },
        schema: (defaultContent) => {

            const required = defaultContent.zodMsgs.required;
            const length = defaultContent.zodMsgs.length;

            const service = defaultContent.form.inputs.service;

            return zod.string().refine((selectedService) => selectedService != "0", { message: required })
        },
        input: (props) => <SelectInput { ...props }  />
        
    }
]

function SelectInput(props) {
    console.log(props);
    
    const selectInputProps = { ...props };
    delete selectInputProps?.helperText;

    const { data: services, isSuccess: services_isSuccess } = useGetServicesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const [service, setService] = useState("0");

    return (
        <>
            <Select variant='outlined' color="error" { ...selectInputProps } defaultValue={ '0' } value={ service } onChange={ (e) => { selectInputProps.onChange(e); setService(e.target.value); }}>
                {/* <MenuItem value={"0"}>{props.title}</MenuItem> */}
                { services_isSuccess && Object.values(services).map((services, inx) => <MenuItem key={ services.id } value={ { id: services.id, service : services.title } }>{services.title}</MenuItem>)}
            </Select>
            { props.helperText && <FormHelperText>{ props.helperText }</FormHelperText> }
        </>
    )
}

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000",
}
const requestButtonAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "200"
}