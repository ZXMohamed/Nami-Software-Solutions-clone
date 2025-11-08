//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
//*aos
import { aosAnimationLeft, aosAnimationRight } from '../aos/aosprops';


export const movingImgSideAosAnimation = {
  ...aosAnimationRight
}
export const aboutTitleAosAnimation = {
  ...aosAnimationLeft,
  ["data-aos-delay"]:"50"
}
export const aboutDescriptionAosAnimation = {
  ...aosAnimationLeft,
  ["data-aos-delay"]:"80"
}
export const establishmentCounterAosAnimation = {
  ...aosAnimationLeft,
  ["data-aos-duration"]:"600",
  ["data-aos-delay"]:"80"
}
export const establishmentDateAosAnimation = {
  ...aosAnimationLeft,
  ["data-aos-duration"]:"600",
  ["data-aos-delay"]:"80"
}

export function imgMoveWithScroll(sideImgContainer,sideImg) {
  gsap.timeline({
    scrollTrigger: {
      trigger: sideImgContainer.current,
      scrub: 1,
      start: "top+=90 bottom",
      end: "top+=1000 bottom"
    },
  }).to(sideImg.current, {
    yPercent: -16,
  });
}
export function subtitleBackgroundMoveWithScroll(subtitle) {
  const subtitleLineSplit = new SplitText(subtitle.current, {
    type: "lines"
  });

  const subtitleLines = subtitleLineSplit.lines;
  gsap.to(subtitleLines, {
    backgroundPositionX: "100%",
    stagger: 1,
    ease: "power2.in",
    scrollTrigger: {
      trigger: subtitle.current,
      scrub: 1,
      start: "top+=0 bottom",
      end: "top+=400 bottom"
    }
  });
}
export function descriptionLinesUp(description) {
  const descriptionLineSplit = new SplitText(description.current, {
    type: "lines"
  });

  const descriptionLines = descriptionLineSplit.lines;
  gsap.from(descriptionLines, {
    scrollTrigger: {
      start: "top+=50 bottom",
      end: "top+=50 bottom",
      trigger: description.current,
    },
    duration: 0.5,
    opacity: 0,
    y: 80,
    stagger: 0.05
  });
}
export function establishmentDateCountUp(establishmentDate,establishment,finalValue) {
  gsap.to(establishmentDate.current, {
    scrollTrigger: {
      start: "top bottom",
      trigger: establishment.current,
    },
    textContent: finalValue,
    duration: 4,
    ease: "power2.in",
    snap: { textContent: 1 },
    stagger: 1,
  });
}