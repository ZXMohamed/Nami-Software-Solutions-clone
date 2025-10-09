import zod from "zod";

export function createZodObject(defaultContent, pattern) {

    const required = defaultContent.zodMsgs.required;
    const length = defaultContent.zodMsgs.length;
    const valid = defaultContent.zodMsgs.valid;

    const name = defaultContent.form.inputs.name;
    const subject = defaultContent.form.inputs.subject;
    const message = defaultContent.form.inputs.message;
    const phone = defaultContent.form.inputs.phone;
    const email = defaultContent.form.inputs.email;

    return zod.object({
        name: zod.string().nonempty(required).min(3, { message: length.less(name,3) }).max(100, { message: length.more(name,100) }).refine((name) => pattern.name(name), { message: valid(name) }),
        subject: zod.string().nonempty(required).min(3, { message: length.less(subject,3) }).max(100, { message: length.more(subject,100) }),
        message: zod.string().nonempty(required).max(500, { message: length.more(message,500) }),
        phone: zod.string().min(1, { message: required }).refine((phone) => pattern.phone(phone), { message: valid(phone) }),
        email: zod.string().nonempty(required).email(valid)
    });

}