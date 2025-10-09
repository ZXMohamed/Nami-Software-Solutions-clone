import zod from "zod";

export function createZodObject(defaultContent, pattern, additionalInputsSchema) {

    const required = defaultContent.zodMsgs.required;
    const length = defaultContent.zodMsgs.length;
    const valid = defaultContent.zodMsgs.valid;

    const name = defaultContent.form.inputs.name;
    const phone = defaultContent.form.inputs.phone;
    const email = defaultContent.form.inputs.email;

    return zod.object({
        name: zod.string().nonempty(required).min(3, { message: length.less(name, 3) }).max(100, { message: length.more(name, 100) }).refine((name) => pattern.name(name), { message: valid(name) }),
        phone: zod.string().min(1, { message: required }).refine((phone) => pattern.phone(phone), { message: valid(phone) }),
        email: zod.string().nonempty(required).email(valid(email)),
        ...additionalInputsSchema
    });
}