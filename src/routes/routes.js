import { defaultLanguage } from "../languages/languagesContext";

export const main_routes = (urlLang = defaultLanguage) => ({
    "home": { link: "#home", outerRoute: false },
    "about us": { link: "#aboutus", outerRoute: false },
    "services": { link: "#services", outerRoute: false },
    "our products": { link:"/"+ urlLang + "/products/", outerRoute: true },
    "portfolio": { link:"/"+ urlLang + "/portfolio/", outerRoute: true },
    "marketing": { link:"/"+ urlLang + "/marketing/", outerRoute: true },
    "blogs": { link:"/"+ urlLang + "/blogs/", outerRoute: true },
    "careers": { link: "#careers", outerRoute: false },
    "contact us": { link: "#contactus", outerRoute: false },
});

export const pages_routes = (urlLang = defaultLanguage, id = "") => ({
    "home": { link: "/" + urlLang + "/" + "#home", outerRoute: true },
    "about us": { link: "/" + urlLang + "/" + "#aboutus", outerRoute: true },
    "services": { link: "/" + urlLang + "/" + "#services", outerRoute: true },
    "our products": { link: "/" + urlLang + "/products/", outerRoute: true },
    "portfolio": { link: "/" + urlLang + "/portfolio/", outerRoute: true },
    "marketing": { link: "/" + urlLang + "/marketing/", outerRoute: true },
    "blogs": { link: "/" + urlLang + "/blogs/", outerRoute: true },
    "careers": { link: "/" + urlLang + "/" + "#careers", outerRoute: true },
    "contact us": { link: "/" + urlLang + "/" + "#contactus", outerRoute: true },
    
    "service details": { link: "/" + urlLang + "/" + "all-services" + "/" + id, outerRoute: true },
    "product details": { link: "/" + urlLang + "/" + "product-details" + "/" + id, outerRoute: true },
    "project details": { link: "/" + urlLang + "/" + "project-details" + "/" + id, outerRoute: true },
});