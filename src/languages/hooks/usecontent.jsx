//*react
import React, { useContext } from 'react'
//*context
import { Language } from '../languagesContext';

export function useContent() {
  return useContext(Language);
}
