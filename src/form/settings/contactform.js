export const createInputsSettings = (register) => ({
    name: register("name", { required: true }),
    subject: register("subject", { required: true }),
    phone: register("phone", { required: true }),
    email: register("email", { required: true }),
    message: register("message", { required: true }),
});
