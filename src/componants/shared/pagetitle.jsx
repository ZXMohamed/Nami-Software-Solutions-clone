import React from 'react'
import { useContent } from '../../languages/hooks/usecontent'

export default function PageTitle() {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  const defaultContent = { title: content_isSuccess ? content.page.title : "Nami Software Solutions | Home" };
  document.title = defaultContent.title;

  return <></>
}
