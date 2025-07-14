import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

// requestIdleCallback(async () => {
//     const { default: gsap } = await import('gsap');
//     const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
//     const { default: SplitText } = await import('gsap/SplitText');
//     const { default: TextPlugin } = await import('gsap/TextPlugin');
//     gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);
// });
