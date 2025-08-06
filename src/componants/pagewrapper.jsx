//*react
import React from 'react'
//*component
import NavBar from './navbar'
import FloatSocialButtons from './floatsocialbuttons';
//*queries
import { useGetLanguageMutation } from '../redux/server state/language';
//*scripts
import { Language } from '../languages/languagesContext';


export default function PageWrapper({ children }) {
    
    const [getLanguage, status] = useGetLanguageMutation();
    
    return (
      <Language.Provider value={{getLanguage,...status}}>
        <NavBar />
        {children}
        <FloatSocialButtons/>
        {/*footer*/}
      </Language.Provider>
  )
}
