import zod from "zod";
import { fileRules, nameRules, phoneRules } from "../util/rules";

export function createZodObject(defaultContent, pattern) {
    
    const required = defaultContent.zodMsgs.required;
    const length = defaultContent.zodMsgs.length;
    const valid = defaultContent.zodMsgs.valid;
    const unknown = defaultContent.zodMsgs.unknown;
    const fileSize = defaultContent.zodMsgs.fileSize;

    const name = defaultContent.form.inputs.name;
    const phone = defaultContent.form.inputs.phone;
    const job = defaultContent.form.inputs.job;
    const email = defaultContent.form.inputs.jop;
    
    return zod.object({
        name: zod.string().nonempty(required).min(nameRules.min, { message: length.less(name, nameRules.min) }).max(nameRules.max, { message: length.more(name, nameRules.max) }).refine((name) => pattern.name(name), { message: valid(name) }),
        phone: zod.string().min(phoneRules.min, { message: required }).refine((phone) => pattern.phone(phone), { message: valid(phone) }),
        job: zod.string().refine((selectedJob) => selectedJob != "0", { message: required }),
        cvFile: zod.any().refine((files) => files.length > 0, { message: required }).refine((files) => files[0]?.size < fileRules.size, { message: fileSize(5) })
    });
}