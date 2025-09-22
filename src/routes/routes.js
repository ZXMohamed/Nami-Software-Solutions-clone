import { defaultLanguage } from "../languages/languagesContext";

export const main_routes = (urlLang = defaultLanguage) => ({
    "Home": { link: "#Home", outerRoute: false },
    "About us": { link: "#Aboutus", outerRoute: false },
    "Services": { link: "#Services", outerRoute: false },
    "Our products": { link:"/"+ urlLang + "/products/", outerRoute: true },
    "Portfolio": { link:"/"+ urlLang + "/portfolio/", outerRoute: true },
    "Marketing": { link:"/"+ urlLang + "/marketing/", outerRoute: true },
    "Blogs": { link:"/"+ urlLang + "/blogs/", outerRoute: true },
    "Careers": { link: "#Careers", outerRoute: false },
    "Contact us": { link: "#Contactus", outerRoute: false },
});

export const pages_routes = (urlLang = defaultLanguage, id) => ({
    "Home": { link: "/" + urlLang + "/" + "#Home", outerRoute: true },
    "About us": { link: "/" + urlLang + "/" + "#Aboutus", outerRoute: true },
    "Services": { link: "/" + urlLang + "/" + "#Services", outerRoute: true },
    "Our products": { link: "/" + urlLang + "/products/", outerRoute: true },
    "Portfolio": { link: "/" + urlLang + "/portfolio/", outerRoute: true },
    "Marketing": { link: "/" + urlLang + "/marketing/", outerRoute: true },
    "Blogs": { link: "/" + urlLang + "/blogs/", outerRoute: true },
    "Careers": { link: "/" + urlLang + "/" + "#Careers", outerRoute: true },
    "Contact us": { link: "/" + urlLang + "/" + "#Contactus", outerRoute: true },
    
    "Service details": { link: "/" + urlLang + "/" + "all-services" + "/" + id, outerRoute: true },
    "Product details": { link: "/" + urlLang + "/" + "product-details" + "/" + id, outerRoute: true },
    "Project details": { link: "/" + urlLang + "/" + "portfolio" + "/" + id, outerRoute: true },
});