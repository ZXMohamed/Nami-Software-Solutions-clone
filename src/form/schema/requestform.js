import zod from "zod";
import { nameRules, phoneRules } from "../util/rules";

export function createZodObject(defaultContent, pattern, additionalInputsSchema) {

    const required = defaultContent.zodMsgs.required;
    const length = defaultContent.zodMsgs.length;
    const valid = defaultContent.zodMsgs.valid;

    const name = defaultContent.form.inputs.name;
    const phone = defaultContent.form.inputs.phone;
    const email = defaultContent.form.inputs.email;

    return zod.object({
        name: zod.string().nonempty(required).min(nameRules.min, { message: length.less(name, nameRules.min) }).max(nameRules.max, { message: length.more(name, nameRules.max) }).refine((name) => pattern.name(name), { message: valid(name) }),
        phone: zod.string().min(phoneRules.min, { message: required }).refine((phone) => pattern.phone(phone), { message: valid(phone) }),
        email: zod.string().nonempty(required).email(valid(email)),
        ...additionalInputsSchema
    });
}