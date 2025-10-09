export const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000"
} 
export const projectCardAosAnimation = (order)=>({
    ...aosAnimation,
    ["data-aos-delay"]: (100 * order).toString()
})
