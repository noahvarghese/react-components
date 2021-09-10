# My Component Library

General purpose react components for use in web based projects
This does not support React Native
Compiled with type definitions, can be used with TypeScript or JavaScript

## Getting Started

### Quick Start

```bash
npm i @noahvarghese/react-components
```

## Components

### AppRouter

#### Description

Wrapper for your base app.
To be used in your index.[tsx,jsx] or App.[tsx,jsx].

This keeps track of your scroll location so if the user goes back a page it will remember where on the page the user was previously and scroll to that position.

For usage if using react-router and react-router-dom.
Wraps provided routes in Router and Switch components.

Accepts an array of routes, NavProps and FooterProps.

For a deeper dive into props that can be passed check out ProtectedRoute, Nav, and Footer.

#### Sample Props

```tsx
<AppRouter
    navProps={{
        items: loggedIn
            ? [{ name: "Login", path: "/" }]
            : [
                  { name: "Home", path: "/" },
                  { name: "Logout", path: "/logout" },
              ],
        type: "card",
    }}
    routes={
        loggedIn
            ? [{ path: "/", component: Login, exact: true }]
            : [
                  {
                      path: "/",
                      component: Home,
                      protectedProps: {
                          condition: () => loggedIn,
                          redirectPath: "/404",
                      },
                  },
                  {
                      path: "/logout",
                      component: Logout,
                      protectedProps: {
                          condition: () => loggedIn,
                          redirectPath: "/404",
                      },
                  },
              ]
    }
    footerProps={{ copyright: "Noah Varghese" }}
/>
```

### Button

### Checkbox

### DropdownArrow

### FileInput

### Footer

### Form

### HamburgerToggle

### Input

### Nav

### Notification

### ProtectedRoute

### Radio

### RadioFieldset

### Select

#### Option

## Theming

Theme config file is located in your project root after installation at './components.config.scss'
There are a few themes provided, the default values in the file are the same as the 'default' theme.

If you wish to override the theme comment out the $default-theme: default;
Then any changes to the file will take effect.
Any changes made will require a restart of the development server as the scss needs to be compiled.

```scss
// components.config.scss

/* If you wish to use your own values
comment out the line below */
$default-theme: owd;

$primary-color: #000000;
$secondary-color: #61dafb;
$highlight-color: #ffffff;
$accent-color: #61dafb;
$error-color: #f55549;

$bg-color: #ffffff;
$secondary-bg-color: #f3f3f3;

$root-font-size: 16px;

$header-font-family: Monsterrat;
$header-font-style: "Regular";
$header-letter-spacing: 16px;
$header-line-height: 1.2rem;

$content-font-family: Roboto;
$content-font-style: "Regular";
$content-letter-spacing: 16px;
$content-line-height: 1.2rem;
$content-font-size: 1.2rem;

$accent-font-style: italic;
```

### Colors

Colors can be hex, rgb, rgba, or strings, same as regular css color values

### Fonts

Custom fonts must be imported into your project in your index.css, then they can be referenced in '$\*-font-family; variables in the components.config.scss file.
The font-style is the rest of the file name if you obtained fonts from Google Fonts.

For example if you downloaded the entire Montserrat font family you would have Montserrat-Regular.ttf, Montserrat-Light.ttf etc.
This expects you created @font-face rules for custom fonts using the same name as the downloaded ttf file.

## Testing

Tested using react-testing-library
Requires SKIP_PREFLIGHT_CHECK to be set to true to run tests

### To Run Tests

```bash
git clone https://github.com/noahvarghese/react-components

cd ./react-components

echo "SKIP_PREFLIGHT_CHECK=true" > .env

yarn

# To run tests
yarn test
```

### To View Storybook

```bash
git clone https://github.com/noahvarghese/react-components

cd ./react-components

yarn

# To launch storybook
yarn storybook
```
