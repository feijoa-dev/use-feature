import { useMemo } from "react"
import { FeatureProps } from "../../types/Feature.types";

const isNil = (val: any): boolean => val === undefined || val === null;

const getBoolVal = (val?: string|boolean|null): boolean => {

  if( typeof val === "string" ) {
    return val === "true";
  }

  return !!val;
}

const useFeature = ({ 
  name,
  enabled = false
}: FeatureProps): boolean => {

  const cookies = useMemo(() => {
    if( !global.window ) {
      return {}
    }
    return document.cookie.split(";")
      .map(cookie => cookie.replace(" ", ""))
      .reduce((acc, cookie) => (
        Object.assign(acc, {
          [cookie.split('=')[0]]: cookie.split('=')[1]
        })
      ), {});
  }, [])

  const featureEnabled = useMemo((): boolean => {

    const urlSearchParams = global.window && new URLSearchParams(global.window.location.search);
    const myParam = urlSearchParams ? urlSearchParams.get(name) : null;

    const localStorageValue = global?.window?.localStorage?.getItem(name);
    
    const envVar = 
      process.env?.[name] ||
      process.env?.[`REACT_APP_${name}`] || 
      process.env?.[`GATSBY_${name}`] ||
      process.env?.[`NEXT_PUBLIC_${name}`]

    if( !isNil(cookies[name]) ) {
      return getBoolVal(cookies[name])
    }

    if( !isNil(myParam) ) {
      return getBoolVal(myParam)
    }
    
    if( !isNil(envVar) ) {
      return getBoolVal(envVar)
    }

    if( !isNil(localStorageValue) ) {
      return getBoolVal(localStorageValue)
    }

    return !!enabled
  }, [name, enabled, cookies])

  return featureEnabled;
}

export default useFeature;