//*react
import React, { useEffect, useMemo, useRef } from 'react'
//*mui
import { Alert, AlertTitle, LinearProgress, Snackbar } from '@mui/material';
//*queries
import { useGetLanguageMutation } from '../redux/server state/language';
//*component
import NavBar from './navbar/navbar';
import FloatSocialButtons from './social&contacts/floatsocialbuttons';
//*scripts
import { defaultLanguage, Language } from '../languages/languagesContext';


export default function PageWrapper({ children }) {
  
  const [getLanguage, languageStatus] = useGetLanguageMutation();

  function languageRequest(language) {
    //$get page from url
    if (language) {
      getLanguage(language, "main");
    } else {
      //$get language from url
      // if (url_language != defaultLanguage) {
      //   getLanguage(language, "main");
      // }
    }
  }

  // useEffect(() => {
  //   languageRequest();
  // },[])

  const prevAddress_languageControls = useRef({ languageRequest, ...languageStatus });
  const languageControls = useMemo(() => {
    if (!languageStatus.isSuccess) return prevAddress_languageControls.current;
    prevAddress_languageControls.current = { languageRequest, ...languageStatus };
    return prevAddress_languageControls.current;
  }, [languageStatus.isSuccess]);

  return (<>
    <Language.Provider value={languageControls}>
      <NavBar />
      {children}
      <FloatSocialButtons />
      {/*footer*/}
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