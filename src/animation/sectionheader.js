//*gsap
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { aosAnimationLeft, aosAnimationUp } from "../aos/aosprops";


export const sectionHeaderTitleAosAnimation = {
    ...aosAnimationLeft,
    ["data-aos-delay"]:"50"
}
export const containerAosAnimation = {
    ...aosAnimationUp,
    ["data-aos-delay"]:"100"
}


export function titleWordsUP(headerTitle) {

    const headerTitleSplit = new SplitText(headerTitle.current, {
        type: "words"
    });

    gsap.to(headerTitleSplit.words, {
        scrollTrigger: {
            trigger: headerTitle.current,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.15,
    });
   
}
export function subtitleWordsUP(headerSubtitle) {

    const headerSubtitleSplit = new SplitText(headerSubtitle.current, {
        type: "words"
    });

    gsap.to(headerSubtitleSplit.words, {
        scrollTrigger: {
            trigger: headerSubtitle.current,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.1,
    });

}