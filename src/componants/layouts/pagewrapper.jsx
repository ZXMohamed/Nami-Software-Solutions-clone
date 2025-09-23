//*react
import React, { useEffect, useMemo, useRef } from 'react';
//*route
import { useLocation, useParams } from 'react-router';
//*mui
import { Alert, AlertTitle, LinearProgress, Snackbar } from '@mui/material';
//*queries
import { useLazyGetLanguageQuery } from '../../redux/server state/language';
//*form
import { initZodMsgs } from '../../form/assets';
//*component
import NavBar from './navbar/navbar';
import FloatSocialButtons from './social&contacts/floatsocialbuttons';
import ContactButtons from './social&contacts/contactbuttons';
import ServicesTicker from './servicesticker';
import Footer from './footer';
//*hooks
import useUpdateEffect from '../../hooks/useupdateeffect';
//*scripts
import { defaultLanguage, Language } from '../../languages/languagesContext';


export default function PageWrapper({ children }) {
  
  const [getLanguage, languageStatus, lastPromiseInfo] = useLazyGetLanguageQuery(undefined,  (queryFn) => queryFn() ,{
    selectFromResult: ({ data, isSuccess }) => ({ isSuccess, data })
  });

  const { language } = useParams();
  const location = useLocation();

  const defaultContent = useMemo(() => {
    console.log(languageStatus);
    return { language: languageStatus.isSuccess ? languageStatus.data.page.title : "Nami Software Solutions | Home" }
  },
    [languageStatus.data, languageStatus.isSuccess]);
  
  document.title = defaultContent.language;

  
  function languageRequest(language, location) {
    //$get page from url
    const parts = location.pathname.split("/").filter(Boolean);
    const page = parts.length > 1 ? parts[1] : "main";
    console.log(language, page);
    getLanguage({ language, page });
    
  }
  
  useEffect(() => { 
    if (language && language != defaultLanguage) {
      languageRequest(language, location);
    }
  }, []);

  useUpdateEffect(() => {
    console.log(location.pathname, language, location);
    languageRequest(language, location);
  }, [language]);

  const prevAddress_languageControls = useRef({ languageRequest, ...languageStatus, data: { ...languageStatus.data, zodMsgs: initZodMsgs() } });
    
  const languageControls = useMemo(() => {

    if (!languageStatus.isSuccess) return prevAddress_languageControls.current;
    
    let zodMsgs = {};
    if (languageStatus.data) {
      zodMsgs = initZodMsgs(languageStatus.data.page.form);
    } else {
      zodMsgs = initZodMsgs();
    }

    prevAddress_languageControls.current = { languageRequest, ...languageStatus, data: { ...languageStatus.data, zodMsgs } };

    return prevAddress_languageControls.current;
  }, [languageStatus.data]);

  
console.log(languageControls);
  return (<>
    <Language.Provider value={languageControls}>
      <NavBar />
      {children}
      <FloatSocialButtons />
      <ContactButtons />
      <ServicesTicker />
      <Footer />
    </Language.Provider>

    <Snackbar open={languageStatus.isError } autoHideDuration={5000}>
      <Alert color='error' variant='filled' severity="error">
        <AlertTitle><b>Error</b></AlertTitle>
        Can't Load Language So Please Try Again <br />
        Or Check Internet Connection.
      </Alert>
    </Snackbar>
    <Snackbar open={languageStatus.isLoading } autoHideDuration={5000}>
      <Alert color='primary' variant='filled' severity="info">
        <AlertTitle>
          <b>Change language </b> 
          <LinearProgress color='primary' ></LinearProgress>
        </AlertTitle>
        Can't Load Language So Please Try Again <br />
        Or Check Internet Connection.
      </Alert>
    </Snackbar>
    <Snackbar open={languageStatus.isSuccess } autoHideDuration={2000}>
      <Alert color='primary' variant='filled' severity="success">
        <AlertTitle>
          <b>Language changed</b> 
        </AlertTitle>
        Can't Load Language So Please Try Again <br />
        Or Check Internet Connection.
      </Alert>
    </Snackbar>
  </>
  )
}