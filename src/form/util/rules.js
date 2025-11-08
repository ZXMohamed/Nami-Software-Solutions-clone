export const pattern = {
    name: (name) => name.match(/^\p{L}+(?:[ '\-]\p{L}+)*$/u),
    phone: (phone) => phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
}

export const nameRules = {
    min: 3,
    max: 100
}
export const phoneRules = {
    min: 1
}
export const subjectRules = {
    min: 3,
    max: 100
}
export const messageRules = {
    max: 500
}
export const fileRules = {
    size: 5 * 1024 * 1024
}

