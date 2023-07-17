import React, {
  PropsWithChildren,
  Fragment
} from 'react'
import { FeatureProps } from '../../types/Feature.types'
import useFeature from '../../hooks/useFeature'

const Feature = ({
  name,
  enabled = false,
  children
}: PropsWithChildren<FeatureProps>) => {
  const flagEnabled = useFeature(name, enabled)

  return (
    <Fragment>
      {flagEnabled && children}
    </Fragment>
  )
}

export default Feature
