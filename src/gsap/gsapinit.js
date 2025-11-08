const { default: gsap } = await import('gsap');
const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
const { default: SplitText } = await import('gsap/SplitText');
gsap.registerPlugin(SplitText, ScrollTrigger);
