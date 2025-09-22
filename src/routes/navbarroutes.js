import { main_routes, pages_routes } from "./routes";

export const navSettings = (tab, location, urlLang, id) => {
    const parts = location.pathname.split("/").filter(Boolean);
    const page = parts.length > 1 ? parts[1] : "main";

    if (page == "main") {
        return main_routes(urlLang, id)[tab];
    } else {
        return pages_routes(urlLang, id)[tab];
    }

}