// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";

// gsap.registerPlugin(SplitText, ScrollTrigger);

requestIdleCallback(async () => {
    const { default: gsap } = await import('gsap');
    const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { default: SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(SplitText, ScrollTrigger);
});
gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);