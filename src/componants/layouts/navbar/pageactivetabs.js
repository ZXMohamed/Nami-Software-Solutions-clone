export const activeTabAnimation = (tab) => {
    
    const sectionsList = ["Home", "About us", "Services", "Our products", "Portfolio", "Careers", "Contact us"];
       
    if (sectionsList.includes(tab)) {
        return {
            ["data-aos"]: "activeTab",
            ["data-aos-once"]: "false",
            ["data-aos-anchor-placement"]: "top-top",
            ["data-aos-anchor"]: "#" + tab.toLowerCase().replace(" ", ""),
            ["data-aos-mirror"]: "true"
        }
    } else {
        return {}
    }

}