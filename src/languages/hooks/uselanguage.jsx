//*react
import { useEffect, useMemo, useRef } from "react";
//*router
import { useLocation, useParams } from "react-router";
import { getPage } from "../../routes/routesmanager";
//*hooks
import useUpdateEffect from "../../hooks/useupdateeffect";
//*form
import { initZodMsgs } from "../../form/util/initZodMsgs";
//*queries
import { useLazyGetLanguageQuery, useSetCurrentLanguageMutation } from "../../redux/server state/language";
//*context
import { defaultLanguage } from "../languagesContext";


export const useLanguage = () => {
    
    const [getLanguage, languageStatus] = useLazyGetLanguageQuery();
    const [setCurrentLanguage,currentLanguageStatus] = useSetCurrentLanguageMutation();
    
    //*change language depend on url language param
    const { language } = useParams();
    const location = useLocation();

    function languageRequest(language, location) {
        const page = getPage(location, language);
        getLanguage({ language, page });
    }

    useEffect(() => {
        if (language && language != defaultLanguage) {
            //*request language from BE
            languageRequest(language, location);
        }
        else {
            //* else set language to default in BE 
            //* (at first open the site use default language that doesn't need to be loaded from BE
            //*  but FE should told BE about this current language to match DB content language)
            setCurrentLanguage({ language: defaultLanguage });
        }
    }, []);

    useUpdateEffect(() => {
        //*request language from BE when url change
        languageRequest(language, location);
    }, [language]);

    //*avoid rerender the context (change value memory address) when success != true (for best performance)
        const prevAddress_languageControls = useRef({ ...languageStatus, data: { ...languageStatus.data, zodMsgs: initZodMsgs() } });

        const languageControls = useMemo(() => {

            if (!languageStatus.isSuccess) return prevAddress_languageControls.current;

            let zodMsgs = {};

            if (languageStatus.data) {
                zodMsgs = initZodMsgs(languageStatus.data.page.form);
            } else {
                zodMsgs = initZodMsgs();
            }

            prevAddress_languageControls.current = { ...languageStatus, data: { ...languageStatus.data, zodMsgs } };

            return prevAddress_languageControls.current;

        }, [languageStatus.data]);
    //*--------------------------------------------------------------------------------------------------

    const isSuccess = languageStatus.isSuccess || currentLanguageStatus.isSuccess;
    const isError = languageStatus.isError || currentLanguageStatus.isError;
    const isLoading = languageStatus.isLoading || currentLanguageStatus.isLoading;
    const isFetching = languageStatus.isFetching || currentLanguageStatus.isLoading;

    return { languageControls, isSuccess, isError, isLoading, isFetching };
}