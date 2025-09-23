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
    const page = parts.length > 1 ? parts[1].replace("-","") : "main";
    return page;
}