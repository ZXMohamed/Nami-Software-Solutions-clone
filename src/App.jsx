import { Fragment } from "react"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import AOS from "aos";
//*components
import NavBar from "./componants/navbar"
import Home from "./componants/Home";
import FloatSocialButtons from "./componants/floatsocialbuttons";
import RequestForm from "./componants/requestform";
import SectionHeader from "./componants/sectionheader";
import InfoCard from "./componants/infocard";
import DownloadButton from "./componants/downloadbutton";
//*css
import '../node_modules/aos/dist/aos.css';
import 'swiper/css';
//*sass files
import "./sass/main.scss"
import "./sass/socialbuttons.scss"
import "./sass/floatsocialbuttons.scss"
import "./sass/sectionheader.scss"
import "./sass/infocard.scss"
import "./sass/statisticsbox.scss"
import "./sass/Servicebadge.scss"
import "./sass/requestform.scss"
import "./sass/requestbutton.scss"
import "./sass/downloadbutton.scss"


AOS.init({ once: true, offset: 65 });

const theme = createTheme({
  palette: {
    primary: {main: "#009f6f", contrastText: '#fff'},
    secondary: { main: "#ffffff", contrastText: '#009f6f' },
    third: { main: "#e1e1e1", contrastText: '#000000' },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      xxs: 500,
      xxxs:600,
      sm: 769,
      md: 992,
      lg: 1320,
      xl: 1536,
    },//$color theme
  },
});

function App() {


  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Home />
        {/* <RequestForm/> */ }
        <FloatSocialButtons />
      </ThemeProvider>
    </Fragment>
  )
}

export default App
