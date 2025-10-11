export function createInputsSettings(register) {
    return {
        name: register("name", { required: true }),
        phone: register("phone", { required: true }),
        email: register("email", { required: true }),
    }
}