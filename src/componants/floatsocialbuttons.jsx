import React from 'react'
import { Box } from '@mui/material'
import { useGetsocialQuery } from '../redux/server state/social'

export default function Socialbtns() {
  const {isSuccess, data:social, isError, error } = useGetsocialQuery();
  return (
    <Box className="Socialbtns">
        {
          isSuccess && <>
                      <a href={social.facebook.link}>
                          <div style={{backgroundImage:`url(${social.facebook.icon.fill})`}}></div>
                      </a>
                      <a href={social.linkedin.link}>
                          <div style={{backgroundImage:`url(${social.linkedin.icon.fill})`}}></div>
                      </a>
                      <a href={social.x.link}>
                          <div style={{backgroundImage:`url(${social.x.icon.fill})`}}></div>
                      </a>
                      <a href={social.instagram.link}>
                          <div style={{backgroundImage:`url(${social.instagram.icon.fill})`}}></div>
                      </a>
                      <a href={social.snapchat.link}>
                          <div style={{backgroundImage:`url(${social.snapchat.icon.fill})`}}></div>
                      </a>
                  </>
          }
        <div></div>
    </Box>
  )
}
