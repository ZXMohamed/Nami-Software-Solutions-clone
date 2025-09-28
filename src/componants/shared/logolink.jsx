//*routes
import { Link, useLocation, useParams } from "react-router";
import { getPage, navSettings } from "../../routes/routesmanager";

function LogoLink({ children }) {

    const location = useLocation();
    const { language: urlLang } = useParams();

    if (getPage(location, urlLang) == "main") {
        const nav = navSettings(urlLang, true)["home"];            
        return <a href={nav.link}>
            {children}
        </a>
    } else {
        const nav = navSettings(urlLang, false)["home"];
        return <Link to={nav.link}>
            {children}
        </Link>
    }
}
export default LogoLink;