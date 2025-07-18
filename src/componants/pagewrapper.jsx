import React from 'react'
import NavBar from './navbar'
import { useGetLanguageMutation } from '../redux/server state/language';
import { Language } from '../languages/languagesContext';
import FloatSocialButtons from './floatsocialbuttons';
import RequestQuotationForm from './requestquotationform';


export default function PageWrapper({ children }) {
    
    const [getLanguage, status] = useGetLanguageMutation();
    

    return (
      <Language.Provider value={{getLanguage,...status}}>
        <NavBar />
        {children}
        <FloatSocialButtons />
        <RequestQuotationForm/>
        {/*footer*/}
      </Language.Provider>
  )
}
