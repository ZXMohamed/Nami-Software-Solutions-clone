import { main_routes, pages_routes } from "./routes";

export const navSettings = (tab, location, urlLang, id) => {

    if (getPage(location) == "main") {
        return main_routes(urlLang, id)[tab];
    } else {
        return pages_routes(urlLang, id)[tab];
    }

}

export const getPage = (location) => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (pages_routes()[parts[0].charAt(0).toUpperCase() + parts[0].slice(1)]) {
        return parts[0].replace("-", "");
    } else if (pages_routes()[parts[1].charAt(0).toUpperCase() + parts[1].slice(1)]) {
        return parts[1].replace("-", "");
    } else {
        return "main"
    }
}