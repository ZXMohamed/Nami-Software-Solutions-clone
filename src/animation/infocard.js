//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { aosAnimationUp } from '../aos/aosprops';


export const infoCardAosAnimation = {
  ...aosAnimationUp,
  ["data-aos-delay"]:"50"
}

export function descriptionWordsUP(description) {
    const descriptionSplit = new SplitText(description.current, {
        type: "words"
    });

    gsap.to(descriptionSplit.words, {
        scrollTrigger: {
            trigger: description.current,
            scrub: 5,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:1,
        y: 0,
        opacity:1,
        stagger: 0.05,
    });
}