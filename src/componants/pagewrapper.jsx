import React from 'react'
import { useGetLanguageMutation } from '../redux/server state/language';
import { Language } from '../languages/languagesContext';
import ContactButtons from './social&contacts/contactbuttons';


export default function PageWrapper({ children }) {
    
    const [getLanguage, status] = useGetLanguageMutation();
    

    return (
      <Language.Provider value={{getLanguage,...status}}>
        {children}
        <ContactButtons/>
        {/*footer*/}
      </Language.Provider>
  )
}
