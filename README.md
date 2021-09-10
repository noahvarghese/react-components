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

#### Props

| name        | type                                                                                                      | default | description                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------- |
| navProps    | NavProps                                                                                                  |         | See Nav component                                                       |
| routes      | {path: string?; component?: React.ComponenType<RouteComponentProps<any>> \| <React.ComponentType<any>>}[] |         | Same props as react-router-dom's Route component, or see ProtectedRoute |
| footerProps | FooterProps                                                                                               |         | See Footer Component                                                    |

#### Sample Usage

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

#### Description

Styled Button.
Will also render as an anchor tag if link is provided

#### Props

| name     | type                                         | default   | description                                                          |
| -------- | -------------------------------------------- | --------- | -------------------------------------------------------------------- |
| primary  | [boolean]                                    | false     | determines whether to use the primary or secondary color             |
| text     | string                                       |           | button text                                                          |
| disabled | [boolean]                                    | undefined | sets button disabled                                                 |
| link     | [string]                                     | undefined | if set, renders as an anchor tag but with same stylings as button    |
| onClick  | [(e: MouseEvent<unknown, unknown>) => void;] | undefined | action to perform when clicked, can be applied to anchor tag as well |
| size     | ["small" \| "medium" \| "large"]             | small     | determines the size of the button                                    |
| type     | ["button" \| "reset" \| "submit" ]           | button    | determines button type, does not apply to anchor                     |

#### Sample Usage

```tsx
<Button primary text="Submit" onClick={(_) => console.log("Clicked")} />
```

### Checkbox

#### Description

Styled HTML Checkbox

#### Props

| name     | type                                              | default                                  | description                                           |
| -------- | ------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| name     | string                                            |                                          | specifies name of input attribute, used as id as well |
| label    | [string]                                          | undefined                                | the label text, if empty uses the name                |
| state    | {state: boolean; setState: (val: boolean) => void | React.Dispatch<SetStateAction<boolean>>} | provides value and way to set value                   |
| readonly | [boolean]                                         | undefined                                | sets readOnly attribute of input                      |

#### Sample Usage

```tsx

const [state, setState] = useState(false);
return <Checkbox name="human" label="Are you human?" state={{ state, setState}}>

```

### DropdownArrow

#### Description

Used to trigger showing/hiding a dropdown.
Also used to visually display whether the dropdown should be showing.
To be used in combination with other components.

#### Props

| name    | type                                      | default   | description                                                           |
| ------- | ----------------------------------------- | --------- | --------------------------------------------------------------------- |
| show    | [boolean]                                 | undefined | sets whether the arrow should be 'open' or not                        |
| onClick | (e: MouseEvent<unknown, unknown>) => void |           | function to fire when the arrow gets clicked, used to trigger display |

#### Sample Usage

```tsx

const [state, setState] = useState(false);
<DropdownArrow show={state} onClick={(_) => setState(!state) }>

```

### FileInput

#### Description

Wrapper for file input.
Allows drag and drop.
Files should be retrieved for sending to a server by accessing the form input elements.

#### Props

| name          | type      | default   | description                                           |
| ------------- | --------- | --------- | ----------------------------------------------------- |
| multipleFiles | [boolean] | undefined | whether to allow multiple files to be sent            |
| name          | string    |           | specifies name of input attribute, used as id as well |
| label         | [string]  | undefined | the label text, if empty uses the name                |
| accept        | [string]  | undefined | types of files to accept, if not set allows all       |

#### Sample Usage

```tsx
<FileInput multipleFiles name="Resume" label="Resume" accept="*.pdf,*.docx" />
```

### Footer

#### Description

The footer for the webpage.

May display social media links, a quote or blurb, and the copyright information

#### Props

| name        | type                                            | default   | description                                                                                                               |
| ----------- | ----------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| copyright   | string                                          |           | copyright information                                                                                                     |
| socialMedia | [{url: string; image: string; name: string;}[]] | undefined | generates a display of images as links, name is used as the alt text, image is either the source as a string, or the path |
| quote       | [string]                                        | undefined | a piece of text, slogan or otherwise                                                                                      |

#### Sample Usage

```tsx
<Footer
    copyright="Noah Varghese 2021"
    socialMedia={[
        {
            url: "facebook.com/noah-varghese",
            image: FacebookLogo,
            name: "facebook",
        },
        {
            url: "instagram.com/noah-varghese",
            image: InstagramLogo,
            name: "instagram",
        },
    ]}
/>
```

### Form

#### Description

A form wrapper to theme and simplify form options
Inputs and children must be wrapped by form element

#### Props

| name           | type                                 | default | description                                                                                                                        |
| -------------- | ------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| title          | string                               |         | the form name, will be displayed as a header                                                                                       |
| method         | "POST" \| "PUT" \| "DELETE"          |         | the HTTP verb to be used by the form                                                                                               |
| type           | "card" \| "bordered"                 |         | applies a className to the form to change styling                                                                                  |
| url            | string                               |         | the form action                                                                                                                    |
| submitFunction | (e: SyntheticEvent) => Promise<void> |         | additional actions to be performed on submit, can cancel default form behaviour by applying e.preventDefault() within the function |
| buttons        | React.Node[]                         |         | form action buttons                                                                                                                |

