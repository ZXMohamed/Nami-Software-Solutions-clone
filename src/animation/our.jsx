export const aosAnimation = {
  ["data-aos"]: 'fade-up',
  ["data-aos-duration"]:"600"
}
export const ourVisionAosAnimation = {
  ...aosAnimation
}
export const ourMessageAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]:"50"
}
export const ourValuesAosAnimation = {
  ...aosAnimation,
}
export const valueBoxAosAnimation = (order)=> ({
  ...aosAnimation,
  ["data-aos-delay"]: (50 * order).toString()
})