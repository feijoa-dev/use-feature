import React, { 
  FC, 
  Fragment
} from "react";
import { FeatureProps } from '../../types/Feature.types';
import useFeature from "../../hooks/useFeature";

const Feature: FC<FeatureProps> = ({ 
  name,
  enabled = false,
  children,
}) => {

  const flagEnabled = useFeature({
    name,
    enabled
  });

  return (
    <Fragment>
      {flagEnabled && children}
    </Fragment>
  )
};

export default Feature;
