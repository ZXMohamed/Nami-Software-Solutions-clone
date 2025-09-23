import { getPage } from "../../../routes/routesmanager";

export const activeTabAnimation = (tab, location) => {
    
    const sectionsList = ["Home", "About us", "Services", "Our products", "Portfolio", "Careers", "Contact us"];

    if (getPage(location) == "main") {        
        if (sectionsList.includes(tab)) {
            return {
                ["data-aos"]: "activeTab",
                ["data-aos-once"]: "false",
                ["data-aos-anchor-placement"]: "top-top",
                ["data-aos-anchor"]: "#" + tab.replace(" ", ""),
                ["data-aos-mirror"]: "true"
            }
        } else {
            return {}
        }
    }

}