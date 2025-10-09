import { activeTabAosAnimation } from "../../../animation/navbar";

export const activeTabAnimation = (tab) => {
    
    const sectionsList = ["Home", "About us", "Services", "Our products", "Portfolio", "Careers", "Contact us"];
       
    if (sectionsList.includes(tab)) {
        return activeTabAosAnimation(tab.toLowerCase().replace(" ", ""));
    } else {
        return {}
    }

}