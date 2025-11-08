//*aos
import { aosAnimationUp } from "../aos/aosprops";

export const projectCardAosAnimation = (order)=>({
    ...aosAnimationUp,
    ["data-aos-delay"]: (100 * order).toString()
})
