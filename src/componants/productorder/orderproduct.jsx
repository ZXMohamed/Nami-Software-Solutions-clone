//*react
import { memo, useContext, useMemo, useState } from "react";
//*mui
import { FormHelperText, MenuItem, Select, TextField } from "@mui/material";
//*component
import RequestButton from "../buttons/requestbutton";
import RequestForm from "../requestform";
//*queries
import { useGetProductsQuery, useOrderServiceMutation } from '../../redux/server state/products';
//*scripts
import { Language } from "../../languages/languagesContext";
//*form
import zod from "zod";


const OrderProduct = () => {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    // console.log(language);
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        zodMsgs: language.zodMsgs,
        buttons: {
            orderProduct: language_isSuccess ? language.buttons.orderProduct : "Request a trial version",
        },
        form: {
            title: "",
            inputs: {
                name: language_isSuccess ? language.orderProduct.form.inputs.name : "Name",
                email: language_isSuccess ? language.orderProduct.form.inputs.email : "Email",
                phone: language_isSuccess ? language.orderProduct.form.inputs.phone : "Phone",
                product: language_isSuccess ? language.orderProduct.form.inputs.product : "Product"
            },
            alert: {
                success: language_isSuccess ? language.orderProduct.form.alert.success : "Order Sent Successfully.",
                error: language_isSuccess ? language.orderProduct.form.alert.error : "Order Failed.",
                reCaptcha: language_isSuccess ? language.orderProduct.form.alert.reCaptcha : "Please verify that you're not a robot."
            },
            submit: language_isSuccess ? language.orderProduct.form.submit : "Send"
        }
    }), [language, language_isSuccess]);

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
        name: "service",
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
    console.log(props);

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
    }), [language, language_isSuccess]);

    const selectInputProps = { ...props };
    delete selectInputProps?.helperText;

    const { data: products, isSuccess: products_isSuccess } = useGetProductsQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const [product, setProduct] = useState("0");

    return (
        <>
            <Select variant='outlined' { ...selectInputProps } value={ service } onChange={ (e) => { selectInputProps.onChange(e); setProduct(e.target.value); }}>
                {/* <MenuItem value={"0"}>{props.title}</MenuItem> */}
                { products_isSuccess && Object.values(products).map((product, inx) => <MenuItem dir={defaultContent.direction} key={ product.id } value={ product.id }>{product.title}</MenuItem>)}
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