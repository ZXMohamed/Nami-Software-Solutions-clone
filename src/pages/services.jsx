//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import RoutesBar from '../componants/routesbar'
import IntroCard from '../componants/introcard'
import ListCard from '../componants/listcard'
import ObjectivesList from '../componants/objectiveslist'
import { TechBadge, techBadgeSize, TechBadgesList, techBadgesListType } from '../componants/techbadges'
import PointsList from '../componants/pointslist'
import Gallery from '../componants/gallery'
import MobileScreens from '../componants/mobilescreens'
//*styles

import x from "../assets/photo/servicesbadges/androidapplication.svg"
import MiniHeader from '../componants/miniheader'
import InfoCard, { infoCardEffects, typographyForm } from '../componants/infocard'
const imagesMS = [
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/10.jpg',id:1},
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/11.jpg',id:1},
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/12.jpg',id:1},
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/10.jpg',id:1},
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/11.jpg',id:1},
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/12.jpg',id:1},
  {image:'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/12.jpg',id:1}
];
const images = [
  {image:"https://picsum.photos/id/1018/800/600",id:1},
  {image:"https://picsum.photos/id/1015/800/600",id:1},
  {image:"https://picsum.photos/id/1018/800/600",id:1},
  {image:"https://picsum.photos/id/1015/800/600",id:1},
  {image:"https://picsum.photos/id/1019/800/600",id:1},
  {image:"https://picsum.photos/id/1020/800/600",id:1}
];

export default function Services() {
  return (
    <PageWrapper>
      <RoutesBar dir={"ltr"}/>
      <IntroCard icon={ x } title={ "Design services" } description={ (" We offer a comprehensive range of design services that include graphic design and brand identity design. We work to create innovative designs that reflect the essence of your brand and attract the attention of your audience.") }></IntroCard>
      <br />
      <ListCard title={ "Service objectives" }>
        <ObjectivesList dir={"ltr"} data={ ["Graphic Design","Brand identity design","Logos design","Marketing materials design","User interface (UI) design"] } />
      </ListCard>
      <br />
      <ListCard title={ "Programming languages used" }>
        <TechBadgesList dir={"rtl"} type={techBadgesListType.row}>
          <TechBadge data={{title:"PHP"}} size={techBadgeSize.big}/>
          <TechBadge data={{title:"Laravel"}} size={techBadgeSize.big}/>
          <TechBadge data={{title:"Flutter"}} size={techBadgeSize.big}/>
        </TechBadgesList>
      </ListCard>
      <br />
      <InfoCard dir={ "ltr" } waveDir={ "left" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle : [typographyForm.subtitle.size.small] }} animateDescription={true} description={"Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs."} subtitle={ "Good planning is not enough Great callings require the extraordinary!" } title={"ss"}>
      </InfoCard>
      <br/>
      <ListCard title={ "System features" }>
        <PointsList dir={"ltr"} data={[{title:"Efficiently Manage Care Schedules"},{title:"Record Health Data for Each Livestock"}]}/>
      </ListCard>
      <br />
      <MiniHeader title={"Why us"} subtitle={"Why to choose work with us"}/>
      <br />
      <MobileScreens dir={ "rtl" } data={ imagesMS }/>
      <br />
      <Gallery dir={ "rtl" } sideThumbs data={ images } />
      <br />
    </PageWrapper>
  )
}