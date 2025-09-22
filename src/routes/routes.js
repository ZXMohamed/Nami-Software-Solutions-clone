import { defaultLanguage } from "../languages/languagesContext";

export const main_routes = (urlLang = defaultLanguage) => ({
    "Home": { link: "#Home", outerRoute: false },
    "About us": { link: "#Aboutus", outerRoute: false },
    "Services": { link: "#Services", outerRoute: false },
    "Our products": { link: "/products/" + urlLang, outerRoute: true },
    "Portfolio": { link: "/portfolio/" + urlLang, outerRoute: true },
    "Marketing": { link: "/marketing/" + urlLang, outerRoute: true },
    "Blogs": { link: "/blogs/" + urlLang, outerRoute: true },
    "Careers": { link: "#Careers", outerRoute: false },
    "Contact us": { link: "#Contactus", outerRoute: false },
});

export const pages_routes = (urlLang = defaultLanguage, id) => ({
    "Home": { link: "/" + urlLang + "/" + "#Home", outerRoute: true },
    "About us": { link: "/" + urlLang + "/" + "#Aboutus", outerRoute: true },
    "Services": { link: "/" + urlLang + "/" + "#Services", outerRoute: true },
    "Our products": { link: "/products/" + urlLang, outerRoute: true },
    "Portfolio": { link: "/portfolio/" + urlLang, outerRoute: true },
    "Marketing": { link: "/marketing/" + urlLang, outerRoute: true },
    "Blogs": { link: "/blogs/" + urlLang, outerRoute: true },
    "Careers": { link: "/" + urlLang + "/" + "#Careers", outerRoute: true },
    "Contact us": { link: "/" + urlLang + "/" + "#Contactus", outerRoute: true },
    
    "Service details": { link: "/" + urlLang + "/" + "all-services" + "/" + id, outerRoute: true },
    "Product details": { link: "/" + urlLang + "/" + "product-details" + "/" + id, outerRoute: true },
    "Project details": { link: "/" + urlLang + "/" + "portfolio" + "/" + id, outerRoute: true },
});