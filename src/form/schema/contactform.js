import zod from "zod";
import { messageRules, nameRules, phoneRules, subjectRules } from "../util/rules";

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
        name: zod.string()
            .nonempty(required)
            .min(nameRules.min, { message: length.less(name, nameRules.min) })
            .max(nameRules.max, { message: length.more(name, nameRules.max) })
            .refine((name) => pattern.name(name), { message: valid(name) }),
        subject: zod.string()
            .nonempty(required)
            .min(subjectRules.min, { message: length.less(subject, subjectRules.min) })
            .max(subjectRules.max, { message: length.more(subject, subjectRules.max) }),
        message: zod.string()
            .nonempty(required)
            .max(messageRules.max, { message: length.more(message, messageRules.max) }),
        phone: zod.string()
            .min(phoneRules.min, { message: required })
            .refine((phone) => pattern.phone(phone), { message: valid(phone) }),
        email: zod.string()
            .nonempty(required)
            .email(valid)
    });

}