//*react
import React, { useMemo, useRef } from 'react'
//*queries
import { useGetLanguageMutation } from '../redux/server state/language';
//*scripts
import { Language } from '../languages/languagesContext';
import { initZodMsgs } from '../form/assets';


export default function PageWrapper({ children }) {
    
    const [getLanguage, languageStatus] = useGetLanguageMutation();
  
    const prevAddress_languageControls = useRef({ getLanguage, ...languageStatus, data: { ...languageStatus.data, zodMsgs: initZodMsgs() } });
  
    const languageControls = useMemo(() => {

      if (!languageStatus.isSuccess) return prevAddress_languageControls.current;
      
      let zodMsgs = {};
      if (languageStatus.data) {
        zodMsgs = initZodMsgs(languageStatus.data.page.form);
      } else {
        zodMsgs = initZodMsgs();
      }

      // console.log(languageStatus.data);
      prevAddress_languageControls.current = { getLanguage, ...languageStatus, data: { ...languageStatus.data, zodMsgs } };console.log(prevAddress_languageControls.current);
      
      return prevAddress_languageControls.current;
    }, [languageStatus.isSuccess]);
  
    return (
      <Language.Provider value={languageControls}>
        {children}
        {/*footer*/}
      </Language.Provider>
  )
}
