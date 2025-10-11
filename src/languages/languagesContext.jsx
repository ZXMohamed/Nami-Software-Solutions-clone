//*context
import { createContext } from "react";
//*hooks
import { useLanguage } from "./hooks/uselanguage";
//*components
import alert from "../componants/shared/alert";
import SplashScreen from "../componants/layouts/splashScreen";


export const defaultLanguage = "en";

export const Language = createContext();


export default function LanguagesProvider({ children }) {
    
    const { languageControls, isError, isSuccess, isLoading, isFetching } = useLanguage();

    return (
        <Language.Provider value={ languageControls }>
            
            { isSuccess && children }

            { isFetching && <SplashScreen /> }
            
            { (!isFetching && isSuccess) && <alert.Success title={ "Language Changed" } description={ <> Language Has Been Loaded Successfully. </> } /> }
            <alert.Loading openAlert={ isFetching } title={"Change Language"} description={ <> Please Waite... </> } />
            <alert.Error openAlert={ isError } description={ <> Can't Load Language So Please Try Again <br /> Or Check Your Internet Connection. </> } />

        </Language.Provider>
    )
}

