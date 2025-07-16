// import AOS from "aos";

// AOS.init({ once: true, offset: 65 });

requestIdleCallback(async () => {
    const { default: AOS } = await import('aos');
    AOS.init({ once: true, offset: 65 });
});