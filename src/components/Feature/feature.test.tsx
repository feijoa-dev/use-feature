import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Feature from '.'

describe('Feature Component', () => {

  describe("Unmanaged flags", () => {

    beforeEach(() => {
      localStorage.clear();
    });

    it('Should render feature when enabled value is true', () => {

      const { queryByText } = render(
        <Feature name="my-feature" enabled={true}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should NOT render feature when enabled value is false', () => {

      const { queryByText } = render(
        <Feature name="my-feature" enabled={false}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeFalsy()
    })

    it('Should render feature when localStorage override is true', () => {

      localStorage.setItem('localStorage_flag_enabled', "true");
      
      const { queryByText } = render(
        <Feature name="localStorage_flag_enabled" enabled={false}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should NOT render feature when localStorage override is false', () => {

      localStorage.setItem('localStorage_flag_enabled', "false");
      
      const { queryByText } = render(
        <Feature name="localStorage_flag_enabled" enabled={true}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeFalsy()
    })

    it('Should render feature when environment variable value is true', () => {

      const { queryByText } = render(
        <Feature name="SHOW_FEATURE_1" enabled={false}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should render feature when environment without REACT_APP_ prefix variable value is true', () => {

      const { queryByText } = render(
        <Feature name="OTHER_FEATURE_1" enabled={false}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should render feature when environment without GATSBY_ prefix variable value is true', () => {

      const { queryByText } = render(
        <Feature name="FEATURE_3" enabled={false}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })

    it('Should NOT render feature when environment variable value is false', () => {

      const { queryByText } = render(
        <Feature name="REACT_APP_SHOW_FEATURE_2" enabled={true}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeFalsy()
    })

    it('Should use default value when it can\'t find the env var', () => {
      const { queryByText } = render(
        <Feature name="NON_EXISTANT_ENV_VAR" enabled={true}>
          <p>My Feature</p>
        </Feature>
      )
      expect(queryByText("My Feature")).toBeTruthy()
    })
  })
})
