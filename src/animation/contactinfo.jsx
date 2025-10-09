//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { aosAnimationLeft, aosAnimationRight } from '../aos/aosprops';


export const titleAosAnimation = {
    ...aosAnimationRight,
    ["data-aos-delay"]:"50"
}
export const subtitleAosAnimation = {
    ...aosAnimationRight,
    ["data-aos-delay"]:"100"
}
export const descriptionAosAnimation = {
    ...aosAnimationLeft,
    ["data-aos-delay"]:"150"
}
export const contactMethodItemAosAnimation = (order) => ({
    ...aosAnimationLeft,
    ["data-aos-delay"]: (150 * order).toString()
})

export function titleWordsUp(contactTitle) {
    const contactTitleSplit = new SplitText(contactTitle.current, {
        type: "words"
    });
    gsap.to(contactTitleSplit.words, {
            scrollTrigger: {
                trigger: contactTitle.current,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.05,
        }
    );
}
export function subtitleWordsUp(contactSubtitle) {
    const contactSubtitleSplit = new SplitText(contactSubtitle.current, {
        type: "lines"
    });
    gsap.to(contactSubtitleSplit.lines, {
            scrollTrigger: {
                trigger: contactSubtitle.current,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.1,
        }
    );
}
export function descriptionWordsUp(contactDescription) {
    const contactDescriptionSplit = new SplitText(contactDescription.current, {
        type: "words"
    });
    gsap.to(contactDescriptionSplit.words, {
        scrollTrigger: {
        trigger: contactDescription.current,
            scrub:5,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.05,
        }
    );
}