#### Sample Usage

```tsx
<Form
    title="Sample"
    method="POST"
    type="card"
    url="/"
    submitFunction={(e) => e.preventDefault();}
    buttons={[<button type="submit">Submit</button>, <button type="reset">Reset</button>]}
>
    <input type="text" id="name" placeholder="name" value="" />
</Form>
```

### HamburgerToggle

#### Description

Toggle for mobile nav

#### Props

| name       | type       | default | description                                                        |
| ---------- | ---------- | ------- | ------------------------------------------------------------------ |
| showMenu   | boolean    |         | dictates whether the state is 'open'                               |
| toggleMenu | () => void |         | function responsible for changing whether it is 'open' or 'closed' |

#### Sample Usage

```tsx
const [open, setOpen] = useState(false);
<HamburgerToggle showMenu={open} toggleMenu={setOpen} />;
```

### Input

#### Description

Wrapper for html input element
Provides input validation for email, required, postal-code, phone, date.
Postal code validation currently only supports Canadian postal codes, custom validator must be applied for other locales.
Phone validation currently only supports Canadian postal codes, custom validator must be applied for other locales.
Also can display errors.

#### Props

| name              | type                                                                                                                                                      | default                                 | description                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type              | string                                                                                                                                                    |                                         | the input type (ex. date, email, tel, text, etc.)                                                                                                             |
| name              | string                                                                                                                                                    |                                         | form input name                                                                                                                                               |
| placeholder       | string                                                                                                                                                    |                                         | sets the label text                                                                                                                                           |
| required          | boolean                                                                                                                                                   |                                         | sets whether required validation is performed, and affects styling, the actual html attribute required is always set to true so the animations fire correctly |
| state             | {state: string; setState: (val: string) => React.Dispatch<React.SetStateAction<string>>}                                                                  |                                         | allows central store of form values                                                                                                                           |
| validationOptions | [{runOnInput: boolean; runOnComplete: boolean; [validatorFn: (input: any, field: string) => {success: true} \| {success: false, errorMessage: string;}]}] | {runOnInput: true, runOnComplete: true} | can provide custom validator and dictate when to run the validator function, the error message gets sent to the error function provided                       |
| errorState        | {error: string \| undefined;, setError: (val?: string \| undefined) => void \| React.Dispatch<SetStateAction<string>>}                                    |                                         | allows setting and keeping errors in central state                                                                                                            |
| formatter         | [(input: any) => any]                                                                                                                                     | undefined                               | can provide custom formatter for use prior to validation and state change                                                                                     |
| autoComplete      | [string]                                                                                                                                                  |                                         | sets autocomplete value for browser use                                                                                                                       |

#### Sample Usage

```tsx
const [emailState, setEmail] = useState("");
const [error, setError] = useState("");

return (
    <Input
        type="email"
        required={true}
        name="email"
        state={{ setState: setEmail, state: emailState }}
        errorState={{ setError: setError, error }}
        placeholder="email"
    />
);
```

### Nav

#### Description

Provides mobile and desktop navigation that is done dynamically using the rendered length of the navigation lengths.

#### Props

| name                | type                            | default   | description                                                                                                                   |
| ------------------- | ------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| items               | {name: string; path: string;}[] |           | array of links to display in nav                                                                                              |
| type                | "card"                          |           | className to be assigned, affects styling                                                                                     |
| callToAction        | [{text: string; path: string;}] | undefined | if provided provides a 'call to action' in the nav to call user attention to                                                  |
| displayCallToAction | [() => boolean;]                | undefined | provides conditions to display call to action, for example if the user is on the page the call to action would direct them to |
| bannerMessage       | [ReactNode \| string]           | undefined | provides a banner message just above the nav                                                                                  |
| displayBanner       | [() => boolean;]                | undefined | conditions to display banner message under                                                                                    |
| logo                | string                          |           | either the imported image source as a string or the path                                                                      |

#### Sample Usage

```tsx
import Logo from "../../assets/img/logo.png";

<Nav
    items={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "Gallery", path: "/gallery" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" },
    ]}
    type="card"
    callToAction={{ text: "Request a quote", path: "/contact" }}
    displayCallToAction={() => {
        return true;
    }}
    bannerMessage="More than 30 years of experience"
    displayBanner={() => true}
    logo={Logo}
/>;
```

### Notification

#### Description

Displays at base of containing component.
Container must have set position to reltaive.

```css
position: relative;
```

#### Props

| name    | type       | default   | description                                                                                                                                                     |
| ------- | ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message | string     |           | text to display                                                                                                                                                 |
| display | boolean    |           | determines whether to display the notification                                                                                                                  |
| hide    | () => void |           | function to call when the notification is hidden, ex if you disable components on form submission then you can reenable them after the notification is finished |
| error   | [boolean]  | undefined | if true displays using error color                                                                                                                              |
| timeout | [number]   | 2000      | timeout for notification to disappear in ms]                                                                                                                    |

