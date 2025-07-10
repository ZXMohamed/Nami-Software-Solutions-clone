export const pattern = {
    name:(name)=>name.match(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
    phone:(phone)=>phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
}

export const zodMsgs = {
    required: "This is a required field",
    length: { less: (input,num)=>`${input} less than ${num} chars`, more: (input,num)=>`${input} more than ${num} chars` },
    valid: (input) => `this ${input} is not valid`,
    unknown: (input) => `unknown ${input}`,
    fileSize: (size) => `file is bigger than ${size}MB`
}
