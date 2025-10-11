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

    const { language } = useParams();
    const location = useLocation();

    function languageRequest(language, location) {
        const page = getPage(location, language);
        getLanguage({ language, page });
    }

    useEffect(() => {
        if (language && language != defaultLanguage) {
            languageRequest(language, location);
        }
        //$ else set language to default in BE
        else {
            setCurrentLanguage({ language: defaultLanguage });
        }
    }, []);

    useUpdateEffect(() => {
        languageRequest(language, location);
    }, [language]);

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

    const isSuccess = languageStatus.isSuccess || currentLanguageStatus.isSuccess;
    const isError = languageStatus.isError || currentLanguageStatus.isError;
    const isLoading = languageStatus.isLoading || currentLanguageStatus.isLoading;
    const isFetching = languageStatus.isFetching || currentLanguageStatus.isLoading;

    return { languageControls, isSuccess, isError, isLoading, isFetching };
}