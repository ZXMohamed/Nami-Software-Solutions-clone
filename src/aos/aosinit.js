const { default: AOS } = await import('aos');
AOS.init({ once: true, offset: 65, duration: 1000 });