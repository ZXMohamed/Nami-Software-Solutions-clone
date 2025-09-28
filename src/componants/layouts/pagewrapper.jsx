//*react
import React from 'react'
//*queries
import { useGetLanguageMutation } from '../../redux/server state/language';
//*scripts
import { Language } from '../../languages/languagesContext';


export default function PageWrapper({ children }) {
    
    const [getLanguage, status] = useGetLanguageMutation();
    

    return (
      <Language.Provider value={{getLanguage,...status}}>
        {children}
        {/*footer*/}
      </Language.Provider>
  )
}
