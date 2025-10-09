//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

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
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.05,
    });
}
export function showObjectivesOnHover(itemObjectives) {
    const itemObjectivesAnimate = gsap.to(itemObjectives.current.querySelectorAll("li"), {
        stagger: 0.1,
        transform: "translateX(0px)",
        filter: "opacity(100%)",
        duration: 0.6,
        paused: true
    });
    itemObjectives.current.parentElement.onmouseover = ()=>itemObjectivesAnimate.restart();
    itemObjectives.current.parentElement.onmouseleave = ()=>itemObjectivesAnimate.kill();
}

export const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "600"
}
export const servicesTitleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "50"
}
export const servicesSubtitleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "100"
}
export const servicesDescriptionAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "150"
}
export const serviceCardAosAnimation = (order) => ({
    ...aosAnimation,
    ["data-aos-delay"]: (order * 100).toString()
})