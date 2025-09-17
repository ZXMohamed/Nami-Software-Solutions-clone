//*react
import React, { useEffect, useMemo, useRef } from 'react';
//*mui
import { Alert, AlertTitle, LinearProgress, Snackbar } from '@mui/material';
//*queries
import { useLazyGetLanguageQuery } from '../redux/server state/language';
//*component
import NavBar from './navbar/navbar';
import FloatSocialButtons from './social&contacts/floatsocialbuttons';
import ServicesTicker from './servicesticker';
import Footer from './footer';
//*scripts
import { defaultLanguage, Language } from '../languages/languagesContext';
import { initZodMsgs } from '../form/assets';
import ContactButtons from './social&contacts/contactbuttons';
import { useLocation, useParams } from 'react-router';
import useUpdateEffect from '../hooks/useupdateeffect';


export default function PageWrapper({ children }) {
  
  const [getLanguage, languageStatus] = useLazyGetLanguageQuery(undefined,  (queryFn) => queryFn() ,{
    selectFromResult:({data,isSuccess})=>({ isSuccess, data })
  });

  const { language } = useParams();
  const location = useLocation();

  const defaultContent = useMemo(() => ({
    language: languageStatus.isSuccess ? languageStatus.data.page.title : "Nami Software Solutions | Home",
  }),
    [languageStatus.data, languageStatus.isSuccess]);
  
  document.title = defaultContent.language;

  
  function languageRequest(language, location) {
    //$get page from url
    const parts = location.pathname.split("/").filter(Boolean);
    const page = parts.length > 1 ? parts[1] : "main";
    console.log(language,page);
    getLanguage({ language, page });
  }
  useEffect(() => { 
    if (language != defaultLanguage) {
      languageRequest(language, location);
    }
  }, []);
  useUpdateEffect(() => {
    console.log(location.pathname, language, location);
    languageRequest(language, location);
  }, [location.pathname]);

  const prevAddress_languageControls = useRef({ languageRequest, ...languageStatus, data: { ...languageStatus.data, zodMsgs: initZodMsgs() } });
    
  const languageControls = useMemo(() => {

    if (!languageStatus.isSuccess) return prevAddress_languageControls.current;
    
    let zodMsgs = {};
    if (languageStatus.data) {
      zodMsgs = initZodMsgs(languageStatus.data.page.form);
    } else {
      zodMsgs = initZodMsgs();
    }

    // console.log(languageStatus.data);
    prevAddress_languageControls.current = { languageRequest, ...languageStatus, data: { ...languageStatus.data, zodMsgs } };
    
    return prevAddress_languageControls.current;
  });

  
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