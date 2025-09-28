//*react
import React, { memo, useContext, useEffect, useRef } from "react";
//*styles
import "../../../sass/shared/navbar.scss";
//*queries
import { useGetAvailableLanguagesQuery } from "../../../redux/server state/language";
//*scripts
import { Language } from "../../../languages/languagesContext";


const LanguageButton = () => {
    console.log("LB");

    const LanguageButtonTitle = useRef();
    const languageIndex = useRef(1);

    const { data: AL, isSuccess: AL_isSuccess } = useGetAvailableLanguagesQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });
    
    const { languageRequest } = useContext(Language);

    function changeLanguage(languagesList, languageIndex) {

        languageRequest(languagesList[languageIndex.current].requestName);
        
        if (languagesList.length - 1 == languageIndex.current) {
            languageIndex.current = 0;
        } else {
            languageIndex.current++;
        }
        
        LanguageButtonTitle.current.innerText = languagesList[languageIndex.current].title;
    }

    useEffect(() => {
        if (AL_isSuccess && AL.languages?.length >= 1)
            LanguageButtonTitle.current.innerText = AL.languages[languageIndex.current].title
    }, [AL_isSuccess, AL])

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