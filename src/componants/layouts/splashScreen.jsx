//*react
import React from 'react'
//*assets
import logo from "../../assets/photo/global/namiicon.svg";
//*style
import "../../sass/shared/splashScreen.scss"


export default function SplashScreen() {
  return (
    <div className='splashScreen'>

      <img src={ logo } alt="Nami Software Company" width={ 100 } className='splashScreenIcon'/>
      
      <section className='splashScreenWaveAnimationCon'>
        <div className='splashScreenWaveAnimationTop'>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className='splashScreenWaveAnimationBottomCon'>
          <div className='splashScreenWaveAnimationBottom'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
