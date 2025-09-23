export const activeTabAnimation = (tab, location) => {
    
    const sectionsList = ["Home", "About us", "Services", "Our products", "Portfolio", "Careers", "Contact us"];
    
    const parts = location.pathname.split("/").filter(Boolean);
    const page = parts.length > 1 ? parts[1] : "main";

    if (page == "main") {        
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