//*react
import React, { useEffect, useRef } from "react";
//*route
import { useLocation, useNavigate } from "react-router";
//*styles
import "../../../sass/shared/navbar.scss";
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*queries
import { useGetAvailableLanguagesQuery } from "../../../redux/server state/language";
//*scripts
import { defaultLanguage } from "../../../languages/languagesContext";



const LanguageButton = () => {

    const LanguageButtonTitle = useRef();
    const languageIndex = useRef(0);

    const { data: AL, isSuccess: AL_isSuccess } = useGetAvailableLanguagesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = { language: content_isSuccess ? content.page.language : defaultLanguage };
    
    const location = useLocation();
    const navigation = useNavigate();

    useEffect(() => {
        if (AL_isSuccess && AL.languages?.length >= 1) {
            languageIndex.current = getCurrentLanguageIndex(defaultContent.language, AL.languages);
            LanguageButtonTitle.current.innerText = AL.languages[languageIndex.current].title
        }
    }, [AL_isSuccess, AL]);

    return (
        <>
            {
                AL_isSuccess && AL.languages?.length >= 2 &&
                <div className="navBarLang">
                    <button ref={ LanguageButtonTitle } onClick={
                        () => changeLanguage(defaultContent, location, AL.languages, languageIndex, navigation, LanguageButtonTitle)
                    } >
                    </button>
                </div>
            }
        </>
    )

};

export default LanguageButton;


function getCurrentLanguageIndex(language, languagesArray = []) {
    
    //*get current language index to start after

    let index = 0;
    if (!language) language = defaultLanguage;
    for (let x of languagesArray) {
        if (x.requestName == language) {
            if (languagesArray.length - 1 == index) {
                return 0;
            } else {
                return index + 1;
            }
        }
        index++;
    }
}

function changeLanguage(defaultContent, location, languagesList, languageIndex, navigation, LanguageButtonTitle) {

    const requestedLanguage = languagesList[languageIndex.current].requestName;

    let languagePath = "";
    
    //*create url with new language
    if (location.pathname.includes(defaultContent.language)) {
        //*change existing language in url 
        languagePath = location.pathname.replace(defaultContent.language, requestedLanguage);
    } else {
        //*add language to url 
        languagePath = location.pathname.replace("/", "/" + requestedLanguage + "/");
    }

    navigation(languagePath);
    
    //*set next language index
    if (languagesList.length - 1 == languageIndex.current) {
        languageIndex.current = 0;
    } else {
        languageIndex.current++;
    }
    
    //*set next language title on language button
    LanguageButtonTitle.current.innerText = languagesList[languageIndex.current].title;
}