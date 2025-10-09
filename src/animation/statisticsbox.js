//*gsap
import gsap from 'gsap'

export const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000"
}
export const statisticsBoxAosAnimation = (order) => ({
    ...aosAnimation,
    ["data-aos-delay"]: (100 * order).toString()
})

export function countUp(statisticValue,maxValue) { 
    gsap.to(statisticValue.current, {
        scrollTrigger: {
            start: "top bottom",
            trigger: statisticValue.current,
        },
        textContent: maxValue,
        duration: 4,
        snap: { textContent: 1 },
        stagger: 1,
    });
}