#### Sample Usage

```tsx
const [state, setState] = useState(false);

return (
    <div
        style={{
            width: "500px",
            height: "500px",
            backgroundColor: "#f3f3f3",
            position: "relative",
        }}
    >
        <State store={store}>
            <Notification
                message="Hello"
                display={state}
                hide={() => setState(false)}
            />
        </State>
    </div>
);
```

### ProtectedRoute

#### Description

Provides a wrapper around Route to check if the route may be used. If not applies a redirect.
instead of component can also pass children.

#### Props

| name         | type                                                                        | default   | description                                                               |
| ------------ | --------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------- |
| component    | [React.ComponentType<RouteComponentProps<any>> \| React.ComponentType<any>] | undefined | component to display                                                      |
| exact        | [boolean]                                                                   | undefined | whether to match the path exactly                                         |
| path         | [string]                                                                    | undefined | path to match                                                             |
| redirectPath | string                                                                      |           | if condition is unmet this is the location the user will be redirected to |
| condition    | () => boolean;                                                              |           | function to check if condition is valid                                   |

#### Sample Usage

```tsx
<ProtectedRoute
    component={Dashboard}
    exact={true}
    path="/dashboard"
    redirectPath="/"
    condition={() => isLoggedIn}
    key="/dashboard"
/>
```

### Radio

#### Description

Single Radio Button custom styles applied.

#### Props

| name     | type                                                                        | default   | description                                                 |
| -------- | --------------------------------------------------------------------------- | --------- | ----------------------------------------------------------- |
| name     | string                                                                      |           | form input name, used s label text if label is not provided |
| id       | string                                                                      |           | id of specific radio button                                 |
| label    | [string]                                                                    | undefined | label text                                                  |
| state    | {state: boolean; setState: React.Dispatch<React.SetStateAction<boolean>>; } |           | provides way of storing and setting a central state         |
| readonly | [boolean]                                                                   | undefined | sets whether the element can be interacted with             |

#### Sample Usage

```tsx
const [state, setState] = useState(false);

<Radio
    label="Test 1"
    name="Radio"
    id="Test1"
    state={{
        state,
        setState,
    }}
/>;
```

### RadioFieldset

#### Description

Provides wrapper for multiple Radio inputs

#### Props

| name       | type         | default | description                |
| ---------- | ------------ | ------- | -------------------------- |
| title      | string       |         | the label for the fieldset |
| radioProps | RadioProps[] |         | See Radio component above  |

#### Sample Usage

```tsx
const [state, setState] = useState([false, false, true]);

<RadioFieldset
    title="How old are you?"
    radioProps={[
        {
            label: "Too young",
            name: "age",
            id: "tooYoung",
            state: {
                state[0],
                setState: (val: boolean) => {
                    setState([val, state[1], state[2]]);
                }
            }
        },
        {
            label: "just the right age",
            name: "age",
            id: "right age",
            state: {
                state[1],
                setState: (val: boolean) => {
                    setState([state[0], val, state[2]]);
                }
            }
        }
        {
            label: "Too old",
            name: "age",
            id: "old",
            state: {
                state[2],
                setState: (val: boolean) => {
                    setState([state[0], state[1], val]);
                }
            }
        }
    ]}
/>
```

### Select

#### Description

Styled select dropdown

#### Props

| name        | type                                                                                                                                                 | default                                       | description                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| name        | string                                                                                                                                               |                                               | name of form input                                                                                                                       |
| placeholder | string                                                                                                                                               |                                               | used as the label                                                                                                                        |
| items       | {id: number; value: any; }[]                                                                                                                         |                                               | items to display in dropdown                                                                                                             |
| required    | boolean                                                                                                                                              |                                               | whether the field is required, this is superficial as the html required attribute is always set to true so the animations fire correctly |
| errorState  | {error: string; setError: (val: string) => void                                                                                                      | React.Dispatch<React.SetStateAction<string>>} |                                                                                                                                          | allows central error store |
| state       | {state: {id: number; value: string;}, setState: ({id: number, value: string}) => React.Dispatch<React.SetStateAction<{id: number; value: string;}>>} | allows central store                          |

#### Sample Usage

```tsx
const [selected, setSelected] = useState({ id: -1, value: "" });
const [error, setError] = useState("");

return (
    <Select
        items={[
            { id: 1, value: "Kitchen" },
            { id: 2, value: "Bar" },
            { id: 3, value: "YOLO" },
        ]}
        name="department"
        placeholder="department"
        required={true}
        state={{ state: selected, setState: setSelected }}
        errorState={{ setError, error: error }}
    />
);
```

## Theming

Theme config file is located in your project root after installation at './components.config.scss'
There are a few themes provided, the default values in the file are the same as the 'default' theme.

If you wish to override the theme comment out the line '$default-theme: default;'
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

Custom fonts must be imported into your project in your index.css, then they can be referenced in '$\*-font-family` variables in the components.config.scss file.
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
