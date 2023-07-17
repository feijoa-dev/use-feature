import { useMemo } from 'react'
import { isNil, getBoolVal } from './useFeature.utils'

const useFeature = (name: string, enabled = false): boolean => {
  const cookies = useMemo(() => {
    if (!global.window) {
      return {}
    }
    return document.cookie.split(';')
      .map(cookie => cookie.replace(' ', ''))
      .reduce((acc, cookie) => (
        Object.assign(acc, {
          [cookie.split('=')[0]]: cookie.split('=')[1]
        })
      ), {})
  }, [])

  const featureEnabled = useMemo((): boolean => {
    const urlSearchParams = global.window && new URLSearchParams(global.window.location.search)
    const myParam = urlSearchParams ? urlSearchParams.get(name) : null

    const localStorageValue = global?.window?.localStorage?.getItem(name)

    const envVar =
      process.env?.[name] ||
      process.env?.[`REACT_APP_${name}`] ||
      process.env?.[`GATSBY_${name}`] ||
      process.env?.[`NEXT_PUBLIC_${name}`] ||
      process.env?.[`VITE_${name}`]

    if (!isNil(myParam)) {
      return getBoolVal(myParam)
    }

    if (!isNil(cookies[name])) {
      return getBoolVal(cookies[name])
    }

    if (!isNil(localStorageValue)) {
      return getBoolVal(localStorageValue)
    }

    if (!isNil(envVar)) {
      return getBoolVal(envVar)
    }

    return !!enabled
  }, [name, enabled, cookies])

  return featureEnabled
}

export default useFeature
