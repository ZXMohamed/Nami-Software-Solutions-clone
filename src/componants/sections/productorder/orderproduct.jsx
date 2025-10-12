//*react
import { useContext, useMemo, useState } from "react";
//*mui
import { FormHelperText, MenuItem, Select } from "@mui/material";
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*component
import RequestButton from "../../shared/buttons/requestbutton";
import RequestForm from "../../forms/requestform";
//*queries
import { useGetProductsQuery, useOrderProductMutation } from '../../../redux/server state/products';
//*scripts
import { defaultLanguage, Language } from "../../../languages/languagesContext";
//*form
import zod from "zod";
//*animation
import { requestButtonAosAnimation } from "../../../animation/orderproduct";


const OrderProduct = () => {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                zodMsgs: content.zodMsgs,
                buttons: {
                    orderProduct: content.buttons.orderProduct,
                },
                form: {
                    title: "",
                    inputs: {
                        name: content.orderProduct.form.inputs.name,
                        email: content.orderProduct.form.inputs.email,
                        phone: content.orderProduct.form.inputs.phone,
                        product: content.orderProduct.form.inputs.product
                    },
                    alert: {
                        success: content.orderProduct.form.alert.success,
                        error: content.orderProduct.form.alert.error,
                        reCaptcha: content.orderProduct.form.alert.reCaptcha
                    },
                    submit: content.orderProduct.form.submit
                }
            }
        } else {
            return { ...firstContent, zodMsgs: content.zodMsgs }
        }
    })();

    const [productForm, setProductForm] = useState(false);

    const [orderProduct, { isSuccess: orderProduct_isSuccess, isLoading: orderProduct_isLoading, isError: orderProduct_isError, reset: orderProduct_reset }] = useOrderProductMutation();

    return (
        <>
            <RequestButton title={ defaultContent.buttons.orderProduct } className="productRequestButton" onClick={ () => setProductForm(true) } { ...requestButtonAosAnimation } />
            { productForm && <RequestForm defaultContent={ defaultContent } formAdditionalInputs={ formAdditionalInputs } closeButton={ () => { setProductForm(false); orderProduct_reset(); } } form_isLoading={ orderProduct_isLoading } form_isSuccess={ orderProduct_isSuccess } form_isError={ orderProduct_isError } submit={ orderProduct }/> }
        </>
    );
};

export default OrderProduct;


const formAdditionalInputs = [
    {
        name: "product",
        inputSettings: {
            required: true
        },
        schema: (defaultContent) => {

            const required = defaultContent.zodMsgs.required;
            const product = defaultContent.form.inputs.product;

            return zod.string().refine((selectedProduct) => selectedProduct != "0", { message: required })
        },
        input: (props) => <SelectInput { ...props }  />
        
    }
]

function SelectInput(props) {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
    }), [language, language_isSuccess]);

    const selectInputProps = { ...props };
    delete selectInputProps?.helperText;

    const { data: products, isSuccess: products_isSuccess } = useGetProductsQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data }),
        refetchOnMountOrArgChange: true
    });

    const [product, setProduct] = useState("0");

    return (
        <>
            <Select variant='outlined' { ...selectInputProps } value={ product } onChange={ (e) => { selectInputProps.onChange(e); setProduct(e.target.value); }}>
                {/* <MenuItem value={"0"}>{props.title}</MenuItem> */}
                { products_isSuccess && Object.values(products).map((product, inx) => <MenuItem dir={defaultContent.direction} key={ product.id } value={ product.id }>{product.title}</MenuItem>)}
            </Select>
            { props.helperText && <FormHelperText>{ props.helperText }</FormHelperText> }
        </>
    )
}

const firstContent = {
    direction: "ltr",
    language: defaultLanguage,
    buttons: {
        orderProduct: "Request a trial version",
    },
    form: {
        title: "",
        inputs: {
            name: "Name",
            email: "Email",
            phone: "Phone",
            product: "Product"
        },
        alert: {
            success: "Order Sent Successfully.",
            error: "Order Failed.",
            reCaptcha: "Please verify that you're not a robot."
        },
        submit: "Send"
    }
}