//*react
import { useState } from "react";
//*mui
import { FormHelperText, MenuItem, Select } from "@mui/material";
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*component
import RequestButton from "../../shared/buttons/requestbutton";
import RequestForm from "../../forms/requestform";
//*queries
import { useGetServicesQuery, useOrderServiceMutation } from '../../../redux/server state/services';
//*scripts
import { defaultLanguage } from "../../../languages/languagesContext";
//*form
import zod from "zod";
//*animation
import { requestButtonAosAnimation } from "../../../animation/orderservice";


const OrderService = () => {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                zodMsgs: content.zodMsgs,
                buttons: {
                    orderService: content.serviceOrder.buttons.orderService
                },
                form: {
                    title: "",
                    inputs: {
                        name: content.orderService.form.inputs.name,
                        email: content.orderService.form.inputs.email,
                        phone: content.orderService.form.inputs.phone,
                        service: content.orderService.form.inputs.service
                    },
                    alert: {
                        success: content.orderService.form.alert.success,
                        error: content.orderService.form.alert.error,
                        reCaptcha: content.orderService.form.alert.reCaptcha
                    },
                    submit: content.orderService.form.submit
                }
            }
        } else {
            return { ...firstContent, zodMsgs: content.zodMsgs }
        }
    })();

    const [openForm, setOpenForm] = useState(false);

    const [orderService, { isSuccess: orderService_isSuccess, isLoading: orderService_isLoading, isError: orderService_isError, reset: orderService_reset }] = useOrderServiceMutation();

    return (
        <>
            <RequestButton title={ defaultContent.buttons.orderService } className="serviceRequestButton" onClick={ () => setOpenForm(true) } { ...requestButtonAosAnimation } />
            { openForm && <RequestForm defaultContent={ defaultContent } formAdditionalInputs={ formAdditionalInputs } closeButton={ () => { setOpenForm(false); orderService_reset(); } } form_isLoading={ orderService_isLoading } form_isSuccess={ orderService_isSuccess } form_isError={ orderService_isError } submit={ orderService }/> }
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
            const service = defaultContent.form.inputs.service;

            return zod.string().refine((selectedService) => selectedService != "0", { message: required })
        },
        input: (props) => <SelectInput { ...props }  />
        
    }
]

function SelectInput(props) {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = {
        direction: content_isSuccess ? content.page.direction : "ltr",
        language: content_isSuccess ? content.page.language : defaultLanguage
    };

    const selectInputProps = { ...props };
    delete selectInputProps?.helperText;

    const { data: services, isSuccess: services_isSuccess, refetch: services_refetch } = useGetServicesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data }),
        refetchOnMountOrArgChange: true
    });

    const [service, setService] = useState("0");

    return (
        <>
            <Select variant='outlined' { ...selectInputProps } value={ service } onChange={ (e) => { selectInputProps.onChange(e); setService(e.target.value); }}>
                { services_isSuccess && Object.values(services).map((services, inx) => <MenuItem dir={defaultContent.direction} key={ services.id } value={ services.id }>{services.title}</MenuItem>)}
            </Select>
            { props.helperText && <FormHelperText>{ props.helperText }</FormHelperText> }
        </>
    )
}

const firstContent = {
    direction: "ltr",
    language: "en",
    buttons: {
        orderService: "Order The Service now"
    },
    form: {
        title: "",
        inputs: {
            name: "Name",
            email: "Email",
            phone: "Phone",
            service: "Service"
        },
        alert: {
            success: "Order Sent Successfully.",
            error: "Order Failed.",
            reCaptcha: "Please verify that you're not a robot."
        },
        submit: "Send"
    }
}