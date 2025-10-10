import { main_routes, pages_routes } from "./routes";

export const navSettings = (urlLang, main, id) => {

    if (main) {
        return main_routes(urlLang, id);
    } else {
        return pages_routes(urlLang, id);
    }

}

export const getPage = (location, urlLang) => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length == 0) {
        return "main"    
    } else {        
        if (urlLang == undefined) {
            return parts[0].replace("-", " ");
        } else {
            return (parts[1] || "main").replace("-", " ");
        }
    }
}