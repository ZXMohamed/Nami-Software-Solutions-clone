//*react
import React, { memo, useContext, useEffect, useMemo, useRef } from "react";
//*styles
import "../../sass/shared/navbar.scss";
//*queries
import { useGetAvailableLanguagesQuery } from "../../redux/server state/language";
//*scripts
import { defaultLanguage, Language } from "../../languages/languagesContext";
import { useLocation, useNavigate, useParams } from "react-router";


const LanguageButton = () => {
    console.log("LB");

    const LanguageButtonTitle = useRef();

    const { data: AL, isSuccess: AL_isSuccess } = useGetAvailableLanguagesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const { language: urlLang } = useParams();
    const languageIndex = useRef(0);
    
    const { isSuccess: language_isSuccess, data: language, languageRequest } = useContext(Language);

    const defaultContent = useMemo(() => ({
        language: language_isSuccess ? language.page.language : defaultLanguage,
    }),
        [language, language_isSuccess]
    );

    const location = useLocation();
    const navigation = useNavigate();

    function changeLanguage(languagesList, languageIndex) {

        // languageRequest(languagesList[languageIndex.current].requestName);
        const requestedLanguage = languagesList[languageIndex.current].requestName.toLowerCase();
        const languagePath = location.pathname.replace(defaultContent.language, requestedLanguage);
        navigation(languagePath);
        
        if (languagesList.length - 1 == languageIndex.current) {
            languageIndex.current = 0;
        } else {
            languageIndex.current++;
        }
        
        LanguageButtonTitle.current.innerText = languagesList[languageIndex.current].title;
    }

    useEffect(() => {
        if (AL_isSuccess && AL.languages?.length >= 1) {
            languageIndex.current = getCurrentLanguageIndex(urlLang, AL.languages);
            LanguageButtonTitle.current.innerText = AL.languages[languageIndex.current].title
        }
    }, [AL_isSuccess, AL]);

    return (
        <>
            {
                AL_isSuccess && AL.languages?.length >= 2 &&
                <div className="navBarLang">
                    <button ref={ LanguageButtonTitle } onClick={ () => changeLanguage(AL.languages, languageIndex) } ></button>
                </div>
            }
        </>
    )

};
export default LanguageButton;

function getCurrentLanguageIndex(language, languagesArray = []) {
    let index = 0;
    for (let x of languagesArray) {console.log(index);
        if (x.requestName == language.toUpperCase()) {
            if (languagesArray.length - 1 == index) {
                return 0;
            } else {
                return index + 1;
            }
        }
        index++;
    }
}