# use-feature

[![NPM](https://img.shields.io/npm/v/use-feature.svg)](https://www.npmjs.com/package/use-feature) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label) [![codecov](https://codecov.io/gh/feijoa-dev/use-feature/branch/main/graph/badge.svg?token=ABVLM7PCDG)](https://codecov.io/gh/feijoa-dev/use-feature) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/feijoa-dev/use-feature/publish.yml) 

- [What is use-feature](#what-is-use-feature)
- [Problem](#problem)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Overrides](#overrides)

## What is use-feature?
A comprehensive, lightweight, feature flag hook for React. It provides an easy way to read and override flags so anybody (including non-technical users) can toggle features in their own browser.

## Install

```bash
npm install use-feature
```
or
```bash
yarn add use-feature
```

## Usage
### Hook

To use the `useFeature` hook:

```tsx
import { useFeature } from "use-feature";

const Example = () => {
  const showFeature = useFeature("MY_FEATURE"); // either pass a boolean as a second value or set an environment variable `MY_FEATURE=true`

  return (
    showFeature ? <MyFeature /> : null
  );
}
```

### Component
To use the `Feature` component:
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

## Props

| Prop            | Type        | Description                                                                     | Required | default Value  |
| ------------    | ----------- | -------------------------------------------------------                         | ---------| ---------|
| `name`          | string      | Name of your feature flag (used for overrides and for checking env var value)   | true     | N/A      |
| `enabled`       | boolean     | `true` = show, `false` = hide                                                   | false    | `false`    |
-------------------------

**Note**: The feature flag is defaulted to false, but using any of the following methods, it will toggle the flag:

1) Setting a true/false value as the second argument to the useFeature hook.
2) Looking for an environment variable, query string, local storage, or cookie with the same name as the feature flag.

---

## Overrides

Sometimes it's useful for some users to be able override feature flags on their local browser. This is particularly useful if you want a feature disabled for the public but need to enable it for a one person to test. E.g. for the QA tester or a product owner etc.

This can be done either via a query string, local storage value, or setting a cookie.

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
