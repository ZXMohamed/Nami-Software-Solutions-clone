// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";

// gsap.registerPlugin(SplitText, ScrollTrigger);

requestIdleCallback(async () => {
    const { default: gsap } = await import('gsap');
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { default: SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(SplitText, ScrollTrigger);
});