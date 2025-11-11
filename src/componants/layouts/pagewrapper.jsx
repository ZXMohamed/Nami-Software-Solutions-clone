//*react
import React from 'react';
//*component
import NavBar from './navbar/navbar';
//*context
import LanguagesProvider from '../../languages/languagesContext';


export default function PageWrapper({ children }) {

  return (
    <>
      <LanguagesProvider>
        
        <NavBar />
        {children}

      </LanguagesProvider>
    </>
  )
}