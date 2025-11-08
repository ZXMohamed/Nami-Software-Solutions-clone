//*aos
import { aosAnimationLeft, aosAnimationRight, aosAnimationUp } from "../aos/aosprops"

export const ourVisionAosAnimation = {
  ...aosAnimationRight
}
export const ourMessageAosAnimation = {
  ...aosAnimationLeft,
  ["data-aos-delay"]:"50"
}
export const ourValuesAosAnimation = {
  ...aosAnimationUp,
}
export const valueBoxAosAnimation = (order)=> ({
  ...aosAnimationUp,
  ["data-aos-delay"]: (50 * order).toString()
})