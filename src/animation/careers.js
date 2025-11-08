//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
//*aos
import { aosAnimationLeft } from '../aos/aosprops';


export const titleAosAnimation = {
    ...aosAnimationLeft,
    ["data-aos-delay"]:"50"
}
export const subtitleAosAnimation = {
    ...aosAnimationLeft,
    ["data-aos-delay"]:"100"
}
export const descriptionAosAnimation = {
    ...aosAnimationLeft,
    ["data-aos-delay"]:"150"
}

export function titleWordsUp(careersTitle) {
    const careersTitleSplit = new SplitText(careersTitle.current, {
        type: "words"
    });
    gsap.to(careersTitleSplit.words, {
            scrollTrigger: {
                trigger: careersTitle.current,
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
export function subtitleWordsUp(careersSubtitle) {
    const careersSubtitleSplit = new SplitText(careersSubtitle.current, {
        type: "words"
    });
    gsap.to(careersSubtitleSplit.words, {
            scrollTrigger: {
                trigger: careersSubtitle.current,
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
export function descriptionWordsUp(careersDescription) {
    const careersDescriptionSplit = new SplitText(careersDescription.current, {
        type: "words"
    });
    
    gsap.to(careersDescriptionSplit.words, {
        scrollTrigger: {
            trigger: careersDescription.current,
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