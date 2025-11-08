//*aos
import { aosAnimationUp } from "../aos/aosprops";

export const productCardAosAnimation = (order) => ({
    ...aosAnimationUp,
    ["data-aos-delay"] : (100 * order).toString()
})