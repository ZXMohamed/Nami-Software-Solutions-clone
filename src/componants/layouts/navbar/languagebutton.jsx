//*react
import React, { useEffect, useRef } from "react";
//*route
import { useLocation, useNavigate, useParams } from "react-router";
//*styles
import "../../../sass/shared/navbar.scss";
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*queries
import { useGetAvailableLanguagesQuery } from "../../../redux/server state/language";
//*scripts
import { defaultLanguage } from "../../../languages/languagesContext";


const LanguageButton = () => {
    console.log("LB");

    const LanguageButtonTitle = useRef();

    const { data: AL, isSuccess: AL_isSuccess } = useGetAvailableLanguagesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const { language: urlLang } = useParams();
    const languageIndex = useRef(0);
    
    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = { language: content_isSuccess ? content.page.language : defaultLanguage };

    const location = useLocation();
    const navigation = useNavigate();

    function changeLanguage(languagesList, languageIndex) {

        const requestedLanguage = languagesList[languageIndex.current].requestName.toLowerCase();
        let languagePath="";
        if (location.pathname.includes(defaultContent.language)) {
            languagePath = location.pathname.replace(defaultContent.language, requestedLanguage);
        } else {
            languagePath = location.pathname.replace("/", "/" + requestedLanguage + "/");
        }
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
    if (!language) language = defaultLanguage;
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