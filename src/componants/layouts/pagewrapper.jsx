//*react
import React from 'react';
//*context
import LanguagesProvider from '../../languages/languagesContext';


export default function PageWrapper({ children }) {

  return (
    <>
      <LanguagesProvider>
        {children}
      </LanguagesProvider>
    </>
  )
}