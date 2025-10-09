//*react
import React from 'react';
//*component
import PageTitle from '../shared/pagetitle';
// import NavBar from './navbar/navbar';
// import FloatSocialButtons from './social&contacts/floatsocialbuttons';
// import ContactButtons from './social&contacts/contactbuttons';
// import ServicesTicker from './servicesticker';
// import Footer from './footer';
//*context
import LanguagesProvider from '../../languages/languagesContext';


export default function PageWrapper({ children }) {

  return (
    <>
      <LanguagesProvider>
        
        { console.log("sssssssssaaaaaaaaaaa") }
        
        <PageTitle/>
        {/* <NavBar /> */}
        {children}
        {/* <FloatSocialButtons /> */}
        {/* <ContactButtons /> */}
        {/* <ServicesTicker /> */}
        {/* <Footer /> */}

      </LanguagesProvider>
    </>
  )
}