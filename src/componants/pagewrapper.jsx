import React from 'react'
import { useGetLanguageMutation } from '../redux/server state/language';
import { Language } from '../languages/languagesContext';


export default function PageWrapper({ children }) {
    
    const [getLanguage, status] = useGetLanguageMutation();
    

    return (
      <Language.Provider value={{getLanguage,...status}}>
        {children}
        {/*footer*/}
      </Language.Provider>
  )
}
