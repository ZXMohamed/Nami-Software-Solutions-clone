export const pattern = {
    name: (name) => name.match(/^\p{L}+(?:[ '\-]\p{L}+)*$/u),
    phone: (phone) => phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
}