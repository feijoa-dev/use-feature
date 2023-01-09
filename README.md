# use-feature

[![NPM](https://img.shields.io/npm/v/use-feature.svg)](https://www.npmjs.com/package/use-feature) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)[![NPM](https://img.shields.io/appveyor/tests/feijoa-dev/use-feature)](https://www.npmjs.com/package/use-feature)

- [What is use-feature](#what-is-use-feature)
- [Problem](#problem)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Overrides](#overrides)

## What is use-feature?
A comprehensive React feature flag library providing reusable components and hooks along with the ability to easily override flags so anybody (including non-technical users) can toggle features in their own browser.

## Problem

It can be finicky managing feature flags across multiple environments and is only exacerbated when you need to enable a feature for one user or for a one off i.e. a QA who needs to test or when you want demo a feature for review. 

Normally this would require toggling a feature flag in an environment variable and re-running a build. This can take time depending on your CI or maybe you have to do a release to get the changes deployed.

Now you to don't have to worry about any of this and you can toggle features in your browser, without any code deploys! Simply override a feature flag with a query param, cookie or local storage. They can even be overridden with env variables if you want certain builds to not have a feature.

## Install

```bash
npm install --save use-feature
```
or
```bash
yarn add use-feature
```

## Usage

You can still set your feature flag to `true` or `false` in an environment variable but using the following hook or component allows you to override that value in your browser.

In the following examples, your feature will default to being disabled if no environment variable, override or `enabled` prop is found. 

If you have an environment variable set as `MY_FEATURE=true` that will enable the the feature. Then if you override that environment variable with any of the [override options](#overrides) it will toggle feature flag in your browser.

### Component
```tsx
import { Feature } from "use-feature";

const Example = () => {
  return (
    <Feature name="MY_FEATURE">
      <MyFeature />
    <Feature>
  );
}
```

### Hook

```tsx
import { useFeature } from "use-feature";

const Example = () => {
  const showFeature = useFeature({
    name: "MY_FEATURE"
  });

  return (
    showFeature ? <MyFeature /> : null
  );
}
```

You can use the `enabled` prop to conditionally enable your feature

```tsx
import { useFeature } from "use-feature";

const Example = () => {
  const showFeature = useFeature({
    name: "MY_OTHER_FEATURE",
    enabled: true
  });

  return (
    showFeature ? <MyFeature /> : null
  );
}
```

## Props

| Prop            | Type        | Description                                                                     | Required | default Value  |
| ------------    | ----------- | -------------------------------------------------------                         | ---------| ---------|
| `name`          | string      | Name of your feature flag (used for overrides and for checking env var value)   | true     | N/A      |
| `enabled`       | boolean     | `true` = show, `false` = hide                                                   | false    | `false`    |
-------------------------

## Overrides

Sometimes it's useful for some users to be able override feature flags on their local browser. This is particularly useful if you want a feature disabled for the public but need to enable it for a one person to test. E.g. for the QA tester or a product owner etc.

This can be done either via a query string or via a setting a cookie

*NOTE: query string or cookie keys and local storage keys must match the `name` prop*

### Query string

```sh
 // enable
 https://example.com?MY_FEATURE=true

 // disable
 https://example.com?MY_FEATURE=false
```

### Local Storage

```js
// enable
localStorage.setItem('MY_FEATURE', 'true');

// disable
localStorage.setItem('MY_FEATURE', 'false');
```

### Cookie

```js
// enable
document.cookie = 'MY_FEATURE=true;'

// disable
document.cookie = 'MY_FEATURE=false;'
```

Environment Variables
```sh 
#.env
MY_FEATURE=true
# or if you're using create react app
REACT_APP_MY_FEATURE=true
# or if you're using Gatsby
GATSBY_MY_FEATURE=true
# or if you're using Next
NEXT_PUBLIC_MY_FEATURE=true
```

### Support

The library supports Typescript and works on both client side rendered apps such as create-react-app as well as isomorphic apps like Gatsby and Nextjs.

--- 
This package was originally [@feijoa/react](https://www.npmjs.com/package/@feijoa/react) but has been migrated here.

---

## License

MIT © [Feijoa Dev](https://github.com/feijoa-dev)
