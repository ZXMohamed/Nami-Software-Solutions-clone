export const createInputsSettings = (register, lastInputChanged) => ({
    name: register("name", { required: true, onChange: () => { lastInputChanged.current = "name"; } }),
    phone: register("phone", { required: true, onChange: () => { lastInputChanged.current = "phone"; } }),
    job: register("job", { required: true, onChange: () => { lastInputChanged.current = "job"; } }),
    cvFile: register("cvFile", { required: true, onChange: () => { lastInputChanged.current = "cvFile"; } }),
});